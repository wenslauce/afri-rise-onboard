
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="https://afri-rise.com/content/uploads/2023/07/Afri-Rise-Equity-Limited-1.png" 
        alt="Afri-Rise Logo" 
        className={className}
      />
    </Link>
  );
};
