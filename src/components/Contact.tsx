import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Mail, Phone, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'Karachi, Pakistan', href: '#' },
  { icon: Mail, label: 'Email', value: 'anaskhanz1980@gmail.com', href: 'mailto:anaskhanz1980@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+92 311 2813828', href: 'tel:+923112813828' },
  { icon: Github, label: 'GitHub', value: 'github.com/AnasKhan2310', href: 'https://github.com/AnasKhan2310' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/anas-khan1290', href: 'https://linkedin.com/in/anas-khan1290' },
];

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-16 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8">Contact</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-10 border-l-4 border-accent pl-4 uppercase">Get In Touch</h3>
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={i}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center p-6 bg-secondary-bg rounded-xl border-l-4 border-accent hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-6 group-hover:bg-accent transition-colors duration-300">
                    <info.icon className="text-accent group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1">{info.label}</p>
                    <p className="text-sm font-bold text-near-black">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            <p className="text-accent text-xl font-bold italic">
              "Let's build something intelligent together."
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary-bg p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:border-accent outline-none transition-colors placeholder:text-gray-400 font-medium"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:border-accent outline-none transition-colors placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Subject"
                  className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:border-accent outline-none transition-colors placeholder:text-gray-400 font-medium"
                />
              </div>
              <div className="relative">
                <textarea
                  required
                  rows={4}
                  placeholder="Your Message"
                  className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:border-accent outline-none transition-colors placeholder:text-gray-400 font-medium resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="inline-flex items-center space-x-3 px-10 py-4 bg-dark hover:bg-near-black text-accent font-black uppercase tracking-widest rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none"
              >
                {formState === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Success Overlay */}
            <AnimatePresence>
              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-accent flex flex-col items-center justify-center text-white z-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                  >
                    <CheckCircle2 size={80} />
                  </motion.div>
                  <h4 className="text-2xl font-black mt-6 uppercase tracking-widest">Message Sent!</h4>
                  <p className="mt-2 font-medium">I'll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
