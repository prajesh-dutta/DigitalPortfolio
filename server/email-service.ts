import { Resend } from 'resend';

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}


export async function sendEmail(params: EmailParams): Promise<boolean> {
  // Check for Resend API Key
  const resendApiKey = process.env.RESEND_API_KEY;
  
  // Log configuration status
  console.log('Email Service Configuration:');
  console.log('- Resend API Key:', resendApiKey ? 'Available' : 'Missing');
  
  if (!resendApiKey) {
    console.warn('⚠️ Resend API key is missing. Check your .env file!');
    
    // Log the email content that would have been sent
    console.log('===== EMAIL NOT SENT (CONFIGURATION ISSUE) =====');
    console.log(`To: ${params.to}`);
    console.log(`From: ${params.from}`);
    console.log(`Subject: ${params.subject}`);
    console.log(`Text: ${params.text || ''}`);
    console.log(`HTML: ${params.html || ''}`);
    console.log('=============================================');
    
    return false;
  }
  
  // Initialize Resend client
  const resend = new Resend(resendApiKey);
  
  // Always use the default Resend sender for free tier
  const fromEmail = 'onboarding@resend.dev';
  
  try {
    console.log('Sending email with Resend:', {
      to: params.to,
      from: fromEmail,
      subject: params.subject,
      replyTo: params.from
    });
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: params.to,
      subject: params.subject,
      text: params.text || undefined,
      html: params.html || undefined,
      replyTo: params.from // user's email as reply-to
    });
    
    if (error) {
      console.error('❌ Resend error:', error);
      return false;
    }
    
    console.log('✅ Email sent successfully via Resend! ID:', data?.id);
    return true;
  } catch (error: any) {
    console.error('❌ Resend error while sending email:', error);
    
    // Attempt to log detailed error information
    if (error.response) {
      console.error('Resend error details:', error.response);
    }
    
    return false;
  }
}