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
      iconColor: "bg-blue-500/20 text-blue-400",
      url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
    },
    {
      title: "Azure Developer Associate",
      issuer: "Microsoft",
      level: "Associate Level",
      icon: "fab fa-microsoft",
      iconColor: "bg-blue-600/20 text-blue-500",
      url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/"
    },
    {
      title: "MongoDB Certified Associate Developer",
      issuer: "MongoDB",
      level: "Associate Level",
      icon: "fas fa-database",
      iconColor: "bg-green-500/20 text-green-400",
      url: "https://university.mongodb.com/certification"
    },
    {
      title: "Azure AI Fundamentals",
      issuer: "Microsoft",
      level: "Fundamental Level",
      icon: "fas fa-brain",
      iconColor: "bg-blue-600/20 text-blue-500",
      url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/"
    },
    {
      title: "Oracle Cloud Infrastructure Foundations",
      issuer: "Oracle",
      level: "Fundamental Level",
      icon: "fas fa-cloud",
      iconColor: "bg-red-500/20 text-red-400",
      url: "https://education.oracle.com/oracle-cloud-infrastructure-foundations-associate/pexam_1Z0-1085-22"
    },
    {
      title: "GitHub Foundations",
      issuer: "GitHub",
      level: "Fundamental Level",
      icon: "fab fa-github",
      iconColor: "bg-purple-500/20 text-purple-400",
      url: "https://resources.github.com/learn/certifications/"
    },
    {
      title: "Network Defense Essentials",
      issuer: "EC-Council",
      level: "Essential Level",
      icon: "fas fa-shield-alt",
      iconColor: "bg-red-500/20 text-red-400",
      url: "https://www.eccouncil.org/train-certify/network-defense-essentials-nde/"
    },
    {
      title: "Ethical Hacking Essentials",
      issuer: "EC-Council",
      level: "Essential Level",
      icon: "fas fa-user-secret",
      iconColor: "bg-yellow-500/20 text-yellow-400",
      url: "https://www.eccouncil.org/train-certify/ethical-hacking-essentials-ehe/"
    }
  ];
  
  const additionalCertificates = [
    {
      name: "The Bits and Bytes of Computer Networking",
      url: "https://www.coursera.org/learn/computer-networking"
    },
    {
      name: "NDG Linux Unhatched",
      url: "https://www.netacad.com/courses/os-it/ndg-linux-unhatched"
    }
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
          <h2 className="text-4xl font-bold font-inter mb-4">My <span className="gradient-text">Certifications</span></h2>
          <div className="w-20 h-1 bg-[hsl(var(--secondary))] mx-auto rounded-full"></div>
          <p className="text-foreground mt-6 max-w-2xl mx-auto">
            Professional certifications that validate my expertise in cybersecurity, cloud technologies, and development.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <a 
              key={index}
              href={cert.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-transform hover:-translate-y-2 duration-300"
            >
              <CertificateCard
                title={cert.title}
                issuer={cert.issuer}
                level={cert.level}
                icon={cert.icon}
                iconColor={cert.iconColor}
                delay={index}
              />
            </a>
          ))}
        </div>
        
        <motion.div 
          className="mt-10 p-6 bg-[hsl(var(--muted))] rounded-xl border border-[hsl(var(--border))]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4 text-center">Additional Educational Achievements</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalCertificates.map((cert, index) => (
              <a 
                key={index}
                href={cert.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full hover:bg-secondary/10 transition-colors"
              >
                <i className="fas fa-certificate text-[hsl(var(--secondary))]"></i>
                <span>{cert.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
