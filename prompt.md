Project: Korai Report Analyzer
🎯 PROJECT OVERVIEW
Objective: Build a medical lab report analyzer web application that matches KoraiHealth.com's design aesthetic and functionality. Users can upload PDF or image lab reports, extract health parameters using OCR, and view results in an interactive dashboard with trend analysis and health insights.

🎨 DESIGN REQUIREMENTS
Visual Style Reference:
Website: https://koraihealth.com/
Color Palette: Warm browns (
#8B7355), cream backgrounds (
#F5F3F0), clinical whites, soft grays
Typography: Clean, professional sans-serif fonts (Inter or similar)
Layout: Modern, card-based design with rounded corners and subtle shadows
Feel: Medical-grade professionalism with family-friendly warmth
UI Components Style:
css
/* Core Color System */
Primary Brown: #8B7355
Light Brown: #A68B6B  
Cream Background: #F5F3F0
Success Green: #10B981
Warning Orange: #F59E0B
Danger Red: #EF4444
Text Gray: #6B7280
Component Design Language:
Cards: Rounded-xl corners, subtle shadows, warm backgrounds
Buttons: Rounded-lg, brown gradient, clean hover states
Status Indicators: Color-coded badges with icons
Charts: Clean line charts with health-focused color coding
Tables: Alternating row colors, clear headers, sortable columns
⚙️ TECHNICAL SPECIFICATIONS
Core Technology Stack:
bash
# Frontend Framework
React 18 + Vite (fastest development setup)

# Styling
Tailwind CSS (rapid UI development)

# OCR Processing
Tesseract.js (client-side, completely free)

# PDF Processing  
PDF.js (extract text from PDF lab reports)

# Charts & Visualization
Recharts (clean, customizable charts)

# Icons
Heroicons React (consistent icon system)

# Date Handling
date-fns (lightweight date utilities)
Installation Commands:
bash
npm create vite@latest korai-report-analyzer --template react
cd korai-report-analyzer
npm install tesseract.js pdfjs-dist recharts
npm install @heroicons/react date-fns
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
🏗️ APPLICATION ARCHITECTURE
File Structure:
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── StatusBadge.jsx
│   │   └── LoadingSpinner.jsx
│   ├── layout/             # Layout components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── features/           # Feature-specific components
│   │   ├── FileUpload.jsx
│   │   ├── OCRProcessor.jsx
│   │   ├── ResultsTable.jsx
│   │   ├── TrendChart.jsx
│   │   └── HealthInsights.jsx
├── pages/                  # Page components
│   ├── HomePage.jsx
│   ├── ResultsPage.jsx
│   └── HistoryPage.jsx
├── utils/                  # Utility functions
│   ├── ocrUtils.js
│   ├── dataExtraction.js
│   ├── healthAnalysis.js
│   └── localStorage.js
├── data/                   # Static data
│   ├── normalRanges.js
│   └── healthInsights.js
└── hooks/                  # Custom React hooks
    ├── useOCR.js
    ├── useLocalStorage.js
    └── useHealthAnalysis.js
Routing Structure:
jsx
// React Router Setup
/ (HomePage)           - File upload interface + demo
/results/:id          - Individual report analysis
/history              - All past reports dashboard
🔍 OCR & DATA PROCESSING LOGIC
File Processing Workflow:
javascript
1. File Upload Validation
   - Accept: PDF, JPG, PNG, HEIC
   - Max size: 10MB
   - MIME type validation

2. Text Extraction
   - For Images: Tesseract.js OCR processing
   - For PDFs: PDF.js text extraction
   - Progress tracking and error handling

3. Data Parsing
   - Regex pattern matching for Indian lab reports
   - Parameter extraction (name, value, unit, range)
   - Smart normalization of values

4. Health Analysis
   - Compare against normal ranges database
   - Generate status indicators (Normal/Monitor/Attention)
   - Create trend data with historical simulation

5. Results Display
   - Interactive parameter table
   - Trend visualization charts
   - Rule-based health insights
Critical Regex Patterns:
javascript
const labPatterns = {
  // HbA1c variations (Indian lab formats)
  hba1c: [
    /(?:hba1c|hb\s*a1c|glycated\s*hemoglobin)[:\s]*(\d+\.?\d*)\s*(%|percent)/i,
    /hemoglobin\s*a1c[:\s]*(\d+\.?\d*)\s*%/i
  ],
  
  // Cholesterol panel
  totalCholesterol: /(?:total\s*)?cholesterol[:\s]*(\d+)\s*mg[\/\s]*dl/i,
  hdlCholesterol: /hdl[:\s]*(\d+)\s*mg[\/\s]*dl/i,
  ldlCholesterol: /ldl[:\s]*(\d+)\s*mg[\/\s]*dl/i,
  
  // Vitamin D (common deficiency in India)
  vitaminD: [
    /vitamin\s*d[:\s]*(\d+\.?\d*)\s*ng[\/\s]*ml/i,
    /25\s*oh\s*vitamin\s*d[:\s]*(\d+\.?\d*)/i,
    /cholecalciferol[:\s]*(\d+\.?\d*)/i
  ],
  
  // Blood glucose
  glucose: [
    /(?:glucose|blood\s*sugar)[:\s]*(\d+)\s*mg[\/\s]*dl/i,
    /fasting\s*glucose[:\s]*(\d+)/i,
    /random\s*glucose[:\s]*(\d+)/i,
    /pp\s*glucose[:\s]*(\d+)/i
  ],
  
  // Hemoglobin
  hemoglobin: /(?:hemoglobin|hb)(?!\s*a1c)[:\s]*(\d+\.?\d*)\s*g[\/\s]*dl/i,
  
  // Thyroid panel
  tsh: /tsh[:\s]*(\d+\.?\d*)\s*(?:miu[\/\s]*ml|uiu[\/\s]*ml)/i,
  t3: /t3[:\s]*(\d+\.?\d*)\s*ng[\/\s]*dl/i,
  t4: /t4[:\s]*(\d+\.?\d*)\s*ug[\/\s]*dl/i,
  
  // Liver function
  sgpt: /(?:sgpt|alt)[:\s]*(\d+)\s*u[\/\s]*l/i,
  sgot: /(?:sgot|ast)[:\s]*(\d+)\s*u[\/\s]*l/i,
  
  // Kidney function
  creatinine: /creatinine[:\s]*(\d+\.?\d*)\s*mg[\/\s]*dl/i,
  urea: /urea[:\s]*(\d+)\s*mg[\/\s]*dl/i
};
Normal Ranges Database:
javascript
const normalRanges = {
  hba1c: { 
    min: 4.0, max: 5.7, unit: '%', 
    ranges: { normal: '4.0-5.7', prediabetes: '5.7-6.4', diabetes: '≥6.5' }
  },
  totalCholesterol: { 
    min: 0, max: 200, unit: 'mg/dL',
    ranges: { desirable: '<200', borderline: '200-239', high: '≥240' }
  },
  vitaminD: { 
    min: 30, max: 50, unit: 'ng/mL',
    ranges: { deficient: '<20', insufficient: '20-29', sufficient: '30-50' }
  },
  glucose: { 
    min: 70, max: 100, unit: 'mg/dL',
    ranges: { normal: '70-100', prediabetes: '100-125', diabetes: '≥126' }
  },
  hemoglobin: {
    male: { min: 13.5, max: 17.5, unit: 'g/dL' },
    female: { min: 12.0, max: 15.5, unit: 'g/dL' }
  }
  // Add more parameters...
};
📊 DASHBOARD COMPONENTS
1. Parameter Cards Grid:
jsx
// Display extracted parameters as cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {parameters.map(param => (
    <ParameterCard 
      key={param.name}
      name={param.name}
      value={param.value}
      unit={param.unit}
      normalRange={param.normalRange}
      status={param.status}
      trend={param.trend}
    />
  ))}
</div>
2. Interactive Results Table:
jsx
// Sortable, filterable table of all parameters
<Table>
  <Header>
    <Column>Parameter</Column>
    <Column>Your Value</Column>
    <Column>Normal Range</Column>
    <Column>Status</Column>
    <Column>Trend</Column>
    <Column>Last Updated</Column>
  </Header>
  <Body>
    {filteredParameters.map(param => (
      <Row key={param.id}>
        <Cell>{param.name}</Cell>
        <Cell className="font-semibold">{param.value} {param.unit}</Cell>
        <Cell className="text-gray-600">{param.normalRange}</Cell>
        <Cell><StatusBadge status={param.status} /></Cell>
        <Cell><TrendIndicator trend={param.trend} /></Cell>
        <Cell>{formatDate(param.lastUpdated)}</Cell>
      </Row>
    ))}
  </Body>
</Table>
3. Trend Visualization:
jsx
// Line charts showing parameter trends over time
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={trendData}>
    <XAxis dataKey="date" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Line 
      type="monotone" 
      dataKey="value" 
      stroke="#8B7355" 
      strokeWidth={2}
    />
    <ReferenceLine 
      y={normalRange.max} 
      stroke="#EF4444" 
      strokeDasharray="5 5" 
      label="Upper Limit"
    />
    <ReferenceLine 
      y={normalRange.min} 
      stroke="#EF4444" 
      strokeDasharray="5 5" 
      label="Lower Limit"
    />
  </LineChart>
</ResponsiveContainer>
🧠 HEALTH INSIGHTS ENGINE
Rule-Based Analysis:
javascript
const generateHealthInsights = (parameters) => {
  const insights = [];
  
  parameters.forEach(param => {
    const { name, value, status, normalRange } = param;
    
    // Critical values requiring immediate attention
    if (status === 'critical') {
      if (name === 'hba1c' && value >= 6.5) {
        insights.push({
          type: 'critical',
          title: 'Diabetes Detected',
          message: `Your HbA1c of ${value}% indicates diabetes. This requires immediate medical attention.`,
          actions: ['Consult endocrinologist', 'Start blood sugar monitoring', 'Dietary modifications'],
          priority: 1
        });
      }
      
      if (name === 'totalCholesterol' && value >= 240) {
        insights.push({
          type: 'warning',
          title: 'High Cholesterol Risk',
          message: `Cholesterol level of ${value} mg/dL significantly increases cardiovascular risk.`,
          actions: ['Cardiology consultation', 'Lipid-lowering diet', 'Regular exercise'],
          priority: 2
        });
      }
    }
    
    // Positive trends and healthy values
    if (status === 'normal') {
      insights.push({
        type: 'positive',
        title: `Healthy ${name}`,
        message: `Your ${name} is in the optimal range. Great job!`,
        actions: ['Maintain current lifestyle'],
        priority: 5
      });
    }
    
    // Deficiency patterns
    if (name === 'vitaminD' && value < 20) {
      insights.push({
        type: 'info',
        title: 'Vitamin D Deficiency',
        message: `Severe deficiency detected (${value} ng/mL). Common in India due to limited sun exposure.`,
        actions: ['Increase sun exposure (15-20 min daily)', 'Vitamin D3 supplements', 'Include fatty fish in diet'],
        priority: 3
      });
    }
  });
  
  return insights.sort((a, b) => a.priority - b.priority);
};
💾 DATA PERSISTENCE
Local Storage Implementation:
javascript
// Browser localStorage for report history (no backend needed)
const STORAGE_KEYS = {
  REPORTS: 'korai_lab_reports',
  USER_PREFERENCES: 'korai_user_prefs'
};

const saveReport = (reportData) => {
  const reports = getStoredReports();
  const newReport = {
    id: `report_${Date.now()}`,
    timestamp: new Date().toISOString(),
    filename: reportData.filename,
    parameters: reportData.parameters,
    insights: reportData.insights,
    rawText: reportData.rawText // For debugging/verification
  };
  
  reports.push(newReport);
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  return newReport;
};

const getStoredReports = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
  } catch (error) {
    console.error('Failed to parse stored reports:', error);
    return [];
  }
};
📱 RESPONSIVE DESIGN REQUIREMENTS
Breakpoint Strategy:
css
/* Mobile First Approach */
.container {
  /* Mobile: 320px+ */
  @apply px-4 py-6;
  
  /* Tablet: 768px+ */
  @screen md {
    @apply px-8 py-8 grid grid-cols-2 gap-6;
  }
  
  /* Desktop: 1024px+ */
  @screen lg {
    @apply px-12 py-12 grid-cols-3 max-w-7xl mx-auto;
  }
}

/* Key responsive patterns */
.parameter-grid {
  @apply grid grid-cols-1 gap-4;
  @screen md { @apply grid-cols-2 gap-6; }
  @screen lg { @apply grid-cols-3; }
}

.results-table {
  @apply overflow-x-auto;
  
  /* Stack on mobile */
  @screen max-md {
    .table-row { @apply block border-b pb-4 mb-4; }
    .table-cell { @apply block py-1; }
    .table-cell:before { content: attr(data-label) ": "; @apply font-semibold; }
  }
}
🚀 PERFORMANCE OPTIMIZATION
OCR Processing Optimization:
javascript
// Image preprocessing for better OCR accuracy
const preprocessImage = (imageElement) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;
  
  // Enhance contrast and brightness
  ctx.filter = 'contrast(1.5) brightness(1.2)';
  ctx.drawImage(imageElement, 0, 0);
  
  return canvas.toDataURL();
};

// Chunked processing for large documents
const processLargeDocument = async (file, onProgress) => {
  const chunkSize = 1024 * 1024; // 1MB chunks
  const chunks = [];
  
  for (let i = 0; i < file.size; i += chunkSize) {
    const chunk = file.slice(i, i + chunkSize);
    chunks.push(chunk);
    onProgress(i / file.size);
  }
  
  return chunks;
};
🎯 IMPLEMENTATION CHECKLIST
Phase 1: Foundation (Hour 1)
✅ Setup Vite React project with Tailwind
✅ Configure Korai Health color scheme
✅ Create basic layout components (Header, Footer, Layout)
✅ Build file upload interface with drag & drop
✅ Add loading states and progress indicators
✅ Test Tesseract.js basic integration
Phase 2: Core Features (Hour 2)
✅ Implement OCR processing with progress tracking
✅ Add PDF text extraction capability
✅ Create regex pattern matching for lab parameters
✅ Build parameter extraction and normalization logic
✅ Design and implement results table component
✅ Add status indicators and health insights
Phase 3: Enhancement (Hour 3)
✅ Create trend visualization with Recharts
✅ Implement report history with localStorage
✅ Add mobile responsive design
✅ Build comprehensive health insights engine
✅ Add error handling and edge cases
✅ Polish UI and add smooth animations
🛡️ SECURITY & BEST PRACTICES
Input Validation:
javascript
// File validation
const validateFile = (file) => {
  const allowedTypes = [
    'application/pdf',
    'image/jpeg', 'image/jpg', 'image/png', 'image/heic'
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Unsupported file type. Please upload PDF, JPG, PNG, or HEIC files.');
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 10MB.');
  }
  
  return true;
};

// Data sanitization
const sanitizeExtractedText = (text) => {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
};
Error Handling Strategy:
javascript
// Comprehensive error boundaries
const OCRErrorBoundary = ({ children, onError }) => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">Processing Failed</h3>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button 
            onClick={resetErrorBoundary}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  );
};
🎨 FINAL UI POLISH REQUIREMENTS
Animation & Transitions:
css
/* Smooth transitions throughout */
.card-hover {
  @apply transition-all duration-200 hover:shadow-lg hover:-translate-y-1;
}

.loading-pulse {
  @apply animate-pulse bg-gradient-to-r from-korai-cream to-white;
}

.success-animation {
  @apply animate-bounce text-green-500;
}

/* Status indicator animations */
.status-badge {
  @apply transition-colors duration-300;
}

.trend-up {
  @apply text-green-500 animate-pulse;
}

.trend-down {
  @apply text-red-500 animate-pulse;
}
Accessibility Requirements:
jsx
// ARIA labels and screen reader support
<button 
  aria-label="Upload lab report file"
  aria-describedby="upload-instructions"
  className="focus:ring-2 focus:ring-korai-brown focus:outline-none"
>
  Upload Report
</button>

<div id="upload-instructions" className="sr-only">
  Upload PDF or image files up to 10MB. Supported formats: PDF, JPG, PNG, HEIC.
</div>

// Keyboard navigation
<div 
  tabIndex={0}
  onKeyPress={(e) => e.key === 'Enter' && handleUpload()}
  className="focus:ring-2 focus:ring-korai-brown"
>
  Drop files here or click to browse
</div>
📋 TESTING STRATEGY
Test Cases to Validate:
File Upload: Various file types, sizes, and error conditions
OCR Accuracy: Sample lab reports with different layouts
Data Extraction: Edge cases in parameter detection
Responsive Design: Mobile, tablet, desktop layouts
Performance: Large file processing and memory usage
Accessibility: Screen reader compatibility, keyboard navigation
Error Handling: Network failures, invalid files, processing errors
Sample Test Data:
javascript
// Mock lab report data for testing
const mockLabReports = [
  {
    filename: "sample_report_1.pdf",
    parameters: [
      { name: "HbA1c", value: 6.2, unit: "%", status: "high" },
      { name: "Cholesterol", value: 185, unit: "mg/dL", status: "normal" },
      { name: "Vitamin D", value: 18, unit: "ng/mL", status: "low" }
    ]
  },
  // Add more test cases...
];
🎯 SUCCESS CRITERIA
Functional Requirements:
✅ Successfully processes PDF and image lab reports
✅ Extracts at least 80% of common lab parameters accurately
✅ Displays results in clean, sortable table format
✅ Shows health status indicators and trend analysis
✅ Provides meaningful health insights and recommendations
✅ Maintains report history using browser storage
✅ Works seamlessly on mobile and desktop devices
Design Requirements:
✅ Matches Korai Health visual aesthetic perfectly
✅ Professional medical interface with family-friendly warmth
✅ Smooth animations and micro-interactions
✅ Accessible design with proper ARIA labels
✅ Fast loading times and responsive user feedback
Technical Requirements:
✅ No external API dependencies (fully client-side)
✅ Secure file handling with proper validation
✅ Clean, maintainable code structure
✅ Comprehensive error handling
✅ Production-ready deployment capability