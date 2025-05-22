import emailjs from 'emailjs-com';

// Free email service using EmailJS
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    // EmailJS requires setting up a free account and creating a template
    // For this example, we'll use default service and template IDs which need to be configured
    // You'll need to sign up at emailjs.com and replace these with your own
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Prajesh',
      reply_to: formData.email,
    };

    // You need to replace these with your actual EmailJS service ID, template ID, and user ID
    // These can be found in your EmailJS dashboard after signing up
    const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
    const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
    const userId = 'YOUR_USER_ID'; // Replace with your EmailJS user ID
    
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      userId
    );
    
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email. Please try again later.' };
  }
};