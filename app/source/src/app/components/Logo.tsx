import React from 'react';
const logoImage = "/border-ai-logo.svg";


interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8" }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImage}
        alt="Border AI Logo"
        className="h-8 w-auto object-contain"
      />
    </div>
  );
}
