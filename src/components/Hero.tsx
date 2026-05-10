import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import profilePic from '../assets/pic.png';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center px-6 lg:px-16 py-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-1"
        >
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Welcome to my portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            I'm <span className="text-accent whitespace-nowrap">Muhammad Anas Khan</span>
          </h1>
          <div className="w-20 h-1.5 bg-accent mb-6" />
          <h3 className="text-xl md:text-2xl font-bold text-near-black/80 mb-6 uppercase tracking-wide">
            AI & Data Science Engineer
          </h3>
          <p className="text-muted-text text-lg max-w-xl mb-10 leading-relaxed">
            I don't just study AI, I build with it. As an AI & Data Science Engineer who turns raw data into real impact, I build machine learning models, intelligent chatbots, and automation systems that solve actual business problems. Whether you're a recruiter looking for a dedicated AI engineer or a business needing a custom AI solution, let's talk.
          </p>
          <a
            href="#about"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/20"
          >
            <span>More About Me</span>
            <ArrowRight size={20} />
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-48 h-64 md:w-72 md:h-96 rounded-2xl overflow-hidden border-4 border-accent shadow-2xl shrink-0 relative group bg-accent/5">
            <img
              src={profilePic}
              alt="Muhammad Anas Khan"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
