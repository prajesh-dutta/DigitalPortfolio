import { motion } from 'framer-motion';
import ProgressBar from '@/components/progress-bar';
import SkillBadge from '@/components/skill-badge';
import { cn } from '@/lib/utils';

export default function SkillsSection() {
  const programmingSkills = [
    { skill: "Python, Java, JavaScript", percentage: 90 },
    { skill: "React, Node.js, Next.js", percentage: 85 },
    { skill: "HTML, CSS, Bootstrap, Tailwind", percentage: 95 },
    { skill: "MongoDB, SQLite, PostgreSQL", percentage: 80 },
    { skill: "C/C++, R, Shell Scripting", percentage: 75 }
  ];
  
  const devopsSkills = [
    { skill: "AWS, Azure, Google Cloud", percentage: 85 },
    { skill: "Docker, CI/CD", percentage: 80 },
    { skill: "Penetration Testing, Web Security", percentage: 85 },
    { skill: "Network Security, Wireshark", percentage: 75 },
    { skill: "Git, GitHub, Linux Administration", percentage: 90 }
  ];
  
  const skillBadges = [
    { icon: "fab fa-react text-blue-400", name: "React.js" },
    { icon: "fab fa-node-js text-green-500", name: "Node.js" },
    { icon: "fab fa-python text-yellow-500", name: "Python" },
    { icon: "fab fa-aws text-orange-400", name: "AWS" },
    { icon: "fab fa-docker text-blue-500", name: "Docker" },
    { icon: "fas fa-shield-alt text-red-400", name: "Security" }
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
          <h2 className="text-4xl font-bold font-inter mb-4">My <span className="gradient-text">Skills</span></h2>
          <div className="w-20 h-1 bg-[hsl(var(--secondary))] mx-auto rounded-full"></div>
          <p className="text-foreground mt-6 max-w-2xl mx-auto">
            I've developed a diverse technical skillset through academic studies, projects, and self-learning.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
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
          </motion.div>
          
          {/* DevOps & Cybersecurity Skills */}
          <motion.div 
            className="custom-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-inter flex items-center">
              <i className="fas fa-server text-[hsl(var(--secondary))] mr-3"></i>
              <span>DevOps & Cybersecurity</span>
            </h3>
            
            <div className="space-y-6">
              {devopsSkills.map((skill, index) => (
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
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
