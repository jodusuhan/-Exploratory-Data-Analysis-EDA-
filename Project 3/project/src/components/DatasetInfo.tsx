import { ColumnInfo } from '../types';
import { BarChart3, Grid3x3, Info } from 'lucide-react';

interface DatasetInfoProps {
  rowCount: number;
  columnCount: number;
  columns: ColumnInfo[];
}

export function DatasetInfo({ rowCount, columnCount, columns }: DatasetInfoProps) {
  const numericalColumns = columns.filter((c) => c.type === 'numerical');
  const categoricalColumns = columns.filter((c) => c.type === 'categorical');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Info className="w-5 h-5" />
        Dataset Overview
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Grid3x3 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-blue-600">{rowCount}</div>
          <div className="text-xs text-gray-600">Rows</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <BarChart3 className="w-6 h-6 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-green-600">{columnCount}</div>
          <div className="text-xs text-gray-600">Columns</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{numericalColumns.length}</div>
          <div className="text-xs text-gray-600">Numerical</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{categoricalColumns.length}</div>
          <div className="text-xs text-gray-600">Categorical</div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Column Details</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Column</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Type</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Unique</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Missing</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Stats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {columns.map((col) => (
                <tr key={col.name} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-800">{col.name}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        col.type === 'numerical'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {col.type}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{col.unique_values}</td>
                  <td className="px-3 py-2 text-gray-600">{col.missing_values || 0}</td>
                  <td className="px-3 py-2 text-gray-600 text-xs">
                    {col.type === 'numerical' && col.mean !== undefined
                      ? `μ=${col.mean.toFixed(2)}, σ=${((col.max! - col.min!) / 4).toFixed(2)}`
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
