import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';

// Message type for chat
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatbotButton() {
  const [showChat, setShowChat] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm ProBot - your intelligent assistant. Ask me anything about Prajesh, his skills, education, or interests!",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement>(null);
  
  // 3D motion values for chat button
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  // Handle 3D tilt effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!chatButtonRef.current) return;
    
    const rect = chatButtonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  }, [x, y]);
  
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  // Reset position when button is clicked
  const resetPosition = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  // Scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (showChat && chatInputRef.current) {
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 300);
    }
  }, [showChat]);
  
  // Fixed position for the chat button to make it stable
  useEffect(() => {
    if (chatButtonRef.current) {
      const button = chatButtonRef.current;
      button.style.position = 'fixed';
      button.style.bottom = '20px';
      button.style.right = '20px';
    }
  }, []);
  
  const handleToggleChat = () => {
    setShowChat(!showChat);
    if (showTooltip) setShowTooltip(false);
    resetPosition();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't submit empty messages
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // Call the chatbot API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Add assistant response to chat
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Add error message
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: "I'm sorry, I couldn't process your request. Please try again.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I'm sorry, there was an error connecting to the server. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {showTooltip && !showChat && (
          <motion.div
            className="fixed bottom-24 right-4 bg-[hsl(var(--background))] text-foreground p-3 rounded-lg shadow-lg max-w-[200px] z-[1001]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm font-medium">Chat with Prajesh's AI</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="fixed bottom-20 right-4 w-[90vw] max-w-[400px] h-[500px] bg-[hsl(var(--background))] rounded-xl border border-[hsl(var(--border))] shadow-2xl flex flex-col overflow-hidden z-[1000]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header with 3D gradient effect */}
            <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center mr-3 border-2 border-white/30 shadow-glow">
                  <i className="fas fa-robot text-white text-lg"></i>
                </div>
                <div>
                  <h3 className="text-white font-bold">ProBot</h3>
                  <p className="text-white/70 text-xs">AI-Powered Assistant</p>
                </div>
              </div>
              <button 
                onClick={handleToggleChat}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Chat messages with improved styling */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-[hsl(var(--muted))/10] to-[hsl(var(--muted))/20]">
              {messages.map((msg, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (index % 3) }} 
                  className={cn(
                    "mb-4 max-w-[85%] p-3 rounded-lg shadow-sm",
                    msg.role === 'user' 
                      ? "ml-auto bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))/90] text-white" 
                      : "bg-[hsl(var(--muted))] text-foreground border border-[hsl(var(--border))]"
                  )}
                >
                  <div className="flex items-start">
                    {msg.role === 'assistant' && (
                      <span className="mr-2 mt-0.5 text-xs">
                        <i className="fas fa-robot text-[hsl(var(--secondary))]"></i>
                      </span>
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{msg.content}</p>
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
              
              {/* Improved loading indicator */}
              {isLoading && (
                <div className="flex justify-center items-center mb-4">
                  <div className="chatbot-loading-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat input with enhanced styling */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
              <div className="flex">
                <Input
                  ref={chatInputRef}
                  type="text"
                  placeholder="Ask me about Prajesh..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-[hsl(var(--muted))] focus-visible:ring-[hsl(var(--primary))]"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="ml-2 bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--primary))] hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 3D Chat toggle button with perspective effect */}
      <motion.button
        ref={chatButtonRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="chatbot-button w-16 h-16 fixed bottom-6 right-6 z-[1000] bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--primary))] rounded-full flex items-center justify-center shadow-glow transition-all duration-300"
        onClick={handleToggleChat}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => !showChat && setShowTooltip(true)}
        animate={{
          boxShadow: showChat 
            ? '0 0 0 rgba(139, 92, 246, 0)' 
            : ['0 0 20px rgba(139, 92, 246, 0.7)', '0 0 40px rgba(139, 92, 246, 0.3)', '0 0 20px rgba(139, 92, 246, 0.7)']
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse'
          }
        }}
        aria-label="Chat with AI Assistant"
      >
        <div style={{ transform: 'translateZ(8px)' }} className="relative">
          <i className={`fas ${showChat ? 'fa-times' : 'fa-comment-dots'} text-white text-2xl`}></i>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full shadow-glow-sm"></span>
        </div>
      </motion.button>
    </div>
  );
}
