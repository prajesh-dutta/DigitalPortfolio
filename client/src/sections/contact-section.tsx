import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default"
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: ContactFormValues) => {
    mutate(data);
  };
  
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-inter mb-4">Get In <span className="gradient-text">Touch</span></h2>
          <div className="w-20 h-1 bg-[hsl(var(--secondary))] mx-auto rounded-full"></div>
          <p className="text-foreground mt-6 max-w-2xl mx-auto">
            Let's connect! Feel free to reach out for opportunities, collaborations, or just to say hello.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="custom-card p-8 rounded-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-inter">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-foreground mb-2 font-medium">Name</label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-gray-700 focus:border-[hsl(var(--secondary))] focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-foreground mb-2 font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-gray-700 focus:border-[hsl(var(--secondary))] focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-foreground mb-2 font-medium">Subject</label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-gray-700 focus:border-[hsl(var(--secondary))] focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-foreground mb-2 font-medium">Message</label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Your message"
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-gray-700 focus:border-[hsl(var(--secondary))] focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-accent/20 flex items-center justify-center"
              >
                <span>{isPending ? "Sending..." : "Send Message"}</span>
                <i className="fas fa-paper-plane ml-2"></i>
              </Button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-inter">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 text-[hsl(var(--secondary))] rounded-full mr-4 flex-shrink-0">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-foreground">prajeshdutta2004@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 text-[hsl(var(--secondary))] rounded-full mr-4 flex-shrink-0">
                  <i className="fas fa-code text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">CodeChef</h4>
                  <a 
                    href="https://www.codechef.com/users/prajesh22" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--secondary))] hover:text-white transition-colors"
                  >
                    codechef.com/users/prajesh22
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 text-[hsl(var(--secondary))] rounded-full mr-4 flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Location</h4>
                  <p className="text-foreground">Kolkata, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 text-[hsl(var(--secondary))] rounded-full mr-4 flex-shrink-0">
                  <i className="fab fa-linkedin text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/prajesh-dutta/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--secondary))] hover:text-white transition-colors"
                  >
                    linkedin.com/in/prajesh-dutta
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 text-[hsl(var(--secondary))] rounded-full mr-4 flex-shrink-0">
                  <i className="fab fa-github text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">GitHub</h4>
                  <a 
                    href="https://github.com/prajesh-dutta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--secondary))] hover:text-white transition-colors"
                  >
                    github.com/prajesh-dutta
                  </a>
                </div>
              </div>
            </div>
            
            {/* Future Chatbot Placeholder */}
            <div className="mt-10 p-6 border border-dashed border-secondary/50 rounded-xl bg-secondary/5">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary/20 text-[hsl(var(--secondary))] rounded-full mr-3">
                  <i className="fas fa-robot"></i>
                </div>
                <h4 className="font-bold">AI Chatbot Coming Soon</h4>
              </div>
              <p className="text-sm text-foreground">
                An AI-powered chatbot will be available here soon to answer questions about my skills, projects, and experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
