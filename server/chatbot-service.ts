import fetch from 'node-fetch';

// Define the type for the chatbot response
interface ChatbotResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  citations?: Array<string>; // Citations from Perplexity
  choices: Array<{
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta?: {
      role: string;
      content: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Personal information for the chatbot to know about
const personalInfo = `
About Prajesh Dutta:
- Prajesh is a pre-final year Computer Science student at Vellore Institute of Technology
- He is passionate about cybersecurity, cloud technologies, and DevOps
- He has multiple certifications including AWS, Azure, MongoDB, Oracle Cloud, and EC-Council
- He is a 4-star rated coder on CodeChef (rating: 1870, username: prajesh22)

Education:
- B.Tech in Computer Science and Engineering at Vellore Institute of Technology (2022-2026)
- Passed Class 12 from West Bengal Council of Higher Secondary Education Board (School: Arambagh High School) in 2022 with 92.6%
- Passed Class 10 from West Bengal Board of Secondary Education (School: Arambagh High School) in 2020 with 87.3%
- Did not take any drop year

Technical Skills:
- Programming: Python, Java, Shell Scripting, C/C++, JavaScript
- Cybersecurity: Penetration Testing, Web Security, Network Security
- Cloud: AWS, Azure, Google Cloud, Oracle Cloud
- DevOps: Docker, CI/CD, Linux Administration
- Tools: Wireshark, Burp Suite, Metasploit, Nmap

Location:
- Currently based in Vellore for studies
- Hometown is Kolkata, India

Volunteering:
- Senior Core Committee Member at IEEE Computer Society - VIT Student Chapter
- Junior Core Committee Member at VIT Blockchain Community

Personal Interests:
- Swimming and playing carrom
- Loves Indian classical music
- Favorite singers: Arijit Singh, Shreya Ghoshal, Mohammad Rafi, Kishore Kumar, Mukesh, Atif Aslam, Lata Mangeshkar, Asha Bhosle, Sandhya Mukherjee
- Bengali singers: Anupam Roy, Rupam Islam
- Foreign bands: Linkin Park, Ed Sheeran
- Favorite actors: Shah Rukh Khan (Bollywood), Christopher Nolan (director), Satyajit Ray (director), Prosenjit Chatterjee (Bengali)
- Enjoys folk dances and songs of Bengal
`;

/**
 * Get a response from the AI chatbot using Perplexity API with enhanced capabilities
 * @param userMessage - The message from the user
 * @returns The chatbot's response
 */
export async function getChatbotResponse(userMessage: string): Promise<string> {
  try {
    // Ensure API key is available
    if (!process.env.PERPLEXITY_API_KEY) {
      console.error('Perplexity API key not found in environment variables');
      return 'Sorry, the chatbot is currently unavailable. Please try again later.';
    }

    console.log('Using Perplexity API Key:', process.env.PERPLEXITY_API_KEY.substring(0, 10) + '...');
    
    // Create the prompt for the chatbot with improved system message
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online", // Using high-quality model
        messages: [
          {
            role: "system",
            content: `You are ProBot, a concise AI assistant on Prajesh's portfolio website. 
            
You have access to the following information about Prajesh Dutta:

${personalInfo}

Your main objectives are to:
1. Provide brief, focused answers (30-50 words maximum).
2. For questions about Prajesh, use ONLY the information provided above, no need to make up details.
3. Keep answers direct and to the point without unnecessary elaboration.
4. Be friendly but extremely concise.
5. If someone asks for contact details, direct them to use the contact form on the website.
6. For technical questions, provide concise, accurate insights.
7. Never refuse to answer a reasonable question.
8. If you don't know something about Prajesh, acknowledge that limitation briefly.
9. Don't include citations or references in your responses.
10. Never use phrases like "I'm happy to help" or "Let me know if you need anything else" to keep responses brief.`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.5, // Lower temperature for more focused and predictable responses
        max_tokens: 100, // Reduced token limit to enforce brevity
        top_p: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(errorText);
      return 'Sorry, I encountered an error while processing your question. Please try again later.';
    }

    const data = await response.json() as ChatbotResponse;
    
    // Log successful API response for debugging
    console.log(`Successful Perplexity API response with ${data.usage.completion_tokens} tokens used`);
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in chatbot service:', error);
    return 'Sorry, I encountered an error while processing your question. Please try again later.';
  }
}