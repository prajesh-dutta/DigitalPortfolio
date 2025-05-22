import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  title: string;
  organization: string;
  period: string;
  description: string;
  delay?: number;
}

export default function TimelineItem({ 
  title, 
  organization, 
  period, 
  description,
  delay = 0
}: TimelineItemProps) {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="timeline-dot"></div>
      <div className="custom-card p-6 rounded-lg ml-4">
        <div className="flex justify-between items-start mb-2 flex-wrap">
          <h4 className="text-xl font-bold">{title}</h4>
          <span className="text-[hsl(var(--secondary))] text-sm bg-secondary/10 px-3 py-1 rounded-full mt-1 sm:mt-0">
            {period}
          </span>
        </div>
        <p className="text-[hsl(var(--secondary))] mb-2">{organization}</p>
        <p className="text-foreground text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
