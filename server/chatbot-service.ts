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
            content: `You are ProBot, an intelligent AI assistant on Prajesh's portfolio website. 
            
You have access to the following information about Prajesh Dutta:

${personalInfo}

Your main objectives are to:
1. Answer ANY type of question in a helpful, accurate, and sophisticated manner.
2. For questions about Prajesh, use ONLY the information provided above, no need to make up details.
3. For questions outside of Prajesh's information, provide generally helpful responses based on your broader knowledge.
4. Keep answers natural, informative and conversational (100-200 words).
5. Be witty, personable, and engaging - show some personality!
6. If someone asks for contact details, direct them to use the contact form on the website.
7. For technical questions, provide thoughtful insights based on current industry standards.
8. Never refuse to answer a reasonable question - always try to be helpful.
9. If you genuinely don't know something about Prajesh, acknowledge that limitation but still try to provide a helpful response.`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7, // Higher temperature for more creative responses
        max_tokens: 400, // Allow for longer responses
        top_p: 0.9,
        stream: false,
        presence_penalty: 0.6, // Increased to reduce repetition
        frequency_penalty: 0.8, // Increased to encourage more diverse vocabulary
        search_domain_filter: ["perplexity.ai"], // Add relevant domains if needed
        search_recency_filter: "month" // Get recent information
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