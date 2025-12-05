import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from "@/lib/utils"; // Assuming you have this utility

const Footer = ({ className, ...props }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-background/80 backdrop-blur-lg border-t border-border mt-16 py-6 px-6",
        className
      )}
      {...props}
    >
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        
        {/* Copyright and Name */}
        <p className="order-2 md:order-1 mt-4 md:mt-0">
          &copy; {currentYear} Fortune Malaza. All Rights Reserved.
        </p>

        {/* Social Links */}
        <div className="order-1 md:order-2 flex space-x-6">
          <a 
            href="mailto:fmalaza512@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Email Fortune Malaza"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/FortuneMal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mphikeleli-malaza-5b386a253"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;