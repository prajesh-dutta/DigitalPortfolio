import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-4 px-6 bg-gradient-to-t from-[hsl(var(--muted))] to-background border-t border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-foreground/70 text-xs">
          &copy; {currentYear} Prajesh Dutta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
