import { MailService } from '@sendgrid/mail';

// Initialize the SendGrid mail service
const mailService = new MailService();

// Set API key if available
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send an email using SendGrid
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    // Check if API key is set
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not found');
      return false;
    }

    // Send email
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}