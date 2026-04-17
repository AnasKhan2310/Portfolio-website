import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const categories = ['ALL', 'MACHINE LEARNING', 'DEEP LEARNING', 'DATA ANALYSIS', 'AI & CHATBOTS'];

const projects = [
  {
    title: 'Heart Disease Predictor',
    category: 'MACHINE LEARNING',
    tech: 'Python, Scikit-learn, ML Classification',
    description: 'A predictive model that analyzes patient data to determine the likelihood of heart disease using various machine learning classification algorithms.',
    github: 'https://github.com/AnasKhan2310/heart-disease-predictor',
    emoji: '❤️',
    featured: true,
  },
  {
    title: 'AI Invoice Pro',
    category: 'AI & CHATBOTS',
    tech: 'React, Firebase, Gemini AI, TypeScript',
    description: 'A professional, AI-powered invoice generator that allows users to create, manage, and save professional invoices with ease. Features secure authentication and automated generation.',
    github: 'https://github.com/AnasKhan2310/Invoice-generator',
    emoji: '🚀',
    featured: false,
  },
  {
    title: 'AI Image Classifier Pro',
    category: 'DEEP LEARNING',
    tech: 'TypeScript, Teachable Machine, Computer Vision',
    description: 'A powerful, browser-based machine learning tool that allows users to train custom AI models to recognize objects, people, or gestures in real-time.',
    github: 'https://github.com/AnasKhan2310/Teachable-Machine',
    emoji: '📸',
    featured: false,
  },
  {
    title: 'Spotify Data Analysis',
    category: 'DATA ANALYSIS',
    tech: 'Python, Pandas, Matplotlib, Jupyter',
    description: 'Exploratory Data Analysis of Spotify\'s 2020 Top 200 Global Charts. Analyzed top artists, song popularity, and audio features like danceability and energy.',
    github: 'https://github.com/AnasKhan2310/Spotify-Data-Analysis-Project',
    emoji: '🎵',
    featured: false,
  },
  {
    title: 'Intelligent Customer Support Bot',
    category: 'AI & CHATBOTS',
    tech: 'Python, LangChain, OpenAI API, Streamlit',
    description: 'An AI-powered chatbot designed for automated customer support, utilizing RAG (Retrieval-Augmented Generation) to provide accurate answers from custom knowledge bases.',
    github: 'https://github.com/AnasKhan2310',
    emoji: '🤖',
    featured: false,
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'ALL' || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 px-6 lg:px-16 bg-secondary-bg">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8">Projects</h2>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300",
                activeCategory === cat
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "bg-white text-muted-text hover:bg-accent/10 hover:text-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border-t-4 border-transparent hover:border-accent transform hover:-translate-y-2",
                  project.featured && "md:col-span-2"
                )}
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="text-5xl mb-6">{project.emoji}</div>
                  <div className="flex items-center mb-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest rounded-md">
                      {project.category}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-accent text-[10px] font-bold uppercase tracking-wider mb-4">
                    {project.tech}
                  </p>
                  <p className="text-muted-text text-sm leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>
                  <div className="mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-accent font-bold text-sm hover:underline"
                    >
                      <span>GitHub</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/AnasKhan2310"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/20"
          >
            <span>View All on GitHub</span>
            <Github size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
