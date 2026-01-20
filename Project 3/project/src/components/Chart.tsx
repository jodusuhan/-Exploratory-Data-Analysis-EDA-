import { ChartData } from '../types';

interface ChartProps {
  data: ChartData;
  type: 'bar' | 'histogram' | 'box';
  title: string;
  xLabel?: string;
  yLabel?: string;
}

export function Chart({ data, type, title, xLabel, yLabel }: ChartProps) {
  const maxValue = Math.max(...data.values);
  const colors = data.colors || generateColors(data.values.length);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-2">
        {type === 'bar' || type === 'histogram' ? (
          <div className="space-y-3">
            {data.labels.map((label, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-24 text-sm text-gray-600 truncate" title={label}>
                  {label}
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{
                      width: `${(data.values[index] / maxValue) * 100}%`,
                      backgroundColor: colors[index],
                      minWidth: data.values[index] > 0 ? '30px' : '0',
                    }}
                  >
                    <span className="text-xs font-medium text-white">
                      {data.values[index]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {(xLabel || yLabel) && (
        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          {xLabel && <span>{xLabel}</span>}
          {yLabel && <span>{yLabel}</span>}
        </div>
      )}
    </div>
  );
}

function generateColors(count: number): string[] {
  const baseColors = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#14b8a6',
    '#f97316',
  ];
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }
  return colors;
}
