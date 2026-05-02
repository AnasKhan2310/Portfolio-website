import { Github, Linkedin, Instagram } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/AnasKhan2310' },
  { icon: Linkedin, href: 'https://linkedin.com/in/anas-khan1290' },
  { icon: Instagram, href: 'https://instagram.com/anas_khan_2310' },
];

export default function Footer() {
  return (
    <footer className="bg-dark py-12 px-6 lg:px-16 text-center">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-8 mb-8">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-accent transition-colors duration-300"
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>
        <p className="text-white/30 text-xs font-medium uppercase tracking-[0.2em]">
          © 2025 Anas Khan — AI & Data Science Engineer. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
