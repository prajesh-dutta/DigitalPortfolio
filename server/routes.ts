import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { sendEmail } from "./email-service";

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    // Debug: log EmailJS env vars
    console.log('EmailJS ENV in route:', {
      SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
      TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
      USER_ID: process.env.EMAILJS_USER_ID
    });
    console.log('Received contact form submission:', req.body);
    
    try {
      // Validate the request body
      const validatedData = contactSchema.parse(req.body);
      
      // Create email notification content
      const emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `;
      
      // Plain text version
      const emailText = `
        New Contact Form Submission
        --------------------------
        Name: ${validatedData.name}
        Email: ${validatedData.email}
        Subject: ${validatedData.subject}
        Message: ${validatedData.message}
      `;
      
      // Send email notification using EmailJS
      console.log('Sending contact form email notification...');
      const emailSent = await sendEmail({
        to: "prajeshdutta2004@gmail.com", // Your notification email
        from: "Portfolio Contact Form <no-reply@prajeshdutta.com>", 
        subject: `[Portfolio Contact] ${validatedData.subject}`,
        text: emailText,
        html: emailHtml
      });
      
      console.log('Email sending result:', emailSent ? 'Success' : 'Failed');
      
      // Return response based on email sending status
      if (emailSent) {
        // Return success
        res.status(200).json({ 
          success: true, 
          message: "Thank you for your message. I'll get back to you soon!" 
        });
      } else {
        // Handle email sending failure
        console.error('Email sending failed!');
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    }
  });
  
  // Chatbot API endpoint using Perplexity
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid request. Please provide a message." 
        });
      }
      
      // Import the Perplexity-powered chatbot service
      const { getChatbotResponse } = await import('./chatbot-service');
      
      // Get response from the Perplexity AI chatbot
      const response = await getChatbotResponse(message);
      
      res.status(200).json({
        success: true,
        response
      });
    } catch (error) {
      console.error("Chatbot error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process your message. Please try again."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
