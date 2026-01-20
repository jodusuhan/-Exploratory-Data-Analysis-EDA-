/*
  # EDA Dashboard Schema

  ## Overview
  Creates tables for storing student datasets, analysis results, and visualizations
  for the Exploratory Data Analysis tool.

  ## New Tables
  
  ### `datasets`
  Stores uploaded datasets with metadata
  - `id` (uuid, primary key) - Unique dataset identifier
  - `user_id` (uuid) - User who uploaded the dataset
  - `name` (text) - Dataset name
  - `description` (text) - Dataset description
  - `type` (text) - Dataset type (netflix, iris, custom)
  - `file_url` (text) - URL to stored dataset file
  - `row_count` (integer) - Number of rows
  - `column_count` (integer) - Number of columns
  - `columns_info` (jsonb) - Column names and types
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `analysis_results`
  Stores analysis results and visualizations
  - `id` (uuid, primary key) - Unique result identifier
  - `dataset_id` (uuid, foreign key) - Reference to dataset
  - `user_id` (uuid) - User who performed analysis
  - `analysis_type` (text) - Type of analysis performed
  - `results` (jsonb) - Analysis results data
  - `insights` (text) - Generated insights
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Authenticated users can create and read their own records
*/

-- Create datasets table
CREATE TABLE IF NOT EXISTS datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  type text NOT NULL,
  file_url text,
  row_count integer DEFAULT 0,
  column_count integer DEFAULT 0,
  columns_info jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create analysis_results table
CREATE TABLE IF NOT EXISTS analysis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset_id uuid REFERENCES datasets(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_type text NOT NULL,
  results jsonb DEFAULT '{}'::jsonb,
  insights text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- Policies for datasets table
CREATE POLICY "Users can view own datasets"
  ON datasets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own datasets"
  ON datasets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own datasets"
  ON datasets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own datasets"
  ON datasets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for analysis_results table
CREATE POLICY "Users can view own analysis results"
  ON analysis_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analysis results"
  ON analysis_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own analysis results"
  ON analysis_results FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_datasets_user_id ON datasets(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_results_dataset_id ON analysis_results(dataset_id);
CREATE INDEX IF NOT EXISTS idx_analysis_results_user_id ON analysis_results(user_id);