import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import { Button } from "@/components/ui/button";
import {
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  MessageSquare,
  Mail,
  Globe,
  ArrowRight,
  Heart,
  Users,
  MessageCircle,
  Share2,
  Calendar,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const animationStyles = {
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
};

const Community = () => {
  const [activeTab, setActiveTab] = useState("social");
  const [animationComplete, setAnimationComplete] = useState({});

  // Updated social profiles with more professional structure and information
  const socialProfiles = [
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      handle: "GreedyMap Technologies",
      url: "https://linkedin.com/company/greedymap",
      color: "bg-[#0A66C2]",
      description: "Professional updates and career opportunities",
      stats: { followers: "14.6K", posts: "Weekly" },
      cta: "Connect",
    },
    {
      id: "github",
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      handle: "greedymap",
      url: "https://github.com/greedymap",
      color: "bg-[#24292E]",
      description: "Open-source repositories and code contributions",
      stats: { stars: "12.8K", repos: "68" },
      cta: "Follow",
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      handle: "@greedymap",
      url: "https://twitter.com/greedymap",
      color: "bg-[#1DA1F2]",
      description: "Latest news and tech discussions",
      stats: { followers: "22.3K", tweets: "Daily" },
      cta: "Follow",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      handle: "GreedyMap Tech",
      url: "https://youtube.com/c/greedymaptech",
      color: "bg-[#FF0000]",
      description: "Tutorials, webinars, and tech talks",
      stats: { subscribers: "39.5K", videos: "126" },
      cta: "Subscribe",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      handle: "@greedymaptech",
      url: "https://instagram.com/greedymaptech",
      color: "bg-[#E4405F]",
      description: "Company culture and behind-the-scenes",
      stats: { followers: "18.4K", posts: "245" },
      cta: "Follow",
    },
    {
      id: "discord",
      name: "Discord",
      icon: <MessageSquare className="h-5 w-5" />,
      handle: "GreedyMap Community",
      url: "https://discord.gg/greedymap",
      color: "bg-[#5865F2]",
      description: "Developer community and support",
      stats: { members: "25.6K", channels: "24" },
      cta: "Join",
    },
  ];

  const handleIconClick = (id) => {
    setAnimationComplete((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAnimationComplete((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <Layout>
      {/* Keep the hero section with the gradient background */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
        <div className="container ``px-4 py-16 md:py-24 relative overflow-hidden">
          {/* Subtle background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-tl from-indigo-500 to-transparent rounded-full filter blur-3xl"></div>
            <div className="absolute top-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-transparent rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
                Connect with our{" "}
                <span className="text-indigo-400">Professional Community</span>
              </h1>
              <p className="text-xl mb-8 text-slate-300 leading-relaxed">
                Join our network of developers, stay informed about the latest
                updates, and access exclusive resources across all our official
                platforms.
              </p>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-4  w-16 h-16 bg-blue-500 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-4 - w-16 h-16 bg-indigo-500 rounded-full opacity-30 animate-pulse delay-300"></div>
                <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700 shadow-xl">
                  <div className="grid grid-cols-2 gap-3">
                    {socialProfiles.slice(0, 4).map((profile) => (
                      <div key={profile.id} className="flex items-center p-2">
                        <div
                          className={`${profile.color} rounded-full p-2 mr-3`}
                        >
                          {profile.icon}
                        </div>
                        <div className="text-xs font-medium">
                          {profile.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified social handles section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Official Social Channels
            </h2>
            <p className="text-slate-600">
              Connect with GreedyMap across all our professional platforms
            </p>
            <Separator className="my-4" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-8">
              {socialProfiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  variants={itemVariants}
                  className="border-b border-slate-100 pb-8 last:border-b-0"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 md: justify-between">
                    <div className="flex items-center">
                      <div
                        className={`${profile.color} rounded-full p-4 mr-4 shadow-lg relative group`}
                      >
                        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        {React.cloneElement(profile.icon, {
                          className: "h-6 w-6 text-white relative z-10",
                        })}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-xl">
                            {profile.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className="ml-3 text-xs border-2"
                          >
                            Official
                          </Badge>
                        </div>
                        <p className="text-slate-500">{profile.handle}</p>
                      </div>
                    </div>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 md:mt-0 group"
                    >
                      <Button
                        className={cn(
                          "md:min-w-[150px] justify-center relative overflow-hidden",
                          "shadow-lg group-hover:shadow-xl transition-all duration-300 border-none",
                          profile.color,
                          "text-white hover:text-white"
                        )}
                      >
                        {/* Animated gradient background on hover */}
                        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 animate-shimmer" />
                        
                        {/* Button shine effect */}
                        <span className="absolute inset-0 w-full h-full bg-white/20 skew-x-[-20deg] translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        
                        {/* Button content */}
                        <span className="relative z-10 flex items-center">
                          {profile.cta}
                          <ExternalLink className="h-4 w-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                      </Button>
                    </a>
                  </div>
                  <div className="mt-4 ml-0 md:ml-16">
                    <p className="text-slate-600">{profile.description}</p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      {profile.stats &&
                        Object.entries(profile.stats).map(([key, value]) => (
                          <div
                            key={key}
                            className={cn(
                              "px-4 py-2 rounded-full shadow-sm border transition-all duration-300 hover:shadow-md",
                              "bg-gradient-to-r from-white to-slate-50 hover:from-slate-50 hover:to-white",
                              profile.id === "linkedin" && "border-blue-100 hover:border-blue-200",
                              profile.id === "github" && "border-slate-200 hover:border-slate-300",
                              profile.id === "twitter" && "border-blue-100 hover:border-blue-200",
                              profile.id === "youtube" && "border-red-100 hover:border-red-200",
                              profile.id === "instagram" && "border-pink-100 hover:border-pink-200",
                              profile.id === "discord" && "border-indigo-100 hover:border-indigo-200",
                            )}
                          >
                            <span className={cn(
                              "text-sm font-semibold",
                              profile.id === "linkedin" && "text-blue-700",
                              profile.id === "github" && "text-slate-800",
                              profile.id === "twitter" && "text-blue-500",
                              profile.id === "youtube" && "text-red-600",
                              profile.id === "instagram" && "text-pink-600",
                              profile.id === "discord" && "text-indigo-600",
                            )}>
                              {value}
                            </span>
                            <span className="text-xs text-slate-500 capitalize ml-1">
                              {key}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call to action section */}
      <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Connected with GreedyMap
            </h2>
            <p className="text-slate-600 mb-8">
              Join our community to stay updated with the latest industry
              trends, product updates, and exclusive learning resources.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700 relative overflow-hidden group"
              >
                {/* Animated pulse effect */}
                <span className="absolute inset-0 rounded-md bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                
                {/* Subtle gradient overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10 flex items-center font-medium">
                  Explore Resources
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/60 to-indigo-50/0 opacity-0 group-hover:opacity-100 animate-shimmer" />
                <span className="relative z-10 flex items-center">
                  Join Newsletter
                  <Mail className="ml-2 h-5 w-5 transform group-hover:scale-110 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
