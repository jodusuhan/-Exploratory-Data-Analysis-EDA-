import { DataPoint, ColumnInfo } from '../types';

export function analyzeColumns(data: DataPoint[]): ColumnInfo[] {
  if (data.length === 0) return [];

  const columns = Object.keys(data[0]);
  return columns.map((colName) => {
    const values = data.map((row) => row[colName]);
    const nonNullValues = values.filter((v) => v !== null && v !== undefined && v !== '');
    const numericValues = nonNullValues
      .map((v) => (typeof v === 'number' ? v : parseFloat(String(v))))
      .filter((v) => !isNaN(v));

    const isNumerical = numericValues.length > nonNullValues.length * 0.8;

    if (isNumerical && numericValues.length > 0) {
      const sorted = [...numericValues].sort((a, b) => a - b);
      return {
        name: colName,
        type: 'numerical',
        unique_values: new Set(numericValues).size,
        missing_values: data.length - nonNullValues.length,
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        mean: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
        median: sorted[Math.floor(sorted.length / 2)],
      };
    } else {
      return {
        name: colName,
        type: 'categorical',
        unique_values: new Set(nonNullValues).size,
        missing_values: data.length - nonNullValues.length,
      };
    }
  });
}

export function calculateDistribution(data: DataPoint[], column: string, bins: number = 10) {
  const values = data
    .map((row) => {
      const val = row[column];
      return typeof val === 'number' ? val : parseFloat(String(val));
    })
    .filter((v) => !isNaN(v));

  if (values.length === 0) return { labels: [], values: [] };

  const min = Math.min(...values);
  const max = Math.max(...values);
  const binSize = (max - min) / bins;

  const histogram = Array(bins).fill(0);
  const labels: string[] = [];

  for (let i = 0; i < bins; i++) {
    const start = min + i * binSize;
    const end = start + binSize;
    labels.push(`${start.toFixed(1)}-${end.toFixed(1)}`);
  }

  values.forEach((value) => {
    const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1);
    histogram[binIndex]++;
  });

  return { labels, values: histogram };
}

export function calculateCategoricalDistribution(data: DataPoint[], column: string) {
  const counts = new Map<string, number>();

  data.forEach((row) => {
    const value = String(row[column] ?? 'Unknown');
    counts.set(value, (counts.get(value) || 0) + 1);
  });

  const sorted = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  return {
    labels: sorted.map(([label]) => label),
    values: sorted.map(([, count]) => count),
  };
}

export function calculateCorrelation(data: DataPoint[], col1: string, col2: string): number {
  const pairs = data
    .map((row) => {
      const v1 = typeof row[col1] === 'number' ? row[col1] : parseFloat(String(row[col1]));
      const v2 = typeof row[col2] === 'number' ? row[col2] : parseFloat(String(row[col2]));
      return { v1, v2 };
    })
    .filter((p) => !isNaN(p.v1 as number) && !isNaN(p.v2 as number)) as { v1: number; v2: number }[];

  if (pairs.length === 0) return 0;

  const mean1 = pairs.reduce((sum, p) => sum + p.v1, 0) / pairs.length;
  const mean2 = pairs.reduce((sum, p) => sum + p.v2, 0) / pairs.length;

  let numerator = 0;
  let sum1Sq = 0;
  let sum2Sq = 0;

  pairs.forEach((p) => {
    const diff1 = p.v1 - mean1;
    const diff2 = p.v2 - mean2;
    numerator += diff1 * diff2;
    sum1Sq += diff1 * diff1;
    sum2Sq += diff2 * diff2;
  });

  const denominator = Math.sqrt(sum1Sq * sum2Sq);
  return denominator === 0 ? 0 : numerator / denominator;
}

export function detectOutliers(data: DataPoint[], column: string) {
  const values = data
    .map((row, index) => ({
      index,
      value: typeof row[column] === 'number' ? row[column] : parseFloat(String(row[column])),
    }))
    .filter((v) => !isNaN(v.value));

  if (values.length === 0) return [];

  const sorted = values.map((v) => v.value).sort((a, b) => a - b);
  const q1Index = Math.floor(sorted.length * 0.25);
  const q3Index = Math.floor(sorted.length * 0.75);
  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  return values.filter((v) => v.value < lowerBound || v.value > upperBound);
}

export function generateInsights(
  data: DataPoint[],
  columnsInfo: ColumnInfo[],
  analysisType: string
): string {
  const insights: string[] = [];

  if (analysisType === 'distribution') {
    const numericalCols = columnsInfo.filter((c) => c.type === 'numerical');
    if (numericalCols.length > 0) {
      insights.push(`Dataset contains ${numericalCols.length} numerical features.`);
      numericalCols.forEach((col) => {
        if (col.mean !== undefined && col.median !== undefined) {
          const skew = col.mean - col.median;
          if (Math.abs(skew) > (col.max! - col.min!) * 0.1) {
            insights.push(
              `${col.name} shows ${skew > 0 ? 'right' : 'left'} skewness (mean: ${col.mean.toFixed(
                2
              )}, median: ${col.median.toFixed(2)}).`
            );
          }
        }
      });
    }
  }

  if (analysisType === 'categorical') {
    const categoricalCols = columnsInfo.filter((c) => c.type === 'categorical');
    insights.push(`Dataset contains ${categoricalCols.length} categorical features.`);
    categoricalCols.forEach((col) => {
      if (col.unique_values) {
        insights.push(`${col.name} has ${col.unique_values} unique categories.`);
      }
    });
  }

  if (analysisType === 'outliers') {
    const numericalCols = columnsInfo.filter((c) => c.type === 'numerical');
    numericalCols.forEach((col) => {
      const outliers = detectOutliers(data, col.name);
      if (outliers.length > 0) {
        const percentage = ((outliers.length / data.length) * 100).toFixed(1);
        insights.push(`${col.name} has ${outliers.length} outliers (${percentage}% of data).`);
      }
    });
  }

  if (columnsInfo.some((c) => c.missing_values! > 0)) {
    insights.push('Some columns contain missing values that may need handling.');
  }

  return insights.join(' ');
}
