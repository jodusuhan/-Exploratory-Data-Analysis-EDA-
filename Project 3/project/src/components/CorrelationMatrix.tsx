import { DataPoint, ColumnInfo } from '../types';
import { calculateCorrelation } from '../utils/dataAnalysis';

interface CorrelationMatrixProps {
  data: DataPoint[];
  columns: ColumnInfo[];
}

export function CorrelationMatrix({ data, columns }: CorrelationMatrixProps) {
  const numericalColumns = columns.filter((c) => c.type === 'numerical');

  if (numericalColumns.length < 2) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Correlation Matrix</h3>
        <p className="text-gray-600">Need at least 2 numerical columns for correlation analysis.</p>
      </div>
    );
  }

  const matrix: number[][] = [];
  for (let i = 0; i < numericalColumns.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < numericalColumns.length; j++) {
      matrix[i][j] = calculateCorrelation(data, numericalColumns[i].name, numericalColumns[j].name);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Correlation Matrix</h3>
      <div className="inline-block min-w-full">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-xs font-medium text-gray-600"></th>
              {numericalColumns.map((col) => (
                <th key={col.name} className="p-2 text-xs font-medium text-gray-600">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {numericalColumns.map((rowCol, i) => (
              <tr key={rowCol.name}>
                <td className="p-2 text-xs font-medium text-gray-600">{rowCol.name}</td>
                {numericalColumns.map((colCol, j) => {
                  const value = matrix[i][j];
                  const bgColor = getCorrelationColor(value);
                  return (
                    <td
                      key={colCol.name}
                      className="p-2 text-center text-xs font-medium border border-gray-200"
                      style={{ backgroundColor: bgColor }}
                      title={`${rowCol.name} vs ${colCol.name}: ${value.toFixed(3)}`}
                    >
                      {value.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500">
        <p>Values range from -1 (strong negative) to +1 (strong positive correlation)</p>
      </div>
    </div>
  );
}

function getCorrelationColor(value: number): string {
  if (value >= 0.7) return 'rgba(34, 197, 94, 0.7)';
  if (value >= 0.3) return 'rgba(34, 197, 94, 0.4)';
  if (value >= -0.3) return 'rgba(229, 231, 235, 0.7)';
  if (value >= -0.7) return 'rgba(239, 68, 68, 0.4)';
  return 'rgba(239, 68, 68, 0.7)';
}
