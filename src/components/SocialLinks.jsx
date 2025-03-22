import React from 'react';
import { Twitter, Github, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';

const SocialLink = ({ href, icon: Icon, label, color, hoverColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={cn(
      "w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200",
      "text-white/80 hover:text-white", 
      hoverColor
    )}
  >
    <Icon className="h-5 w-5" />
    <span className="sr-only">{label}</span>
  </a>
);

const SocialLinks = ({ className, iconSize = "default" }) => {
  const socialLinks = [
    {
      label: "Twitter",
      href: "https://twitter.com/greedymap",
      icon: Twitter,
      hoverColor: "hover:bg-[#1DA1F2]"
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/greedymap",
      icon: Linkedin,
      hoverColor: "hover:bg-[#0A66C2]"
    },
    {
      label: "GitHub",
      href: "https://github.com/greedymap",
      icon: Github,
      hoverColor: "hover:bg-[#24292E]"
    },
    {
      label: "YouTube",
      href: "https://youtube.com/c/greedymaptech",
      icon: Youtube,
      hoverColor: "hover:bg-[#FF0000]"
    },
    {
      label: "Instagram",
      href: "https://instagram.com/greedymaptech",
      icon: Instagram,
      hoverColor: "hover:bg-[#E4405F]"
    },
    {
      label: "Facebook",
      href: "https://facebook.com/greedymap",
      icon: Facebook,
      hoverColor: "hover:bg-[#1877F2]"
    }
  ];

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {socialLinks.map((link) => (
        <SocialLink key={link.label} {...link} />
      ))}
    </div>
  );
};

export default SocialLinks;
