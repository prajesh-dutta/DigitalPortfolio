import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn, scrollToId } from '@/lib/utils';

export default function AboutSection() {
  const handleScrollToContact = () => {
    scrollToId('contact');
  };
  
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-inter mb-4">About <span className="gradient-text">Me</span></h2>
          <div className="w-20 h-1 bg-[hsl(var(--secondary))] mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-primary/10 border border-[hsl(var(--border))] h-full">
              <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=500" alt="Cybersecurity workspace" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-inter">Cybersecurity <span className="text-[hsl(var(--secondary))]">Enthusiast & Problem Solver</span></h3>
            <p className="text-foreground mb-6">
              I'm a pre-final year Computer Science student at Vellore Institute of Technology, passionate about cybersecurity, cloud technologies, and DevOps. With multiple certifications in AWS, Azure, and MongoDB, I thrive on solving real-world security challenges and building robust digital solutions.
            </p>
            <p className="text-foreground mb-6">
              My technical arsenal includes expertise in penetration testing, network security, and cloud infrastructure. I approach each security challenge with a methodical mindset, identifying vulnerabilities and implementing effective safeguards to protect digital assets.
            </p>
            <p className="text-foreground mb-8">
              Beyond technology, I'm an avid swimmer and enjoy playing carrom. I'm actively involved in IEEE Computer Society and the VIT Blockchain Community, where I help organize technical events and mentor fellow students.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="custom-card p-4 rounded-lg">
                <p className="text-[hsl(var(--secondary))] font-semibold mb-1">Name:</p>
                <p className="text-foreground">Prajesh Dutta</p>
              </div>
              <div className="custom-card p-4 rounded-lg">
                <p className="text-[hsl(var(--secondary))] font-semibold mb-1">Email:</p>
                <p className="text-foreground">prajeshdutta2004@gmail.com</p>
              </div>
              <div className="custom-card p-4 rounded-lg">
                <p className="text-[hsl(var(--secondary))] font-semibold mb-1">Location:</p>
                <p className="text-foreground">Kolkata, India</p>
              </div>
              <div className="custom-card p-4 rounded-lg">
                <p className="text-[hsl(var(--secondary))] font-semibold mb-1">Status:</p>
                <p className="text-[hsl(var(--accent))]">Available for opportunities</p>
              </div>
            </div>
            
            <Button 
              onClick={handleScrollToContact}
              className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 inline-flex items-center"
            >
              <span>Get In Touch</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
