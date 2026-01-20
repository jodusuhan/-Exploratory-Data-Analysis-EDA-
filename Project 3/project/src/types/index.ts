export interface Dataset {
  id: string;
  user_id: string;
  name: string;
  description: string;
  type: 'netflix' | 'iris' | 'custom';
  file_url?: string;
  row_count: number;
  column_count: number;
  columns_info: ColumnInfo[];
  created_at: string;
  updated_at: string;
}

export interface ColumnInfo {
  name: string;
  type: 'numerical' | 'categorical';
  unique_values?: number;
  missing_values?: number;
  min?: number;
  max?: number;
  mean?: number;
  median?: number;
}

export interface AnalysisResult {
  id: string;
  dataset_id: string;
  user_id: string;
  analysis_type: 'distribution' | 'correlation' | 'outliers' | 'categorical';
  results: Record<string, unknown>;
  insights: string;
  created_at: string;
}

export interface DataPoint {
  [key: string]: string | number;
}

export interface ChartData {
  labels: string[];
  values: number[];
  colors?: string[];
}
