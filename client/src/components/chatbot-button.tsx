import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ChatbotButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleClick = () => {
    // This is a placeholder for the future chatbot functionality
    alert("AI Chatbot feature coming soon!");
  };
  
  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="bg-[hsl(var(--background))] text-foreground p-3 rounded-lg shadow-lg mb-3 max-w-[200px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm">AI Chatbot coming soon!</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className="w-14 h-14 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] rounded-full flex items-center justify-center shadow-lg shadow-secondary/20 transition-all duration-300"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with AI Assistant (Coming Soon)"
      >
        <i className="fas fa-comment-dots text-white text-2xl"></i>
      </motion.button>
    </div>
  );
}
