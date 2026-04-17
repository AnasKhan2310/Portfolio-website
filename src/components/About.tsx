import { motion } from 'motion/react';
import { Brain, Bot, BarChart3, MessageSquare, Zap } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const services = [
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'Building predictive models with Scikit-learn & Python for classification, regression, and clustering.',
  },
  {
    icon: Bot,
    title: 'Deep Learning',
    description: 'Developing neural networks, CNNs, and LSTMs with TensorFlow & Keras for complex pattern recognition.',
  },
  {
    icon: BarChart3,
    title: 'Data Analysis',
    description: 'Performing EDA, visualization, and extracting insights with Pandas, Matplotlib, and Seaborn.',
  },
  {
    icon: Zap,
    title: 'AI Automation & Chatbots',
    description: 'Automating workflows and designing intelligent conversational agents using NLP, LLMs, and frameworks like LangChain.',
  },
];

const stats = [
  { label: 'Projects Completed', value: 7, suffix: '+' },
  { label: 'Repos on GitHub', value: 6, suffix: '+' },
  { label: 'Years Learning', value: 2, suffix: '+' },
  { label: 'Dedication', value: 100, suffix: '%' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = value / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={countRef}>{count}{suffix}</span>;
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-16 bg-secondary-bg">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8">About Me</h2>
          <p className="text-muted-text text-lg max-w-3xl leading-relaxed">
            I'm Muhammad Anas Khan, an AI & Data Science Engineer passionate about turning data into actionable intelligence. 
            With a strong foundation in Computer Science from Federal Urdu University, I focus on the intersection of 
            mathematics, programming, and domain expertise to build models that learn and adapt.
          </p>
        </motion.div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-10 border-l-4 border-accent pl-4">What I Do?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                  <service.icon className="text-accent group-hover:text-white transition-colors duration-300" size={28} />
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className="text-muted-text text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark p-8 rounded-xl text-center"
            >
              <div className="text-accent text-4xl font-black mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
