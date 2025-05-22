import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CertificateCardProps {
  title: string;
  issuer: string;
  level: string;
  icon: string;
  iconColor: string;
  delay?: number;
}

export default function CertificateCard({ 
  title, 
  issuer, 
  level, 
  icon, 
  iconColor,
  delay = 0
}: CertificateCardProps) {
  return (
    <motion.div 
      className="custom-card p-6 rounded-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 flex items-center justify-center ${iconColor} rounded-full mr-4`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-sm text-foreground mb-3">{issuer}</p>
      <div className="flex justify-between items-center">
        <span className="text-[hsl(var(--secondary))] text-sm">{level}</span>
        <i className="fas fa-certificate text-yellow-400"></i>
      </div>
    </motion.div>
  );
}
