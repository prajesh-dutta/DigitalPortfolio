import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

interface ProgressBarProps {
  skill: string;
  percentage: number;
}

export default function ProgressBar({ skill, percentage }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);
  
  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{skill}</span>
        <span className="text-[hsl(var(--secondary))]">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
