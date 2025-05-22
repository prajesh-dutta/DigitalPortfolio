import { motion } from 'framer-motion';
import ProjectCard from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ProjectsSection() {
  const projects = [
    {
      title: "Netclicks",
      description: "A full-stack streaming platform with Google and GitHub OAuth authentication, responsive video player, and containerized deployment.",
      technologies: "Next.js, React, TypeScript, Tailwind CSS, MongoDB",
      tags: ["Next.js", "TypeScript", "MongoDB", "Docker"],
      year: "2025",
      imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      githubUrl: "https://github.com/prajesh-dutta",
      liveUrl: "#"
    },
    {
      title: "VisageKey",
      description: "AI-powered facial authentication system with 99% recognition accuracy, real-time face detection and secure backend API.",
      technologies: "React.js, Node.js, Express.js, face-api.js",
      tags: ["React.js", "Node.js", "Express.js", "face-api.js"],
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
          <h2 className="text-4xl font-bold font-inter mb-4">My <span className="gradient-text">Projects</span></h2>
          <div className="w-20 h-1 bg-[hsl(var(--secondary))] mx-auto rounded-full"></div>
          <p className="text-foreground mt-6 max-w-2xl mx-auto">
            Exploring innovative solutions through code. Here are some of my recent projects.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
            <span>See More Projects</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
