# Data Explorer - Exploratory Data Analysis Tool

An interactive web-based tool for learning and practicing Exploratory Data Analysis (EDA) techniques. Built for students to understand data patterns, feature behavior, and statistical relationships.

## Features

### Dataset Analysis
- Pre-loaded sample datasets (Iris, Netflix Movies & TV Shows)
- Automatic column type detection (numerical vs categorical)
- Dataset statistics and overview

### Visualizations
1. **Distribution Analysis**
   - Histograms for numerical features
   - Frequency distribution visualization
   - Skewness detection

2. **Categorical Analysis**
   - Count plots for categorical features
   - Category frequency analysis
   - Imbalance detection

3. **Correlation Analysis**
   - Correlation matrix for numerical features
   - Color-coded correlation strength
   - Relationship identification

### Educational Content
- Built-in explanations of EDA concepts
- Analysis tips and best practices
- Automated insights generation
- Learning resources panel

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Chart.tsx       # Chart visualization component
│   ├── CorrelationMatrix.tsx
│   ├── DatasetInfo.tsx # Dataset overview component
│   └── InsightsPanel.tsx
├── data/               # Sample datasets
│   └── sampleDatasets.ts
├── lib/                # Library configurations
│   └── supabase.ts    # Supabase client
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── dataAnalysis.ts # Data analysis functions
└── App.tsx             # Main application component
```

## Key Concepts Covered

### What is EDA?
Exploratory Data Analysis is the process of analyzing datasets to summarize their main characteristics using statistical graphics and visualization methods.

### Why Detect Outliers?
Outliers can skew statistical measures and affect model performance. Identifying them helps decide whether to remove or treat them specially.

### What is Correlation?
Correlation measures the strength and direction of a linear relationship between two numerical variables. Values range from -1 (strong negative) to +1 (strong positive).

### What is Multicollinearity?
When two or more features are highly correlated, they provide redundant information. This can affect model performance and interpretation.

### Why is Visualization Important?
Visualizations help identify patterns, trends, and anomalies that might not be obvious from looking at raw numbers alone.

## Analysis Functions

The project includes several utility functions for data analysis:

- `analyzeColumns()` - Automatically detects column types and calculates statistics
- `calculateDistribution()` - Creates histograms for numerical features
- `calculateCategoricalDistribution()` - Counts frequency of categories
- `calculateCorrelation()` - Computes correlation coefficients
- `detectOutliers()` - Identifies outliers using IQR method
- `generateInsights()` - Automatically generates insights from data

## Datasets Included

### Iris Dataset
Classic flower dataset with measurements of sepal and petal dimensions for three species. Perfect for learning classification and clustering.

### Netflix Movies and TV Shows
Sample content catalog with information about movies and TV shows including type, director, release year, duration, and ratings.

## Learning Outcomes

After using this tool, students will be able to:
- Understand data distribution patterns
- Identify relationships between features
- Detect outliers and anomalies
- Analyze categorical and numerical features
- Make informed decisions about data preprocessing
- Prepare data for machine learning models

## Interview Questions Covered

The tool helps students prepare for these common interview questions:
- What is EDA and why is it important?
- How do you detect outliers?
- What is correlation and how do you interpret it?
- What is multicollinearity and why does it matter?
- Why is data visualization important in data science?

## Future Enhancements

Potential features for future versions:
- CSV file upload support
- Custom dataset creation
- Box plot visualizations
- Statistical hypothesis tests
- Data export functionality
- Report generation

## License

Built for educational purposes.

## Support

For questions or issues, please refer to the documentation or reach out to your instructor.
