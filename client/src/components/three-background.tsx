import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/components/theme-provider';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup with sophisticated, subtle theme
    const scene = new THREE.Scene();
    
    // Camera setup with responsive aspect ratio
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Initialize renderer with improved settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    containerRef.current?.appendChild(renderer.domElement);
    
    // Create a constellation of stars (elegant particle effect)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = window.innerWidth < 768 ? 800 : 1500;
    
    // Create positions for constellation points
    const posArray = new Float32Array(starsCount * 3);
    const scaleArray = new Float32Array(starsCount);
    
    // Create a more organized, elegant distribution
    for (let i = 0; i < starsCount; i++) {
      // Use golden ratio distribution for more natural look
      const theta = i * Math.PI * (3 - Math.sqrt(5)); // Golden angle
      const y = 1 - (i / (starsCount - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // Distribute on a sphere
      
      // Distribute points on a sphere for elegant feel
      posArray[i * 3] = Math.cos(theta) * radius * 7; // X position 
      posArray[i * 3 + 1] = y * 7; // Y position
      posArray[i * 3 + 2] = Math.sin(theta) * radius * 7; // Z position
      
      // Vary the size of each star
      scaleArray[i] = Math.random() * 1.5 + 0.5;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starsGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create gentle connections between nearby particles
    const connectionsGeometry = new THREE.BufferGeometry();
    const connectionsCount = starsCount * 2;
    const connectionsVertices = [];
    const connectionsColors = [];
    
    // Find nearby points to create connections
    for (let i = 0; i < starsCount; i++) {
      const x1 = posArray[i * 3];
      const y1 = posArray[i * 3 + 1];
      const z1 = posArray[i * 3 + 2];
      
      // For each point, connect to the 2 nearest neighbors
      for (let j = i + 1; j < starsCount; j++) {
        const x2 = posArray[j * 3];
        const y2 = posArray[j * 3 + 1];
        const z2 = posArray[j * 3 + 2];
        
        // Calculate distance
        const dist = Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2);
        
        // Only connect if distance is within threshold
        if (dist < 2) {
          connectionsVertices.push(x1, y1, z1);
          connectionsVertices.push(x2, y2, z2);
          
          // Create gradient color for sophisticated look
          const alpha = 1.0 - (dist / 2);
          const color = new THREE.Color();
          // Subtle purplish blue gradient
          color.setHSL(0.7, 0.8, 0.6);
          
          connectionsColors.push(color.r, color.g, color.b, 0.5);
          connectionsColors.push(color.r, color.g, color.b, 0.5);
        }
      }
    }
    
    // Create star particles with custom shader material
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Create line material for connections
    const connectionsMaterial = new THREE.LineBasicMaterial({
      color: 0x8884ff,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    
    // Create star field and connections
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
    
    // Add connections if there are some (at least 2 vertices)
    if (connectionsVertices.length > 0) {
      const connectionsPositions = new Float32Array(connectionsVertices);
      connectionsGeometry.setAttribute('position', new THREE.BufferAttribute(connectionsPositions, 3));
      const connections = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
      scene.add(connections);
    }
    
    // Add subtle fog for depth
    scene.fog = new THREE.FogExp2(0x000a15, 0.05);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Track mouse position for subtle parallax effect
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.0005;
      mouseY = (event.clientY - windowHalfY) * 0.0005;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation function with sophisticated movement
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Very subtle rotation
      starField.rotation.x += 0.0002;
      starField.rotation.y += 0.0001;
      
      // Gentle parallax effect with mouse
      const targetX = mouseX * 0.5;
      const targetY = mouseY * 0.5;
      
      // Smooth transitions
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Pulsing effect for stars
      const time = Date.now() * 0.001;
      const scales = starsGeometry.attributes.scale.array as Float32Array;
      
      for (let i = 0; i < starsCount; i++) {
        // Create subtle pulsing at different rates
        const pulseFactor = Math.sin(time + i * 0.1) * 0.1 + 0.9;
        starsMaterial.size = 0.05 * pulseFactor;
      }
      
      starsGeometry.attributes.scale.needsUpdate = true;
      
      // Render the scene
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      starsGeometry.dispose();
      starsMaterial.dispose();
      if (connectionsVertices.length > 0) {
        connectionsGeometry.dispose();
        connectionsMaterial.dispose();
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full z-[-1]"
      style={{ pointerEvents: 'none' }}
    />
  );
}
