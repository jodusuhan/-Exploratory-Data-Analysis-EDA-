import { Lightbulb, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface InsightsPanelProps {
  insights: string[];
  tips?: string[];
}

export function InsightsPanel({ insights, tips }: InsightsPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        Key Insights
      </h3>

      <div className="space-y-3 mb-6">
        {insights.map((insight, index) => (
          <div key={index} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{insight}</p>
          </div>
        ))}
      </div>

      {tips && tips.length > 0 && (
        <>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Analysis Tips
          </h4>
          <div className="space-y-2">
            {tips.map((tip, index) => (
              <div key={index} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-600 font-bold">•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded">
        <div className="flex gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div className="text-sm text-gray-700">
            <p className="font-semibold text-amber-800 mb-1">Remember:</p>
            <p>
              EDA helps you understand your data before building models. Look for patterns, outliers,
              and relationships between features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
