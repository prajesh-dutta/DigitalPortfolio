import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  icon: string;
  name: string;
  delay?: number;
}

export default function SkillBadge({ icon, name, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div 
      className="custom-card flex flex-col items-center p-4 rounded-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <i className={`${icon} text-4xl mb-3`} aria-hidden="true"></i>
      <span className="text-center">{name}</span>
    </motion.div>
  );
}
