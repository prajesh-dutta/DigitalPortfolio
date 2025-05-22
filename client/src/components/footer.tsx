import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-[hsl(var(--muted))] border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold font-inter text-white flex items-center justify-center md:justify-start group">
              <span className="text-[hsl(var(--secondary))] mr-2">&lt;</span>
              <span className="group-hover:gradient-text transition-all duration-300">Prajesh</span>
              <span className="text-[hsl(var(--secondary))] ml-2">/&gt;</span>
            </a>
            <p className="text-foreground mt-2">Building digital experiences with code</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://www.linkedin.com/in/prajesh-dutta/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-[hsl(var(--secondary))] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a 
              href="https://github.com/prajesh-dutta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-[hsl(var(--secondary))] transition-colors duration-300"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a 
              href="mailto:prajeshdutta2004@gmail.com" 
              className="text-foreground hover:text-[hsl(var(--secondary))] transition-colors duration-300"
              aria-label="Email"
            >
              <i className="fas fa-envelope text-2xl"></i>
            </a>
            <a 
              href="tel:+918900018808" 
              className="text-foreground hover:text-[hsl(var(--secondary))] transition-colors duration-300"
              aria-label="Phone"
            >
              <i className="fas fa-phone text-2xl"></i>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-foreground text-sm">
            &copy; <span id="current-year">2023</span> Prajesh Dutta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
