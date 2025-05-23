import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { sendContactEmail } from '@/services/emailService';

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
      // Send the contact form data to our server API
      const response = await sendContactEmail(data);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response;
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
      console.error('Contact form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send your message. Please try again later.';
      
      toast({
        title: "Error sending message",
        description: errorMessage,
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
          <h2 className="text-4xl font-bold font-inter mb-4">Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Touch</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-foreground/80 mt-6 max-w-2xl mx-auto text-sm">
            Let's connect! Feel free to reach out for opportunities, collaborations, or just to say hello.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mx-auto max-w-6xl">
          {/* Contact Info - Now on the left */}
          <motion.div
            className="lg:w-2/5 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-serif bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-[hsl(var(--secondary))] rounded-full mr-3 flex-shrink-0 shadow-sm">
                  <i className="fas fa-envelope text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1 text-[hsl(var(--secondary))]">Email</h4>
                  <p className="text-foreground/80 text-sm font-light">prajeshdutta2004@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-[hsl(var(--secondary))] rounded-full mr-3 flex-shrink-0 shadow-sm">
                  <i className="fas fa-map-marker-alt text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1 text-[hsl(var(--secondary))]">Location</h4>
                  <p className="text-foreground/80 text-sm font-light">Kolkata, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-[hsl(var(--secondary))] rounded-full mr-3 flex-shrink-0 shadow-sm">
                  <i className="fab fa-linkedin text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1 text-[hsl(var(--secondary))]">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/prajesh-dutta/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/80 text-sm font-light hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    linkedin.com/in/prajesh-dutta
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-[hsl(var(--secondary))] rounded-full mr-3 flex-shrink-0 shadow-sm">
                  <i className="fab fa-github text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1 text-[hsl(var(--secondary))]">GitHub</h4>
                  <a 
                    href="https://github.com/prajesh-dutta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/80 text-sm font-light hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    github.com/prajesh-dutta
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-[hsl(var(--secondary))] rounded-full mr-3 flex-shrink-0 shadow-sm">
                  <i className="fas fa-code text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1 text-[hsl(var(--secondary))]">CodeChef</h4>
                  <a 
                    href="https://www.codechef.com/users/prajesh22" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/80 text-sm font-light hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    codechef.com/users/prajesh22
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form - Now on the right */}
          <motion.div 
            className="custom-card p-8 rounded-xl max-w-md mx-auto lg:ml-auto lg:mr-0 w-full lg:w-3/5 order-1 lg:order-2 shadow-lg border border-[hsl(var(--border))/30] bg-gradient-to-br from-background to-[hsl(var(--muted))/50]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-serif bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label htmlFor="name" className="block text-foreground/90 mb-2 font-medium text-sm">Name</label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--secondary))] focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-5">
                <label htmlFor="email" className="block text-foreground/90 mb-2 font-medium text-sm">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--secondary))] focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-5">
                <label htmlFor="subject" className="block text-foreground/90 mb-2 font-medium text-sm">Subject</label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--secondary))] focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-foreground/90 mb-2 font-medium text-sm">Message</label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Your message"
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--secondary))] focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center justify-center"
              >
                <span>{isPending ? "Sending..." : "Send Message"}</span>
                <i className="fas fa-paper-plane ml-2"></i>
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
