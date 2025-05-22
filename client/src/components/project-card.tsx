import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string;
  tags: string[];
  year: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  delay?: number;
}

export default function ProjectCard({ 
  title, 
  description, 
  technologies, 
  tags, 
  year, 
  imageUrl, 
  githubUrl, 
  liveUrl,
  delay = 0
}: ProjectCardProps) {
  return (
    <motion.div 
      className="project-card overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      whileHover={{ translateY: -10 }}
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={`${title} project thumbnail`} 
          className="w-full h-56 object-cover" 
        />
        <div className="absolute top-4 right-4 bg-[hsl(var(--secondary))] text-white py-1 px-3 rounded-full text-sm font-medium">
          {year}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 font-inter">{title}</h3>
        <p className="text-[hsl(var(--secondary))] mb-3 flex items-center text-sm">
          <i className="fas fa-code mr-2"></i>{technologies}
        </p>
        <p className="text-foreground mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-[hsl(var(--muted))] px-3 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[hsl(var(--secondary))] hover:text-white transition-colors"
              aria-label={`GitHub repository for ${title}`}
            >
              <i className="fab fa-github text-xl"></i>
            </a>
          )}
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[hsl(var(--secondary))] hover:text-white transition-colors"
              aria-label={`Live demo for ${title}`}
            >
              <i className="fas fa-external-link-alt text-xl"></i>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
