import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
      content: "Hi! I'm Prajesh's AI assistant. Ask me anything about him, his skills, education, or interests!",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  
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
  
  const handleToggleChat = () => {
    setShowChat(!showChat);
    if (showTooltip) setShowTooltip(false);
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
            className="bg-[hsl(var(--background))] text-foreground p-3 rounded-lg shadow-lg mb-3 max-w-[200px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm">Chat with me!</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="fixed bottom-20 right-4 w-[90vw] max-w-[400px] h-[500px] bg-[hsl(var(--background))] rounded-xl border border-[hsl(var(--border))] shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="bg-[hsl(var(--primary))] p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center mr-3">
                  <i className="fas fa-robot text-white"></i>
                </div>
                <h3 className="text-white font-bold">Prajesh's AI Assistant</h3>
              </div>
              <button 
                onClick={handleToggleChat}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-[hsl(var(--muted))/30]">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "mb-4 max-w-[85%] p-3 rounded-lg",
                    msg.role === 'user' 
                      ? "ml-auto bg-[hsl(var(--primary))] text-white" 
                      : "bg-[hsl(var(--muted))] text-foreground"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-center items-center mb-4">
                  <div className="dot-flashing"></div>
                </div>
              )}
            </div>
            
            {/* Chat input */}
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
                  className="ml-2 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))]"
                  disabled={isLoading}
                >
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat toggle button */}
      <motion.button
        className="w-14 h-14 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] rounded-full flex items-center justify-center shadow-lg shadow-secondary/20 transition-all duration-300"
        onClick={handleToggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => !showChat && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with AI Assistant"
      >
        <i className={`fas ${showChat ? 'fa-times' : 'fa-comment-dots'} text-white text-2xl`}></i>
      </motion.button>
    </div>
  );
}
