import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, scrollToId } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Projects', path: '#projects' },
    { name: 'Education', path: '#education' },
    { name: 'Contact', path: '#contact' }
  ];
  
  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('#')) {
      scrollToId(path.substring(1));
    }
  };
  
  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-background bg-opacity-80 backdrop-blur-md py-4 px-6 transition-all duration-300",
        scrolled ? "py-2 shadow-lg" : "py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold font-inter text-white flex items-center group">
          <span className="text-[hsl(var(--secondary))] mr-2">&lt;</span>
          <span className="group-hover:gradient-text transition-all duration-300">Prajesh</span>
          <span className="text-[hsl(var(--secondary))] ml-2">/&gt;</span>
        </a>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.path);
              }}
              className="text-foreground hover:text-[hsl(var(--secondary))] transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-[hsl(var(--muted))] absolute top-full left-0 w-full p-4 space-y-4 shadow-lg z-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.path);
                }}
                className="block text-foreground hover:text-[hsl(var(--secondary))] py-2 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
