import { motion } from 'framer-motion';
import ProjectCard from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ProjectsSection() {
  const projects = [
    {
      title: "SecureNet",
      description: "A comprehensive network security solution with intrusion detection system, firewall configuration, and vulnerability scanning capabilities.",
      technologies: "Python, Wireshark API, ReactJS, Flask, Docker",
      tags: ["Cybersecurity", "Python", "Docker", "Network Security"],
      year: "2025",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      githubUrl: "https://github.com/prajesh-dutta",
      liveUrl: "#"
    },
    {
      title: "CloudGuard",
      description: "A cloud security platform that monitors AWS and Azure resources, detects misconfigurations, and provides automated remediation suggestions.",
      technologies: "AWS SDK, Azure SDK, Terraform, ReactJS, Node.js",
      tags: ["Cloud Security", "AWS", "Azure", "DevOps"],
      year: "2024",
      imageUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      githubUrl: "https://github.com/prajesh-dutta",
      liveUrl: "#"
    },
    {
      title: "VisageKey",
      description: "AI-powered facial authentication system with 99% recognition accuracy, real-time face detection and secure backend API.",
      technologies: "React.js, Node.js, Express.js, face-api.js",
      tags: ["AI Security", "React.js", "Node.js", "Authentication"],
      year: "2024",
      imageUrl: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      githubUrl: "https://github.com/prajesh-dutta",
      liveUrl: "#"
    }
  ];
  
  return (
    <section id="projects" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-inter mb-4">Security <span className="gradient-text">Projects</span></h2>
          <div className="w-20 h-1 bg-[hsl(var(--secondary))] mx-auto rounded-full"></div>
          <p className="text-foreground mt-6 max-w-2xl mx-auto">
            Building robust security solutions to protect digital assets and address real-world cybersecurity challenges.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              tags={project.tags}
              year={project.year}
              imageUrl={project.imageUrl}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              delay={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a 
            href="https://github.com/prajesh-dutta" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-secondary/10 font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center"
          >
            <span>Explore More Projects</span>
            <i className="fas fa-shield-alt ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
