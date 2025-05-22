import { useEffect } from 'react';
import { useTheme } from './theme-provider';

export default function CursorEffects() {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Only add cursor effects on non-touch devices
    const isTouchDevice = () => {
      return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    };
    
    if (isTouchDevice()) {
      return;
    }
    
    // Create cursor elements
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    cursorDot.classList.add('cursor-dot');
    cursorOutline.classList.add('cursor-outline');
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    // Set initial positions outside viewport
    cursorDot.style.left = '-100px';
    cursorDot.style.top = '-100px';
    cursorOutline.style.left = '-100px';
    cursorOutline.style.top = '-100px';
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      // Use requestAnimationFrame for smoother animation
      window.requestAnimationFrame(() => {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
      });
    });
    
    // Cursor effects for interactions
    document.addEventListener('mousedown', () => {
      cursorOutline.style.width = '25px';
      cursorOutline.style.height = '25px';
    });
    
    document.addEventListener('mouseup', () => {
      cursorOutline.style.width = '30px';
      cursorOutline.style.height = '30px';
    });
    
    // Add hover effect for interactive elements
    const handleInteractiveEnter = () => {
      cursorOutline.style.width = '50px';
      cursorOutline.style.height = '50px';
      cursorOutline.style.opacity = '0.5';
    };
    
    const handleInteractiveLeave = () => {
      cursorOutline.style.width = '30px';
      cursorOutline.style.height = '30px';
      cursorOutline.style.opacity = '1';
    };
    
    // Add effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleInteractiveEnter);
      el.addEventListener('mouseleave', handleInteractiveLeave);
    });
    
    // Cleanup
    return () => {
      document.body.removeChild(cursorDot);
      document.body.removeChild(cursorOutline);
      
      document.removeEventListener('mousedown', () => {});
      document.removeEventListener('mouseup', () => {});
      document.removeEventListener('mousemove', () => {});
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractiveEnter);
        el.removeEventListener('mouseleave', handleInteractiveLeave);
      });
    };
  }, [theme]);
  
  return null;
}
