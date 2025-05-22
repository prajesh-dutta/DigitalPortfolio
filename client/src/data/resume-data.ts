export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  title: string;
  description: string;
  technologies: string;
  tags: string[];
  year: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  description: string;
  bullets?: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date?: string;
  level: string;
  icon: string;
  iconColor: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    availability: string;
    tagline: string;
  };
  programming: Skill[];
  devops: Skill[];
  projects: Project[];
  education: Education[];
  experience: Experience[];
  certificates: Certificate[];
  additional_certificates: string[];
  social: SocialLink[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "Prajesh Dutta",
    title: "Computer Science Student & Developer",
    email: "prajeshdutta2004@gmail.com",
    phone: "+918900018808",
    location: "Vellore, India",
    bio: "I'm a pre-final year Computer Science student at Vellore Institute of Technology, passionate about building innovative digital solutions. My journey in tech has equipped me with a diverse skill set spanning web development, cloud technologies, and cybersecurity.",
    availability: "Available for opportunities",
    tagline: "I'm a passionate tech enthusiast with expertise in web development, cybersecurity, and cloud technologies. Currently studying at VIT Vellore, I build innovative solutions to real-world problems."
  },
  programming: [
    { name: "Python, Java, JavaScript", level: 90 },
    { name: "React, Node.js, Next.js", level: 85 },
    { name: "HTML, CSS, Bootstrap, Tailwind", level: 95 },
    { name: "MongoDB, SQLite, PostgreSQL", level: 80 },
    { name: "C/C++, R, Shell Scripting", level: 75 }
  ],
  devops: [
    { name: "AWS, Azure, Google Cloud", level: 85 },
    { name: "Docker, CI/CD", level: 80 },
    { name: "Penetration Testing, Web Security", level: 85 },
    { name: "Network Security, Wireshark", level: 75 },
    { name: "Git, GitHub, Linux Administration", level: 90 }
  ],
  projects: [
    {
      title: "Netclicks",
      description: "A full-stack streaming platform with Google and GitHub OAuth authentication, responsive video player, and containerized deployment.",
      technologies: "Next.js, React, TypeScript, Tailwind CSS, MongoDB, NextAuth.js, Docker",
      tags: ["Next.js", "TypeScript", "MongoDB", "Docker"],
      year: "2025",
      imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      githubUrl: "https://github.com/prajesh-dutta",
      liveUrl: "#"
    },
    {
      title: "VisageKey",
      description: "AI-powered facial authentication system with 99% recognition accuracy, real-time face detection and secure backend API.",
      technologies: "React.js, Node.js, Express.js, face-api.js, Tailwind CSS, Vite",
      tags: ["React.js", "Node.js", "Express.js", "face-api.js"],
      year: "2024",
      imageUrl: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      githubUrl: "https://github.com/prajesh-dutta",
      liveUrl: "#"
    }
  ],
  education: [
    {
      degree: "B.Tech, Computer Science and Engineering",
      institution: "Vellore Institute of Technology",
      location: "Vellore, India",
      period: "2022 - 2026",
      description: "Pre-final year student pursuing B.Tech in Computer Science and Engineering, focusing on web development, cloud computing, and cybersecurity."
    }
  ],
  experience: [
    {
      role: "Senior Core Committee Member",
      organization: "IEEE Computer Society - VIT Student Chapter",
      period: "Apr 2023 - Present",
      description: "Coordinated sponsorships and managed event logistics. Conducted hackathons during Gravitas and Riviera.",
      bullets: [
        "Coordinated sponsorships and managed event logistics",
        "Conducted hackathons during Gravitas and Riviera"
      ]
    },
    {
      role: "Junior Core Committee Member",
      organization: "VIT Blockchain Community",
      period: "Apr 2023 - Apr 2024",
      description: "Assisted in growing a newly founded blockchain club. Conducted events on DeFi, Cryptocurrency, and Smart Contracts. Managed sponsorships and event logistics.",
      bullets: [
        "Assisted in growing a newly founded blockchain club",
        "Conducted events on DeFi, Cryptocurrency, and Smart Contracts",
        "Managed sponsorships and event logistics"
      ]
    }
  ],
  certificates: [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services Training and Certification",
      level: "Associate Level",
      icon: "fab fa-aws",
      iconColor: "bg-blue-500/20 text-blue-400"
    },
    {
      title: "Azure Developer Associate",
      issuer: "Microsoft",
      level: "Associate Level",
      icon: "fab fa-microsoft",
      iconColor: "bg-blue-600/20 text-blue-500"
    },
    {
      title: "MongoDB Certified Associate Developer",
      issuer: "MongoDB",
      level: "Associate Level",
      icon: "fas fa-database",
      iconColor: "bg-green-500/20 text-green-400"
    },
    {
      title: "Azure AI Fundamentals",
      issuer: "Microsoft",
      level: "Fundamental Level",
      icon: "fas fa-brain",
      iconColor: "bg-blue-600/20 text-blue-500"
    },
    {
      title: "GitHub Foundations",
      issuer: "GitHub",
      level: "Fundamental Level",
      icon: "fab fa-github",
      iconColor: "bg-purple-500/20 text-purple-400"
    },
    {
      title: "Network Defense Essentials",
      issuer: "EC-Council",
      level: "Essential Level",
      icon: "fas fa-shield-alt",
      iconColor: "bg-red-500/20 text-red-400"
    }
  ],
  additional_certificates: [
    "The Bits and Bytes of Computer Networking (Coursera- Google)",
    "NDG Linux Unhatched (Cisco Networking Academy)",
    "Ethical Hacking Essentials (EHE) (EC-Council)"
  ],
  social: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/prajesh-dutta/",
      icon: "fab fa-linkedin"
    },
    {
      platform: "GitHub",
      url: "https://github.com/prajesh-dutta",
      icon: "fab fa-github"
    },
    {
      platform: "Email",
      url: "mailto:prajeshdutta2004@gmail.com",
      icon: "fas fa-envelope"
    },
    {
      platform: "Phone",
      url: "tel:+918900018808",
      icon: "fas fa-phone"
    }
  ]
};
