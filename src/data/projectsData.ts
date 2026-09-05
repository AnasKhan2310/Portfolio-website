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
  previewType?: string;
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
    id: "mediscan",
    title: "MediScan AI: Document Intelligence",
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
    order: 2,
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
