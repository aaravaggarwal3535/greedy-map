import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { motion } from 'framer-motion';

export const DashboardSkillsRadar = ({ skills }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Format skills data for the radar chart
  const formatSkillsForRadar = (skillsData) => {
    return skillsData.map(skill => ({
      subject: skill.name,
      A: skill.level,
      fullMark: 100,
    }));
  };

  const defaultSkills = [
    { name: 'JavaScript', level: 75 },
    { name: 'React', level: 68 },
    { name: 'Node.js', level: 62 },
    { name: 'CSS', level: 82 },
    { name: 'Python', level: 45 }
  ];

  const data = formatSkillsForRadar(skills || defaultSkills);
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium text-gray-800">{payload[0].payload.subject}</p>
          <p className="text-blue-600 font-semibold">{`Proficiency: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  const onMouseEnter = (data, index) => {
    setActiveIndex(index);
  };
  
  const onMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: '#64748b', 
              fontSize: 12,
              fontWeight: 500 
            }} 
            dy={4}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tickCount={5}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            stroke="#cbd5e1"
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
            animationDuration={1000}
            animationEasing="ease-out"
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#3b82f6"
            fill="url(#colorSkill)"
            fillOpacity={0.4}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Gradient definition */}
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="colorSkill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.5} />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Skill details on side */}
      <div className="absolute top-0 right-0 space-y-2 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
        {(skills || defaultSkills).map((skill, idx) => (
          <motion.div 
            key={idx}
            className={`text-xs py-1 px-2 rounded-full flex items-center gap-1.5 transition-colors ${
              activeIndex === idx ? 'bg-blue-100 text-blue-800' : 'text-gray-600'
            }`}
            animate={{ 
              backgroundColor: activeIndex === idx ? '#dbeafe' : 'transparent',
              color: activeIndex === idx ? '#1e40af' : '#4b5563'
            }}
          >
            <span 
              className="w-2 h-2 rounded-full bg-blue-500"
              style={{ opacity: (skill.level / 100) + 0.3 }}
            ></span>
            <span className="font-medium">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
