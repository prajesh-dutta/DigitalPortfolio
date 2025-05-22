/**
 * Simple rule-based chatbot service that doesn't require external APIs
 */

// Knowledge base about Prajesh
const prajesInfo = {
  // Education information
  education: {
    college: "B.Tech in Computer Science and Engineering at Vellore Institute of Technology (2022-2026)",
    highSchool: "Passed Class 12 from West Bengal Council of Higher Secondary Education Board (School: Arambagh High School) in 2022 with 92.6%",
    secondary: "Passed Class 10 from West Bengal Board of Secondary Education (School: Arambagh High School) in 2020 with 87.3%",
    dropYear: "Did not take any drop year"
  },
  
  // Skills information
  skills: {
    programming: ["Python", "Java", "Shell Scripting", "C/C++", "JavaScript"],
    cybersecurity: ["Penetration Testing", "Web Security", "Network Security", "Wireshark", "Burp Suite", "Metasploit", "Nmap"],
    cloud: ["AWS", "Azure", "Google Cloud", "Oracle Cloud"],
    devops: ["Docker", "CI/CD", "Linux Administration"]
  },
  
  // Personal interests
  interests: {
    hobbies: ["Swimming", "Carrom"],
    music: {
      indian: ["Arijit Singh", "Shreya Ghoshal", "Mohammad Rafi", "Kishore Kumar", "Mukesh", "Atif Aslam", "Lata Mangeshkar", "Asha Bhosle", "Sandhya Mukherjee"],
      bengali: ["Anupam Roy", "Rupam Islam"],
      western: ["Linkin Park", "Ed Sheeran"]
    },
    movies: {
      bollywood: ["Shah Rukh Khan"],
      directors: ["Christopher Nolan", "Satyajit Ray"],
      bengali: ["Prosenjit Chatterjee"],
      other: ["Folk dances and songs of Bengal"]
    }
  },
  
  // Certifications
  certifications: ["AWS Certified Solutions Architect", "Azure Developer Associate", "MongoDB Certified Associate Developer", "Azure AI Fundamentals", "Oracle Cloud Infrastructure Foundations", "GitHub Foundations", "Network Defense Essentials", "Ethical Hacking Essentials"],
  
  // Activities
  activities: {
    volunteer: ["Senior Core Committee Member at IEEE Computer Society - VIT Student Chapter", "Junior Core Committee Member at VIT Blockchain Community"]
  },
  
  // Location
  location: {
    current: "Vellore (for studies)",
    hometown: "Kolkata, India"
  },
  
  // CodeChef
  codechef: "4-star rated (1870) with username: prajesh22"
};

// Define patterns for recognizing question intent
const patterns: { [key: string]: { pattern: RegExp, response: (matches: RegExpMatchArray | null) => string } } = {
  greeting: {
    pattern: /^(hi|hello|hey|greetings|howdy|what's up)/i,
    response: () => {
      return "Hello! I'm Prajesh's AI assistant. I can tell you about his education, skills, interests, or certifications. How can I help you learn more about Prajesh?";
    }
  },
  
  name: {
    pattern: /(who are you|your name|chatbot name)/i,
    response: () => {
      return "I'm a chatbot assistant for Prajesh Dutta's portfolio website. I can help answer questions about Prajesh, his skills, education, and interests.";
    }
  },
  
  education: {
    pattern: /(education|college|university|school|study|studying|studied|degree|class|12th|10th)/i,
    response: () => {
      return `Prajesh is currently pursuing ${prajesInfo.education.college}. He ${prajesInfo.education.highSchool} and ${prajesInfo.education.secondary}. ${prajesInfo.education.dropYear}.`;
    }
  },
  
  skills: {
    pattern: /(skills|good at|expertise|expert in|proficient|abilities|capable|talent)/i,
    response: () => {
      return `Prajesh has expertise in various technical areas, including:
1. Programming: ${prajesInfo.skills.programming.join(', ')}
2. Cybersecurity: ${prajesInfo.skills.cybersecurity.join(', ')}
3. Cloud Technologies: ${prajesInfo.skills.cloud.join(', ')}
4. DevOps: ${prajesInfo.skills.devops.join(', ')}

He's particularly passionate about cybersecurity and cloud technologies.`;
    }
  },
  
  programming: {
    pattern: /(programming|coding|development|developer|code|languages)/i,
    response: () => {
      return `Prajesh is proficient in several programming languages including ${prajesInfo.skills.programming.join(', ')}. He has used these skills in various projects and academic work.`;
    }
  },
  
  cybersecurity: {
    pattern: /(cybersecurity|security|hacking|penetration testing|ethical hacking|network security|web security)/i,
    response: () => {
      return `Prajesh is passionate about cybersecurity, with expertise in ${prajesInfo.skills.cybersecurity.join(', ')}. He has certifications like ${prajesInfo.certifications[6]} and ${prajesInfo.certifications[7]}.`;
    }
  },
  
  cloud: {
    pattern: /(cloud|aws|azure|google cloud|oracle)/i,
    response: () => {
      return `Prajesh has experience with cloud platforms including ${prajesInfo.skills.cloud.join(', ')}. He holds certifications like ${prajesInfo.certifications[0]}, ${prajesInfo.certifications[1]}, and ${prajesInfo.certifications[4]}.`;
    }
  },
  
  certifications: {
    pattern: /(certifications|certificates|certified|qualify|qualification)/i,
    response: () => {
      return `Prajesh holds several professional certifications including:\n${prajesInfo.certifications.map(cert => `- ${cert}`).join('\n')}`;
    }
  },
  
  hobbies: {
    pattern: /(hobbies|interests|like to do|free time|leisure|enjoy)/i,
    response: () => {
      return `Outside of technology, Prajesh enjoys ${prajesInfo.interests.hobbies.join(' and ')}. He's also passionate about music and movies.`;
    }
  },
  
  music: {
    pattern: /(music|songs|singers|artists|listen|band)/i,
    response: () => {
      return `Prajesh loves Indian classical music and enjoys listening to:
- Indian singers: ${prajesInfo.interests.music.indian.join(', ')}
- Bengali singers: ${prajesInfo.interests.music.bengali.join(', ')}
- Western artists: ${prajesInfo.interests.music.western.join(', ')}

He also enjoys Bengali folk songs.`;
    }
  },
  
  movies: {
    pattern: /(movies|film|actor|actress|cinema|director)/i,
    response: () => {
      return `Prajesh enjoys films by directors like ${prajesInfo.interests.movies.directors.join(' and ')}. He loves movies starring ${prajesInfo.interests.movies.bollywood[0]} in Bollywood and ${prajesInfo.interests.movies.bengali[0]} in Bengali cinema. He also appreciates ${prajesInfo.interests.movies.other[0]}.`;
    }
  },
  
  codechef: {
    pattern: /(codechef|competitive programming|programming contest|coding competition)/i,
    response: () => {
      return `Prajesh is ${prajesInfo.codechef}. He actively participates in competitive programming contests.`;
    }
  },
  
  location: {
    pattern: /(location|live|living|city|town|from|where|place)/i,
    response: () => {
      return `Prajesh is currently in ${prajesInfo.location.current}. His hometown is ${prajesInfo.location.hometown}.`;
    }
  },
  
  contact: {
    pattern: /(contact|email|reach|get in touch|connect)/i,
    response: () => {
      return "You can reach out to Prajesh through the contact form on this website. Just scroll down to the Contact section and fill out the form!";
    }
  },
  
  activities: {
    pattern: /(activities|volunteering|volunteer|committee|organization|club)/i,
    response: () => {
      return `Prajesh is involved in several activities including:\n${prajesInfo.activities.volunteer.join('\n')}`;
    }
  },
  
  fallback: {
    pattern: /.*/,
    response: () => {
      return "I'm not sure I understand that question. I can tell you about Prajesh's education, skills, certifications, interests, or how to contact him. What would you like to know?";
    }
  }
};

/**
 * Process a user message and return a response
 * @param message - The user's message
 * @returns A response from the chatbot
 */
export function processMessage(message: string): string {
  // Check if message contains non-Prajesh related questions or sensitive information requests
  const blockedTopics = /(password|private|credit card|address|phone number|identity|politics|religion|controversial|offensive|inappropriate|gossip|rumor)/i;
  
  if (blockedTopics.test(message)) {
    return "I'm Prajesh's portfolio assistant. I'm only able to answer questions about Prajesh's professional background, education, skills, and interests. Is there something specific about Prajesh you'd like to know?";
  }
  
  // Try to match the message to a pattern
  for (const key in patterns) {
    const { pattern, response } = patterns[key];
    const matches = message.match(pattern);
    
    if (matches && key !== 'fallback') {
      return response(matches);
    }
  }
  
  // Use fallback if no pattern matches
  return patterns.fallback.response(null);
}