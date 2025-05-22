import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn, scrollToId } from '@/lib/utils';

export default function HeroSection() {
  const handleScrollToContact = () => {
    scrollToId('contact');
  };
  
  const handleScrollToProjects = () => {
    scrollToId('projects');
  };
  
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="order-2 lg:order-1"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[hsl(var(--secondary))] mb-4 font-medium font-fira">Hey there, I'm</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-inter">
            <span className="gradient-text">Prajesh</span> Dutta
          </h1>
          <div className="h-12 overflow-hidden">
            <p className="text-xl md:text-2xl font-medium mb-8 typewriter">
              <span className="text-white">Computer Science Student &</span>
              <span className="text-[hsl(var(--secondary))]"> Developer</span>
            </p>
          </div>
          <p className="text-foreground text-lg mb-8 max-w-xl">
            I'm a passionate tech enthusiast with expertise in web development, cybersecurity, and cloud technologies. Currently studying at VIT Vellore, I build innovative solutions to real-world problems.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleScrollToContact}
              className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-accent/20 flex items-center"
            >
              <span>Contact Me</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
            <Button 
              onClick={handleScrollToProjects}
              variant="outline"
              className="border border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-secondary/10 font-semibold py-3 px-8 rounded-full transition-all duration-300 flex items-center"
            >
              <span>See My Work</span>
              <i className="fas fa-laptop-code ml-2"></i>
            </Button>
          </div>
          <div className="flex mt-8 gap-5">
            <a 
              href="https://www.linkedin.com/in/prajesh-dutta/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[hsl(var(--secondary))] transition-colors duration-300"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a 
              href="https://github.com/prajesh-dutta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[hsl(var(--secondary))] transition-colors duration-300"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a 
              href="mailto:prajeshdutta2004@gmail.com" 
              className="text-white hover:text-[hsl(var(--secondary))] transition-colors duration-300"
            >
              <i className="fas fa-envelope text-2xl"></i>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center order-1 lg:order-2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative animate-float">
            {/* Main profile image with stylized border */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[hsl(var(--secondary))] p-1 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] shadow-xl shadow-accent/20 glow-on-hover">
              <img src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" alt="Prajesh Dutta" className="w-full h-full object-cover rounded-full" />
            </div>
            
            {/* Floating tech elements around profile */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center text-[hsl(var(--secondary))] animate-pulse-slow shadow-lg">
              <i className="fab fa-react text-xl"></i>
            </div>
            <div className="absolute -bottom-2 -right-6 w-14 h-14 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center text-[hsl(var(--accent))] animate-pulse-slow shadow-lg">
              <i className="fab fa-python text-2xl"></i>
            </div>
            <div className="absolute -bottom-8 left-8 w-16 h-16 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center text-blue-400 animate-pulse-slow shadow-lg">
              <i className="fas fa-cloud text-2xl"></i>
            </div>
            <div className="absolute top-10 -left-8 w-14 h-14 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center text-red-400 animate-pulse-slow shadow-lg">
              <i className="fab fa-js text-xl"></i>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
