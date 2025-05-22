import { motion } from 'framer-motion';
import TimelineItem from '@/components/timeline-item';
import { cn } from '@/lib/utils';

export default function EducationSection() {
  const education = [
    {
      title: "B.Tech, Computer Science and Engineering",
      organization: "Vellore Institute of Technology, Vellore",
      period: "2022 - 2026",
      description: "Pre-final year student pursuing B.Tech in Computer Science and Engineering, focusing on web development, cloud computing, and cybersecurity."
    }
  ];
  
  const experience = [
    {
      title: "IEEE Computer Society - VIT Student Chapter",
      organization: "Senior Core Committee Member",
      period: "Apr 2023 - Present",
      description: "Coordinated sponsorships and managed event logistics. Conducted hackathons during Gravitas and Riviera."
    },
    {
      title: "VIT Blockchain Community",
      organization: "Junior Core Committee Member",
      period: "Apr 2023 - Apr 2024",
      description: "Assisted in growing a newly founded blockchain club. Conducted events on DeFi, Cryptocurrency, and Smart Contracts. Managed sponsorships and event logistics."
    }
  ];
  
  return (
    <section id="education" className="py-20 px-6 bg-gradient-to-b from-[hsl(var(--muted))] to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-inter mb-4">Education & <span className="gradient-text">Experience</span></h2>
          <div className="w-20 h-1 bg-[hsl(var(--secondary))] mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-8 font-inter flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <i className="fas fa-graduation-cap text-[hsl(var(--secondary))] mr-3"></i>
              <span>Education</span>
            </motion.h3>
            
            <div className="relative pl-8 space-y-8">
              <div className="timeline-line"></div>
              
              {education.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  organization={item.organization}
                  period={item.period}
                  description={item.description}
                  delay={index}
                />
              ))}
            </div>
          </div>
          
          {/* Experience Timeline */}
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-8 font-inter flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <i className="fas fa-briefcase text-[hsl(var(--secondary))] mr-3"></i>
              <span>Volunteering Experience</span>
            </motion.h3>
            
            <div className="relative pl-8 space-y-8">
              <div className="timeline-line"></div>
              
              {experience.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  organization={item.organization}
                  period={item.period}
                  description={item.description}
                  delay={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
