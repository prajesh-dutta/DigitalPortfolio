import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn, scrollToId } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroSection() {
  const avatarRef = useRef<HTMLDivElement>(null);
  
  const handleScrollToContact = () => {
    scrollToId('contact');
  };
  
  const handleScrollToProjects = () => {
    scrollToId('projects');
  };
  
  // 3D Avatar Setup
  useEffect(() => {
    if (!avatarRef.current) return;
    
    // Clear previous contents
    while (avatarRef.current.firstChild) {
      avatarRef.current.removeChild(avatarRef.current.firstChild);
    }
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // Square aspect ratio for the avatar container
      0.1,
      1000
    );
    camera.position.z = 2;
    
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(280, 280); // Match container dimensions
    renderer.setClearColor(0x000000, 0);
    avatarRef.current.appendChild(renderer.domElement);
    
    // Create avatar - a cybersecurity-themed avatar with glowing edges
    const geometry = new THREE.IcosahedronGeometry(0.8, 1);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0x0EEC88, // Cyber green
      linewidth: 2,
      transparent: true,
      opacity: 0.8
    });
    
    const lines = new THREE.LineSegments(wireframe, material);
    scene.add(lines);
    
    // Add inner glow sphere
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0EB6EC, // Cyber blue
      transparent: true,
      opacity: 0.2
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Add data particles inside the avatar
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create particles within the sphere
      const radius = 0.6 * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xEC0E92, // Cyber pink
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      lines.rotation.x += 0.005;
      lines.rotation.y += 0.01;
      
      particles.rotation.x -= 0.003;
      particles.rotation.y -= 0.007;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      const size = Math.min(avatarRef.current?.clientWidth || 280, 280);
      renderer.setSize(size, size);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      wireframe.dispose();
      material.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="order-2 lg:order-1"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[hsl(var(--secondary))] mb-4 font-medium font-fira">Hey there, I'm</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-inter">
            <span className="gradient-text">Prajesh</span> Dutta
          </h1>
          <div className="h-12 overflow-hidden">
            <p className="text-xl md:text-2xl font-medium mb-8 typewriter">
              <span className="text-white">Cybersecurity & Cloud</span>
              <span className="text-[hsl(var(--secondary))]"> Enthusiast</span>
            </p>
          </div>
          <p className="text-foreground text-lg mb-8 max-w-xl">
            🔒 Passionate about cybersecurity, cloud, and DevOps, I thrive on solving real-world tech challenges and building secure digital solutions. 3x Certified with expertise in penetration testing and security infrastructure.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleScrollToContact}
              className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 flex items-center"
            >
              <span>Contact Me</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
            <Button 
              onClick={handleScrollToProjects}
              variant="outline"
              className="border border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-secondary/10 font-semibold py-3 px-8 rounded-full transition-all duration-300 flex items-center"
            >
              <span>See My Work</span>
              <i className="fas fa-shield-alt ml-2"></i>
            </Button>
          </div>
          <div className="flex mt-8 gap-5">
            <a 
              href="https://www.linkedin.com/in/prajesh-dutta/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[hsl(var(--secondary))] transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a 
              href="https://github.com/prajesh-dutta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[hsl(var(--secondary))] transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a 
              href="https://www.codechef.com/users/prajesh22" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[hsl(var(--secondary))] transition-colors duration-300"
              aria-label="CodeChef Profile"
            >
              <i className="fas fa-code text-2xl"></i>
            </a>
            <a 
              href="mailto:prajeshdutta2004@gmail.com" 
              className="text-white hover:text-[hsl(var(--secondary))] transition-colors duration-300"
              aria-label="Email"
            >
              <i className="fas fa-envelope text-2xl"></i>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center order-1 lg:order-2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative animate-float">
            {/* 3D Avatar container */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-[hsl(var(--secondary))] p-1 bg-background shadow-xl shadow-primary/20 glow-on-hover flex items-center justify-center overflow-hidden">
              <div ref={avatarRef} className="w-full h-full"></div>
            </div>
            
            {/* Floating cybersecurity elements around avatar */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center text-[hsl(var(--secondary))] animate-pulse-slow shadow-lg">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            <div className="absolute -bottom-2 -right-6 w-14 h-14 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center text-[hsl(var(--primary))] animate-pulse-slow shadow-lg">
              <i className="fas fa-server text-2xl"></i>
            </div>
            <div className="absolute -bottom-8 left-8 w-16 h-16 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center text-[hsl(var(--accent))] animate-pulse-slow shadow-lg">
              <i className="fas fa-cloud text-2xl"></i>
            </div>
            <div className="absolute top-10 -left-8 w-14 h-14 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center text-yellow-400 animate-pulse-slow shadow-lg">
              <i className="fas fa-lock text-xl"></i>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
