export interface ProjectItem {
  id: string;
  title: string;
  category: 'SaaS Platform' | 'Generative AI' | 'Computer Vision' | 'Data Analytics';
  tag: string;
  statusBadge: string;
  shortDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  keyHighlights: string[];
  outcome: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  hasInteractivePreview?: boolean;
  previewType?: string;
  isFeatured: boolean;
  order: number;
  previewVisualType: 'saas-platform' | 'document-qa' | 'teachable-machine' | 'bi-dashboard';
  caseStudy: {
    businessProblem: string;
    approach: string;
    architectureSolution: string;
    keyFeatures: string[];
    capabilities: string[];
    workflowSteps?: string[];
  };
}

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "zestfit-saas",
    title: "ZestFit: AI Health & Gym Management SaaS",
    category: "SaaS Platform",
    tag: "Full-Stack SaaS · Next.js · FastAPI · PostgreSQL",
    statusBadge: "Live SaaS Application",
    shortDescription: "Full-stack SaaS platform automating member management, AI-driven workout routine generation, and recurring Stripe subscriptions.",
    problem: "Fitness clubs and independent trainers struggle with fragmented tools for program building, client logging, and membership billing.",
    solution: "Engineered an end-to-end multi-tenant application connecting a Next.js interface with a FastAPI backend and PostgreSQL database, featuring automated routine generation and Stripe billing.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Tailwind CSS", "Stripe API"],
    keyHighlights: [
      "AI Workout Engine: Generates personalized multi-week regimes based on equipment and goals",
      "Stripe Subscription Pipeline: Full membership lifecycle with webhook tier gating",
      "Member Activity Hub: Real-time workout logging, macro tracking, and attendance analytics"
    ],
    outcome: "Eliminates administrative bottlenecks with automated billing and instant program generation.",
    githubUrl: "https://github.com/AnasKhan2310/ZESTFIT-GYM-MANAGEMENT",
    liveDemoUrl: "https://zestfitmanagement.vercel.app/",
    hasInteractivePreview: false,
    isFeatured: true,
    order: 1,
    previewVisualType: 'saas-platform',
    caseStudy: {
      businessProblem: "Fitness professionals lose administrative hours manually building personalized programs and tracking client payments across unintegrated apps.",
      approach: "Designed a modular REST API backend using FastAPI and PostgreSQL, coupled with a responsive Next.js frontend with secure JWT token authentication and Stripe webhook handling.",
      architectureSolution: "Full-stack application deployed on Vercel and cloud containers with relational schema design, role-based access control, and asynchronous workout generation.",
      keyFeatures: [
        "AI Workout Generator: Generates targeted exercise routines based on training goals and equipment constraints",
        "Macro & Caloric Computation: Dynamic calculation of daily nutritional targets adjusted for member biometrics",
        "Interactive Member Hub: Historical activity logs, personal record trackers, and progress visualization",
        "Stripe Billing Integration: Complete recurring subscription lifecycle with webhooks for tier gating"
      ],
      capabilities: [
        "Full-stack web application architecture with Next.js and FastAPI",
        "Relational database modeling with PostgreSQL and SQLAlchemy",
        "Production deployment, API security, and third-party webhook orchestration"
      ]
    }
  },
  {
    id: "mediscan-document-qa",
    title: "MediScan AI: Document Q&A & Clinical Intelligence",
    category: "Generative AI",
    tag: "Document Intelligence · OCR · LLMs · FastAPI",
    statusBadge: "Document Intelligence Demo",
    shortDescription: "AI document analysis application that scans complex reports, extracts clinical biomarkers, and answers contextual user questions.",
    problem: "Unstructured diagnostic reports, lab summaries, and invoices require tedious manual transcription and error-prone interpretation.",
    solution: "Built a document intelligence pipeline combining OCR text parsing, regex biomarker extraction, and LLM-powered context querying for instant report understanding.",
    technologies: ["Python", "OCR (Tesseract)", "NLP", "LLMs (OpenAI / Gemini)", "FastAPI", "React", "Tailwind CSS"],
    keyHighlights: [
      "High-Accuracy OCR Extraction: Digitizes text from mobile phone camera scans and multi-page PDFs",
      "Biomarker Flagging: Automatically highlights out-of-range clinical indicators like Glucose and Cholesterol",
      "Conversational Document Q&A: Natural language questioning grounded strictly in uploaded documents"
    ],
    outcome: "Enables instant report scanning and plain-language answers with strict factual grounding.",
    githubUrl: "https://github.com/AnasKhan2310",
    liveDemoUrl: "https://medi-scan-ai-theta.vercel.app/",
    hasInteractivePreview: false,
    isFeatured: true,
    order: 2,
    previewVisualType: 'document-qa',
    caseStudy: {
      businessProblem: "Paper-based and scanned reports introduce friction into digital records workflows, requiring manual data entry and specialist review.",
      approach: "Engineered an image pre-processing pipeline for scanned documents, coupled with OCR text extraction and prompt-engineered LLM context windows for document question answering.",
      architectureSolution: "Client-side image upload and validation layer communicating with a FastAPI backend that orchestrates OCR extraction, entity parsing, and LLM reasoning.",
      keyFeatures: [
        "OCR Document Ingestion: Extracts structured text from multi-page PDFs and noisy mobile camera scans",
        "Entity & Biomarker Recognition: Automatically identifies clinical biomarkers and highlights out-of-range flags",
        "Conversational Document Q&A: Allows users to ask natural language questions grounded in document contents",
        "Structured Summary Generation: Provides clean bulleted executive summaries highlighting actionable takeaways"
      ],
      capabilities: [
        "OCR image pre-processing (binarization, contrast enhancement, skew correction)",
        "Prompt engineering for factual, hallucination-resistant document Q&A",
        "Full-stack integration connecting Python AI backends to modern React UIs"
      ]
    }
  },
  {
    id: "teachable-machine-vision",
    title: "Teachable Machine: Vision AI Classifier",
    category: "Computer Vision",
    tag: "Interactive Vision AI · TensorFlow.js · Real-Time Classifier",
    statusBadge: "Interactive Classifier Demo",
    shortDescription: "Interactive computer vision classifier running client-side transfer learning to recognize objects and gestures via live camera or test inputs.",
    problem: "Businesses often lack fast, accessible ways to prototype and test visual quality inspection or custom image sorting without heavy cloud pipelines.",
    solution: "Constructed an in-browser computer vision system utilizing transfer learning and Teachable Machine models to classify images with sub-50ms inference and confidence meters.",
    technologies: ["Python", "TensorFlow.js", "Teachable Machine", "Computer Vision", "TypeScript", "Canvas API"],
    keyHighlights: [
      "Sub-50ms In-Browser Inference: Runs lightweight neural classification directly in client browser memory",
      "Dual Input Modes: Toggle between live webcam stream and preset test image categories",
      "Real-Time Confidence Meters: Dynamic probability distribution bars across recognized visual classes"
    ],
    outcome: "Delivers responsive visual classification with zero server latency and immediate confidence feedback.",
    githubUrl: "https://github.com/AnasKhan2310",
    hasInteractivePreview: true,
    previewType: "vision",
    isFeatured: true,
    order: 3,
    previewVisualType: 'teachable-machine',
    caseStudy: {
      businessProblem: "Deploying custom visual classification models usually incurs expensive cloud GPU latency and complex infrastructure for early-stage proof of concepts.",
      approach: "Trained transfer-learning models on custom image classes and exported optimized weights for client-side TensorFlow.js execution, enabling instantaneous classification.",
      architectureSolution: "Reactive React interface capturing video frames and canvas pixels, normalizing tensors, and updating animated probability distributions in real time.",
      keyFeatures: [
        "Transfer Learning Classification: Custom neural model tuned on distinct object and pose categories",
        "Webcam Stream Processing: Real-time video frame sampling at 30 FPS",
        "Sample Benchmark Suite: Instant evaluation against curated test images across target categories",
        "Confidence Threshold Filtering: Dynamic classification attribution with certainty scoring"
      ],
      capabilities: [
        "Computer vision model training and transfer learning workflows",
        "TensorFlow.js client-side inference optimization and tensor manipulation",
        "Interactive real-time visual UI feedback and camera hardware integration"
      ]
    }
  },
  {
    id: "ecommerce-bi-dashboard",
    title: "Executive BI & Sales Intelligence Dashboard",
    category: "Data Analytics",
    tag: "Data Analytics · Python · Pandas · Power BI & Recharts",
    statusBadge: "Live Dashboard Demo",
    shortDescription: "Executive BI and analytics dashboard transforming 520,000+ transactional records into instant KPI cards, trend curves, and RFM customer cohorts.",
    problem: "Business decision-makers struggle to extract fast, actionable revenue insights from raw transactional databases, leaving customer retention trends obscured.",
    solution: "Engineered an executive analytics dashboard aggregating raw transaction logs into dynamic KPI cards, seasonal revenue wave charts, and automated RFM customer cohorts.",
    technologies: ["Python", "Pandas", "Power BI / Recharts", "React", "TypeScript", "Tailwind CSS", "SQL"],
    keyHighlights: [
      "Sub-Second Data Slicing: Instant multi-criteria filtering across global markets, dates, and categories",
      "RFM Customer Cohorts: Automated segmentation into Loyal Champions, At-Risk, and Recent Buyers",
      "Interactive Trend Curves: Comparative period-over-period tracking with dual-wave revenue curves"
    ],
    outcome: "Empowers leadership with instant visibility into revenue concentration, customer retention, and sales velocity.",
    githubUrl: "https://github.com/AnasKhan2310/Ecommerce-Sales-Intelligence-Dashboard",
    liveDemoUrl: "https://ecommerce-sales-intelligence-dashbo-flame.vercel.app/",
    hasInteractivePreview: true,
    previewType: "analytics",
    isFeatured: true,
    order: 4,
    previewVisualType: 'bi-dashboard',
    caseStudy: {
      businessProblem: "Enterprises handling large transaction databases often lack unified, accessible business intelligence, delaying quarterly reviews and strategic planning.",
      approach: "Extracted and sanitized 520,000+ clean transactional logs using a Python and Pandas ETL pipeline. Formulated core operational metrics and architected a responsive dashboard.",
      architectureSolution: "Developed a modular architecture combining high-performance client state management with responsive charting libraries and multi-dimensional facet filtering.",
      keyFeatures: [
        "Executive KPI Metric Cards: Gross revenue, transaction counts, average order value, and active customer metrics",
        "Multi-Facet Filter Pipeline: Instantaneous slicing across global markets, time periods, and merchandise categories",
        "Customer RFM Segmentation: Cohort distribution classification based on recency, frequency, and monetary metrics",
        "Interactive Trend Curves: Dual-wave comparative charts tracking period-over-period growth and seasonal peaks",
        "Searchable Data Ledger: In-browser tabular inspection with multi-column sorting and direct CSV export"
      ],
      capabilities: [
        "Python & Pandas ETL scripting for dataset sanitization and aggregation",
        "Responsive, high-density dashboard UI design with sub-second filter response",
        "Statistical metric formulation and cohort analysis modeling"
      ]
    }
  }
];

export const OTHER_PROJECTS: ProjectItem[] = [];

export const ALL_PROJECTS = [...FEATURED_PROJECTS];
