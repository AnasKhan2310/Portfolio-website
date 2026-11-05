export interface ProjectItem {
  id: string;
  title: string;
  category: 'SaaS Platform' | 'Generative AI' | 'Data Analytics';
  tag: string;
  statusBadge: string;
  problem: string;
  solution: string;
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  hasInteractivePreview?: boolean;
  previewType?: string;
  isFeatured: boolean;
  order: number;
  previewVisualType: 'saas-platform' | 'document-qa' | 'bi-dashboard';
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
    tag: "Next.js · FastAPI · PostgreSQL · Stripe",
    statusBadge: "Live SaaS App",
    problem: "Gym owners and independent trainers waste hours juggling separate tools for client logging, workout planning, and monthly subscription billing.",
    solution: "Built a full-stack SaaS platform combining automated AI workout generation, client progress tracking, and seamless recurring Stripe payments in one unified workspace.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Stripe API"],
    githubUrl: "https://github.com/AnasKhan2310/ZESTFIT-GYM-MANAGEMENT",
    liveDemoUrl: "https://zestfitmanagement.vercel.app/",
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
    title: "MediScan AI: Clinical Document Intelligence",
    category: "Generative AI",
    tag: "OCR · LLMs · FastAPI · React",
    statusBadge: "Live AI App",
    problem: "Medical lab reports and health records are unstructured and hard for non-specialists to read quickly, causing delays in understanding key health markers.",
    solution: "Engineered an OCR and LLM pipeline that extracts clinical biomarkers (e.g. Glucose, Cholesterol), flags abnormal values, and answers patient questions in plain language.",
    technologies: ["Python", "OCR (Tesseract)", "LLMs (Gemini/OpenAI)", "FastAPI", "React"],
    githubUrl: "https://github.com/AnasKhan2310",
    liveDemoUrl: "https://medi-scan-ai-theta.vercel.app/",
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
    id: "ecommerce-bi-dashboard",
    title: "Executive BI & Sales Intelligence Dashboard",
    category: "Data Analytics",
    tag: "Python · Pandas · Power BI / Recharts · SQL",
    statusBadge: "Live Dashboard",
    problem: "Executives handling massive sales datasets struggle to identify real revenue drivers, customer drop-offs, and product performance from raw SQL tables.",
    solution: "Created an interactive executive analytics dashboard that aggregates 520,000+ orders into live revenue trends, multi-country drill-downs, and automated RFM customer cohorts.",
    technologies: ["Python", "Pandas", "Power BI / Recharts", "SQL", "TypeScript"],
    githubUrl: "https://github.com/AnasKhan2310/Ecommerce-Sales-Intelligence-Dashboard",
    liveDemoUrl: "https://ecommerce-sales-intelligence-dashbo-flame.vercel.app/",
    isFeatured: true,
    order: 3,
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
