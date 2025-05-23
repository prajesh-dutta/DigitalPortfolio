// Send contact form data to the server API
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    console.log('Sending contact form data to server API:', formData);
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Failed to parse response JSON:', e);
      return { 
        success: false, 
        message: 'Failed to send email. Server returned an invalid response.' 
      };
    }
    
    if (response.ok) {
      console.log('Server API response (success):', data);
      return { success: true, message: data.message || 'Email sent successfully!' };
    } else {
      console.error('Server API response (error):', data);
      return { 
        success: false, 
        message: data.message || 'Failed to send email. Please try again later.' 
      };
    }
  } catch (error) {
    console.error('Error sending contact form data to server API:', error);
    return { success: false, message: 'Failed to send email. Please try again later.' };
  }
};