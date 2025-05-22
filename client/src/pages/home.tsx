import { useEffect } from 'react';
import Navbar from '@/components/navbar';
import ThreeBackground from '@/components/three-background';
import HeroSection from '@/sections/hero-section';
import AboutSection from '@/sections/about-section';
import SkillsSection from '@/sections/skills-section';
import ProjectsSection from '@/sections/projects-section';
import EducationSection from '@/sections/education-section';
import CertificatesSection from '@/sections/certificates-section';
import ContactSection from '@/sections/contact-section';
import Footer from '@/components/footer';
import ChatbotButton from '@/components/chatbot-button';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Update page title and meta tags
  useEffect(() => {
    document.title = "Prajesh Dutta | Portfolio";
    
    // Set current year in the footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear().toString();
    }
  }, []);
  
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[100]"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      <ThreeBackground />
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      
      <Footer />
      <ChatbotButton />
    </>
  );
}
