import fetch from 'node-fetch';

// Define the type for the chatbot response
interface ChatbotResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: Array<{
    index: number;
    finish_reason: string;
    message: {
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
 * Get a response from the AI chatbot using Perplexity API
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

    // Create the prompt for the chatbot
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content: `You are Prajesh's AI assistant on his portfolio website. Your role is to answer questions about Prajesh Dutta based on the following information. DO NOT make up information that is not included in this data.

${personalInfo}

Important guidelines:
1. Only answer questions about Prajesh and the information provided above.
2. If asked questions outside of this scope, politely decline and redirect to topics about Prajesh.
3. Keep answers concise (50-100 words).
4. Be conversational and friendly.
5. If you don't have enough information to answer a question, say "I don't have that specific information about Prajesh."
6. If someone asks for contact details, direct them to use the contact form on the website.
7. Do not provide any personal identification information beyond what's in the info above.
8. Avoid political topics or controversial statements.`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.2,
        max_tokens: 250,
        top_p: 0.9,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1
      })
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(errorText);
      return 'Sorry, I encountered an error while processing your question. Please try again later.';
    }

    const data = await response.json() as ChatbotResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in chatbot service:', error);
    return 'Sorry, I encountered an error while processing your question. Please try again later.';
  }
}