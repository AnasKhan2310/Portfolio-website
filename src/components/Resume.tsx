import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

const education = [
  {
    title: 'BS Computer Science',
    institution: 'Federal Urdu University, Karachi',
    description: 'Specializing in Artificial Intelligence & Data Science. Gaining deep knowledge in algorithms, data structures, and advanced computing.',
  },
  {
    title: 'Deep Learning & Neural Networks',
    institution: 'Specialization',
    description: 'Hands-on experience with TensorFlow, Keras, CNNs, LSTMs, and Transfer Learning for computer vision and sequence modeling.',
  },
  {
    title: 'Machine Learning Fundamentals',
    institution: 'Specialization',
    description: 'Mastering Scikit-learn for Regression, Classification, and Clustering. Understanding the mathematical foundations of ML.',
  },
  {
    title: 'Python for Data Science',
    institution: 'Core Skills',
    description: 'Expertise in Pandas, NumPy, Matplotlib, and Seaborn for data manipulation and visualization.',
  },
];

const skillGroups = [
  {
    category: 'Programming',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 40 },
      { name: 'HTML/CSS', level: 65 },
    ],
  },
  {
    category: 'Machine Learning',
    skills: [
      { name: 'Scikit-learn', level: 80 },
      { name: 'TensorFlow', level: 70 },
      { name: 'Keras', level: 70 },
    ],
  },
  {
    category: 'Data Science',
    skills: [
      { name: 'Pandas/NumPy', level: 85 },
      { name: 'Matplotlib', level: 85 },
      { name: 'Jupyter/Colab', level: 90 },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git & GitHub', level: 75 },
      { name: 'VS Code', level: 90 },
      { name: 'Streamlit', level: 85 },
    ],
  },
  {
    category: 'AI & Automation',
    skills: [
      { name: 'LLMs/LangChain', level: 65 },
      { name: 'NLP', level: 70 },
      { name: 'Automation Tools', level: 75 },
    ],
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  key?: any;
}

function SkillBar({ name, level }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setWidth(level);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="mb-6" ref={barRef}>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-bold uppercase tracking-wider">{name}</span>
        <span className="text-sm font-bold text-accent">{level}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full bg-accent"
        />
      </div>
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6 lg:px-16 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8">Resume</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-10 border-l-4 border-accent pl-4 uppercase">Education</h3>
            <div className="space-y-12 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-100 ml-2">
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-accent rounded-full border-4 border-white ring-4 ring-accent/20" />
                  <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">
                    {item.institution}
                  </span>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-muted-text text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-10 border-l-4 border-accent pl-4 uppercase">My Skills</h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              {skillGroups.map((group, i) => (
                <div key={i} className="mb-8">
                  <h4 className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-6">
                    {group.category}
                  </h4>
                  {group.skills.map((skill, j) => (
                    <SkillBar key={j} name={skill.name} level={skill.level} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
