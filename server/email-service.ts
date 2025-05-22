import fetch from 'node-fetch';

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send an email using EmailJS (free tier)
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    // Using EmailJS for free email notifications
    // This would normally come from environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID || '';
    const templateId = process.env.EMAILJS_TEMPLATE_ID || '';
    const userId = process.env.EMAILJS_USER_ID || '';
    
    if (!serviceId || !templateId || !userId) {
      console.warn('Email service configuration incomplete. Email notifications disabled.');
      
      // For development, log the email content
      console.log('===== WOULD SEND EMAIL =====');
      console.log(`To: ${params.to}`);
      console.log(`From: ${params.from}`);
      console.log(`Subject: ${params.subject}`);
      console.log(`Text: ${params.text}`);
      console.log('============================');
      
      // Return true in development to simulate success
      return true;
    }
    
    // EmailJS template parameters
    const templateParams = {
      to_email: params.to,
      from_name: params.from,
      subject: params.subject,
      message: params.text || params.html,
      to_name: 'Prajesh'
    };
    
    // Send email using EmailJS API
    const response = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: userId,
        template_params: templateParams
      })
    });
    
    if (response.status === 200) {
      return true;
    } else {
      console.error('Error sending email through EmailJS:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}