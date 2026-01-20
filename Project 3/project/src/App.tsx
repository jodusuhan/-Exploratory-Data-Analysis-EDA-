import { useState, useEffect } from 'react';
import { Database, BarChart3, Search, BookOpen } from 'lucide-react';
import { DataPoint, ColumnInfo } from './types';
import { irisDataset, netflixDataset, datasetDescriptions } from './data/sampleDatasets';
import {
  analyzeColumns,
  calculateDistribution,
  calculateCategoricalDistribution,
  generateInsights,
} from './utils/dataAnalysis';
import { Chart } from './components/Chart';
import { CorrelationMatrix } from './components/CorrelationMatrix';
import { DatasetInfo } from './components/DatasetInfo';
import { InsightsPanel } from './components/InsightsPanel';

type DatasetType = 'iris' | 'netflix';

function App() {
  const [selectedDataset, setSelectedDataset] = useState<DatasetType>('iris');
  const [data, setData] = useState<DataPoint[]>(irisDataset);
  const [columns, setColumns] = useState<ColumnInfo[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'distribution' | 'categorical' | 'correlation'>('overview');

  useEffect(() => {
    const datasetMap = {
      iris: irisDataset,
      netflix: netflixDataset,
    };
    const newData = datasetMap[selectedDataset];
    setData(newData);
    const analyzedColumns = analyzeColumns(newData);
    setColumns(analyzedColumns);
  }, [selectedDataset]);

  const numericalColumns = columns.filter((c) => c.type === 'numerical');
  const categoricalColumns = columns.filter((c) => c.type === 'categorical');

  const distributionInsights = generateInsights(data, columns, 'distribution');
  const categoricalInsights = generateInsights(data, columns, 'categorical');
  const outlierInsights = generateInsights(data, columns, 'outliers');

  const allInsights = [distributionInsights, categoricalInsights, outlierInsights]
    .filter((i) => i)
    .join(' ')
    .split('. ')
    .filter((i) => i.trim());

  const tips = [
    'Use histograms to understand the distribution of numerical features',
    'Check for outliers using box plots and statistical methods',
    'Analyze correlation to identify relationships between features',
    'Look for imbalanced categories that might affect model performance',
    'Handle missing values before building predictive models',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Data Explorer</h1>
                <p className="text-sm text-gray-600">Exploratory Data Analysis Tool</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Student Edition</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Select Dataset</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {(['iris', 'netflix'] as DatasetType[]).map((dataset) => (
              <button
                key={dataset}
                onClick={() => setSelectedDataset(dataset)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedDataset === dataset
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1 capitalize">{dataset} Dataset</h3>
                <p className="text-sm text-gray-600">{datasetDescriptions[dataset]}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: Database },
              { id: 'distribution', label: 'Distribution', icon: BarChart3 },
              { id: 'categorical', label: 'Categories', icon: Search },
              { id: 'correlation', label: 'Correlation', icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <DatasetInfo rowCount={data.length} columnCount={columns.length} columns={columns} />
            )}

            {activeTab === 'distribution' && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Numerical Features Distribution</h3>
                  {numericalColumns.length > 0 ? (
                    <p className="text-sm text-gray-600 mb-4">
                      Histograms show the frequency distribution of numerical features. Look for normal
                      distributions, skewness, or multimodal patterns.
                    </p>
                  ) : (
                    <p className="text-gray-600">No numerical columns found in this dataset.</p>
                  )}
                </div>
                {numericalColumns.map((col) => {
                  const dist = calculateDistribution(data, col.name);
                  return (
                    <Chart
                      key={col.name}
                      data={dist}
                      type="histogram"
                      title={`Distribution of ${col.name}`}
                      xLabel={col.name}
                      yLabel="Frequency"
                    />
                  );
                })}
              </>
            )}

            {activeTab === 'categorical' && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Categorical Features Analysis</h3>
                  {categoricalColumns.length > 0 ? (
                    <p className="text-sm text-gray-600 mb-4">
                      Count plots show the frequency of each category. Look for imbalanced classes or
                      dominant categories.
                    </p>
                  ) : (
                    <p className="text-gray-600">No categorical columns found in this dataset.</p>
                  )}
                </div>
                {categoricalColumns.map((col) => {
                  const dist = calculateCategoricalDistribution(data, col.name);
                  return (
                    <Chart
                      key={col.name}
                      data={dist}
                      type="bar"
                      title={`Count Plot: ${col.name}`}
                      xLabel={col.name}
                      yLabel="Count"
                    />
                  );
                })}
              </>
            )}

            {activeTab === 'correlation' && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Understanding Correlation</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Correlation measures the linear relationship between numerical features. Values close to
                    +1 indicate strong positive correlation, -1 indicates strong negative correlation, and 0
                    indicates no linear relationship.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="p-2 bg-green-100 rounded text-center">
                      <div className="font-bold text-green-700">0.7 to 1.0</div>
                      <div className="text-gray-600">Strong Positive</div>
                    </div>
                    <div className="p-2 bg-gray-100 rounded text-center">
                      <div className="font-bold text-gray-700">-0.3 to 0.3</div>
                      <div className="text-gray-600">Weak/None</div>
                    </div>
                    <div className="p-2 bg-red-100 rounded text-center">
                      <div className="font-bold text-red-700">-1.0 to -0.7</div>
                      <div className="text-gray-600">Strong Negative</div>
                    </div>
                  </div>
                </div>
                <CorrelationMatrix data={data} columns={columns} />
              </>
            )}
          </div>

          <div className="space-y-6">
            <InsightsPanel insights={allInsights} tips={tips} />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Learning Resources</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-1">What is EDA?</h4>
                  <p className="text-gray-700">
                    Exploratory Data Analysis is the process of analyzing datasets to summarize their main
                    characteristics using statistical graphics and visualization methods.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-1">Why detect outliers?</h4>
                  <p className="text-gray-700">
                    Outliers can skew statistical measures and affect model performance. Identifying them
                    helps decide whether to remove or treat them specially.
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-1">What is correlation?</h4>
                  <p className="text-gray-700">
                    Correlation measures the strength and direction of a linear relationship between two
                    numerical variables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>Built for students to learn and practice Exploratory Data Analysis</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
