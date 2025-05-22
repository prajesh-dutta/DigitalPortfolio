import { motion } from 'framer-motion';
import CertificateCard from '@/components/certificate-card';
import { cn } from '@/lib/utils';

export default function CertificatesSection() {
  const certificates = [
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
  ];
  
  const additionalCertificates = [
    "The Bits and Bytes of Computer Networking",
    "NDG Linux Unhatched",
    "Ethical Hacking Essentials"
  ];
  
  return (
    <section id="certificates" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-inter mb-4">My <span className="gradient-text">Certificates</span></h2>
          <div className="w-20 h-1 bg-[hsl(var(--secondary))] mx-auto rounded-full"></div>
          <p className="text-foreground mt-6 max-w-2xl mx-auto">
            Professional certifications that validate my expertise and knowledge.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={index}
              title={cert.title}
              issuer={cert.issuer}
              level={cert.level}
              icon={cert.icon}
              iconColor={cert.iconColor}
              delay={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-foreground">
            Additional certificates include: {additionalCertificates.join(', ')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
