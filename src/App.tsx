/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AiChatbot from './components/AiChatbot';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow w-full overflow-x-hidden">
        <Hero />
        <About />
        <Resume />
        <Projects />
        <Contact />
        <Footer />
      </main>

      <AiChatbot />
    </div>
  );
}
