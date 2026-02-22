import React from 'react';
const logoImage = "/app/border-ai-logo.svg";
const fallbackLogoImage = "/border-ai-logo.svg";


interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8" }: LogoProps) {
  return (
    <div className="flex items-center">
      <img
        src={logoImage}
        alt="Border AI Logo"
        className={`${className} w-auto object-contain`}
        onError={(event) => {
          const target = event.currentTarget;
          if (target.src.includes(fallbackLogoImage)) return;
          target.src = fallbackLogoImage;
        }}
      />
    </div>
  );
}
