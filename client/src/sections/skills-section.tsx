import { motion } from 'framer-motion';
import ProgressBar from '@/components/progress-bar';
import SkillBadge from '@/components/skill-badge';
import { cn } from '@/lib/utils';

export default function SkillsSection() {
  const programmingSkills = [
    { skill: "Python, Java, Shell Scripting", percentage: 90 },
    { skill: "React, Node.js, Next.js", percentage: 75 },
    { skill: "HTML, CSS, Bootstrap, Tailwind", percentage: 85 },
    { skill: "MongoDB, SQLite, PostgreSQL", percentage: 80 },
    { skill: "C/C++, R", percentage: 70 }
  ];
  
  const cybersecuritySkills = [
    { skill: "AWS, Azure, Google Cloud", percentage: 85 },
    { skill: "Docker, CI/CD, DevOps", percentage: 80 },
    { skill: "Penetration Testing, Web Security", percentage: 90 },
    { skill: "Network Security, Wireshark, Burp Suite", percentage: 88 },
    { skill: "Metasploit, Nmap, Linux Administration", percentage: 92 }
  ];
  
  const skillBadges = [
    { icon: "fas fa-shield-alt text-[hsl(var(--primary))]", name: "Cybersecurity" },
    { icon: "fas fa-cloud text-blue-400", name: "Cloud" },
    { icon: "fab fa-python text-yellow-500", name: "Python" },
    { icon: "fab fa-aws text-orange-400", name: "AWS" },
    { icon: "fab fa-docker text-blue-500", name: "Docker" },
    { icon: "fas fa-network-wired text-[hsl(var(--secondary))]", name: "Networking" }
  ];
  
  return (
    <section id="skills" className="py-20 px-6 bg-[hsl(var(--muted))]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-inter mb-4">Technical <span className="gradient-text">Arsenal</span></h2>
          <div className="w-20 h-1 bg-[hsl(var(--secondary))] mx-auto rounded-full"></div>
          <p className="text-foreground mt-6 max-w-2xl mx-auto">
            I've developed specialized skills in cybersecurity and cloud technologies, backed by certifications and hands-on experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Programming Skills */}
          <motion.div 
            className="custom-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-inter flex items-center">
              <i className="fas fa-code text-[hsl(var(--secondary))] mr-3"></i>
              <span>Programming & Development</span>
            </h3>
            
            <div className="space-y-6">
              {programmingSkills.map((skill, index) => (
                <ProgressBar 
                  key={index} 
                  skill={skill.skill} 
                  percentage={skill.percentage} 
                />
              ))}
            </div>
            <div className="mt-8 bg-[hsl(var(--background))] p-4 rounded-lg border border-[hsl(var(--border))]">
              <div className="flex items-center">
                <i className="fas fa-trophy text-yellow-400 mr-2"></i>
                <p className="text-foreground">
                  <span className="font-bold">CodeChef:</span> 4-star rated (1870) - <a href="https://www.codechef.com/users/prajesh22" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors">prajesh22</a>
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Cybersecurity Skills */}
          <motion.div 
            className="custom-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-inter flex items-center">
              <i className="fas fa-shield-alt text-[hsl(var(--secondary))] mr-3"></i>
              <span>Cybersecurity & Cloud</span>
            </h3>
            
            <div className="space-y-6">
              {cybersecuritySkills.map((skill, index) => (
                <ProgressBar 
                  key={index} 
                  skill={skill.skill} 
                  percentage={skill.percentage} 
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Skill Badges */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skillBadges.map((badge, index) => (
            <SkillBadge
              key={index}
              icon={badge.icon}
              name={badge.name}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
