import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup with responsive aspect ratio
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    containerRef.current?.appendChild(renderer.domElement);
    
    // Create a grid of particles (cyber grid effect)
    const gridGeometry = new THREE.BufferGeometry();
    const gridCount = window.innerWidth < 768 ? 1500 : 3000;
    
    // Create positions for grid particles
    const posArray = new Float32Array(gridCount * 3);
    
    for (let i = 0; i < gridCount; i++) {
      // X position (random)
      posArray[i * 3] = (Math.random() - 0.5) * 10;
      // Y position (random)
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
      // Z position (random)
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    gridGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Digital rain (Matrix-like effect) - vertical particles
    const digitalRainGeometry = new THREE.BufferGeometry();
    const rainCount = window.innerWidth < 768 ? 200 : 400;
    const rainPosArray = new Float32Array(rainCount * 3);
    
    for (let i = 0; i < rainCount; i++) {
      // X position (spread horizontally)
      rainPosArray[i * 3] = (Math.random() - 0.5) * 15;
      // Y position (start from top)
      rainPosArray[i * 3 + 1] = (Math.random() * 10) + 5;
      // Z position (scattered)
      rainPosArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    digitalRainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPosArray, 3));
    
    // Create materials with custom colors for cybersecurity theme
    const gridMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x0EB6EC, // Cyber blue
      transparent: true,
      opacity: 0.6
    });
    
    const rainMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x0EEC88, // Matrix green
      transparent: true,
      opacity: 0.8
    });
    
    // Create meshes and add to scene
    const gridMesh = new THREE.Points(gridGeometry, gridMaterial);
    const rainMesh = new THREE.Points(digitalRainGeometry, rainMaterial);
    scene.add(gridMesh);
    scene.add(rainMesh);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Track mouse position for interactivity
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Regular rotation
      gridMesh.rotation.x += 0.0002;
      gridMesh.rotation.y += 0.0003;
      
      // Mouse-based rotation
      gridMesh.rotation.x += mouseY * 0.0002;
      gridMesh.rotation.y += mouseX * 0.0002;
      
      // Digital rain animation (matrix effect)
      const rainPositions = digitalRainGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < rainCount; i++) {
        // Move rain particles down
        rainPositions[i * 3 + 1] -= 0.03 + Math.random() * 0.02;
        
        // Reset particles that have fallen below view
        if (rainPositions[i * 3 + 1] < -5) {
          rainPositions[i * 3 + 1] = 5;
          rainPositions[i * 3] = (Math.random() - 0.5) * 15;
        }
      }
      digitalRainGeometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      gridGeometry.dispose();
      gridMaterial.dispose();
      digitalRainGeometry.dispose();
      rainMaterial.dispose();
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
