export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI & SaaS' | 'Automation' | 'Data Analytics' | 'AI / ML';
  tag: string;
  statusBadge: 'Live SaaS' | 'Autonomous Agents' | 'Portfolio Project' | 'Concept Demo' | 'Data Science' | 'ML Predictive Model' | 'Document Intelligence' | 'Computer Vision';
  shortDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  outcome: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  hasInteractivePreview?: boolean;
  previewType?: 'spotify';
  isFeatured: boolean;
  order: number;
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
    id: "zestfit",
    title: "ZestFit / AI Fitness SaaS",
    category: "AI & SaaS",
    tag: "SaaS Development",
    statusBadge: "Live SaaS",
    shortDescription: "AI-powered fitness SaaS platform designed to manage workouts, nutrition and user activity through an integrated digital experience.",
    problem: "Fitness enthusiasts and personal training businesses struggle with fragmented apps for nutrition tracking, dynamic workout scheduling, and client activity analysis, causing high churn and manual administrative overhead.",
    solution: "Architected a full-stack SaaS platform integrating dynamic AI workout routine generators, macro nutrition calculation, and real-time exercise logging into a unified, subscription-ready digital experience.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Tailwind CSS", "Stripe"],
    outcome: "Delivers automated workout customization, centralized client progress tracking, and streamlined SaaS membership monetization.",
    githubUrl: "https://github.com/AnasKhan2310/ZESTFIT-GYM-MANAGEMENT",
    liveDemoUrl: "https://zestfitmanagement.vercel.app/",
    isFeatured: true,
    order: 1,
    caseStudy: {
      businessProblem: "Fitness professionals and gyms lose up to 15 hours weekly creating individualized diet & training regimens across disjointed spreadsheets and messaging apps.",
      approach: "Built a modular Next.js frontend paired with a high-speed FastAPI backend that structures client metadata into personalized workout parameters and nutrition macros.",
      architectureSolution: "Unified dashboard with JWT authentication, PostgreSQL relational data models, Stripe webhook billing integration, and responsive data visualizers.",
      keyFeatures: [
        "Dynamic workout routine builder tailored to fitness goals and equipment availability",
        "Automated macronutrient and caloric target calculation based on user biometrics",
        "Interactive client activity dashboards and historical progress charts",
        "Subscription tier management with secure payment processing"
      ],
      capabilities: [
        "End-to-end full-stack SaaS architecture with production-grade database schema",
        "Zero-friction client onboarding and responsive mobile-first dashboard",
        "Scalable API architecture designed for high-concurrency member requests"
      ]
    }
  },
  {
    id: "spotify",
    title: "Spotify Streaming Data Analytics",
    category: "Data Analytics",
    tag: "Data Science & Insights",
    statusBadge: "Data Science",
    shortDescription: "Interactive analytics project exploring streaming patterns, content trends and listener behavior to generate actionable insights from large-scale Spotify data.",
    problem: "Uncovering actionable patterns from massive multi-dimensional streaming metrics requires deep exploratory analysis, audio feature clustering, and clear visual communication.",
    solution: "Processed and analyzed extensive Spotify music datasets using Python and Pandas, uncovering key correlations between audio attributes (danceability, energy, acousticness) and popularity trajectories.",
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "React", "Recharts"],
    outcome: "Provides interactive exploration of audio feature distributions, artist popularity curves, and track longevity analysis through an embedded React analytics dashboard.",
    githubUrl: "https://github.com/AnasKhan2310/Spotify-Data-Analysis",
    hasInteractivePreview: true,
    previewType: "spotify",
    isFeatured: true,
    order: 2,
    caseStudy: {
      businessProblem: "Music producers and marketing agencies need data-backed insights on which audio characteristics and release timings correlate with viral streaming performance.",
      approach: "Applied exploratory data analysis (EDA), multi-variable correlation heatmaps, and outlier detection across thousands of Spotify tracks.",
      architectureSolution: "Python ETL script generating structured analytics JSON fed directly into an interactive in-browser dashboard with dynamic chart filters.",
      keyFeatures: [
        "Audio feature correlation matrix (Tempo vs Energy vs Danceability)",
        "Decade-by-decade streaming trend and track duration evolution analysis",
        "Genre-based popularity distributions with interactive percentile sliders",
        "Embedded interactive dashboard for real-time dataset exploration"
      ],
      capabilities: [
        "Large-scale tabular data manipulation using vectorised Pandas operations",
        "Custom interactive charting with responsive tooltips and metric switching"
      ]
    }
  },
  {
    id: "mediscan",
    title: "MediScan AI — Document Intelligence",
    category: "AI / ML",
    tag: "Document Intelligence",
    statusBadge: "Document Intelligence",
    shortDescription: "AI-powered clinical report analysis and document intelligence application.",
    problem: "Medical lab reports and unstructured clinical summaries contain dense medical data that takes valuable time for practitioners to manually digitize and synthesize.",
    solution: "Developed an OCR and NLP document intelligence web tool that extracts text from medical documents, identifies key biomarkers, and highlights out-of-range indicators with preliminary clinical summaries.",
    technologies: ["Python", "OCR (Tesseract)", "NLP", "FastAPI", "React", "Tailwind CSS"],
    outcome: "Streamlines document parsing by turning static clinical scans into structured, searchable digital records with instant biomarker extraction.",
    githubUrl: "https://github.com/AnasKhan2310",
    liveDemoUrl: "https://medi-scan-ai-theta.vercel.app/",
    isFeatured: true,
    order: 3,
    caseStudy: {
      businessProblem: "Unstructured physical paper lab reports cause friction during digital triage and patient intake workflows.",
      approach: "Combines high-accuracy optical character recognition (OCR) with regex biomarker parsing and LLM summarization.",
      architectureSolution: "Client-side image pre-processing sending documents to a FastAPI backend that extracts text and structures biomarker entities.",
      keyFeatures: [
        "OCR image-to-text extraction supporting scanned lab reports and PDFs",
        "Automated biomarker entity recognition (Cholesterol, Glucose, Hemoglobin)",
        "Structured summary generation with visual reference range indicators"
      ],
      capabilities: [
        "High-accuracy text extraction from noisy document scans",
        "Fast response latency with clean client-side validation"
      ]
    }
  }
];

export const OTHER_PROJECTS: ProjectItem[] = [];

export const ALL_PROJECTS = [...FEATURED_PROJECTS];
