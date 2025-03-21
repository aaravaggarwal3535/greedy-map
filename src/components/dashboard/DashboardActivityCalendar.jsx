import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const DashboardActivityCalendar = () => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();
  
  // Generate a full year calendar like GitHub (52 weeks)
  const generateCalendarData = () => {
    const data = [];
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    oneYearAgo.setDate(today.getDate() + 1); // Start from one year ago today + 1 day
    
    // Create weekly data arrays
    for (let week = 0; week < 52; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        // Calculate date for this cell (starting from one year ago)
        const cellDate = new Date(oneYearAgo);
        cellDate.setDate(oneYearAgo.getDate() + (week * 7) + day);
        
        // Don't include future dates
        const isFutureDate = cellDate > today;
        
        // Generate random activity level (more recent = more likely to have activity)
        const recencyFactor = 1 - ((today - cellDate) / (today - oneYearAgo));
        const activityChance = Math.min(0.8, recencyFactor + 0.3);
        const randomValue = Math.random();
        
        let activityLevel = 0;
        if (!isFutureDate) {
          if (randomValue < activityChance * 0.7) activityLevel = 1;
          if (randomValue < activityChance * 0.5) activityLevel = 2;
          if (randomValue < activityChance * 0.3) activityLevel = 3;
          if (randomValue < activityChance * 0.1) activityLevel = 4;
        }
        
        weekData.push({
          date: cellDate,
          dateString: cellDate.toISOString().split('T')[0],
          activityLevel: isFutureDate ? 0 : activityLevel,
          activities: activityLevel // Just for tooltip display
        });
      }
      data.push(weekData);
    }
    
    return data;
  };
  
  const calendarData = generateCalendarData();
  
  const getActivityColor = (level) => {
    switch(level) {
      case 0: return 'bg-gray-100';
      case 1: return 'bg-blue-100';
      case 2: return 'bg-blue-300';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-blue-700';
      default: return 'bg-gray-100';
    }
  };

  const formatDate = (date) => {
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Find months to display on the top of the graph
  const getMonthLabels = () => {
    const monthLabels = [];
    let currentMonth = null;
    
    calendarData.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0].date;
      const month = firstDayOfWeek.getMonth();
      
      if (month !== currentMonth && (weekIndex === 0 || week[0].date.getDate() <= 7)) {
        monthLabels.push({
          month: months[month],
          week: weekIndex
        });
        currentMonth = month;
      }
    });
    
    return monthLabels;
  };
  
  const monthLabels = getMonthLabels();

  return (
    <div className="w-full h-full flex flex-col text-xs">
      {/* Month labels */}
      <div className="flex mb-1 pl-7 relative">
        {monthLabels.map((label, index) => (
          <div 
            key={index} 
            className="text-xs text-gray-500"
            style={{ 
              position: 'absolute', 
              left: `${label.week * 2.1 + 3}%` // Adjust this spacing to match your grid
            }}
          >
            {label.month}
          </div>
        ))}
      </div>
      
      <div className="relative pt-3 flex h-full">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pr-2 text-right">
          {days.map((day, i) => (
            i % 2 === 0 ? (
              <div key={day} className="h-[10px] text-[9px] text-gray-500 flex items-center">
                {day}
              </div>
            ) : <div key={day} className="h-[10px]"></div>
          ))}
        </div>
        
        {/* Activity grid */}
        <div className="flex-1 overflow-x-auto pr-2">
          <div className="flex gap-[3px]">
            {calendarData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <motion.div 
                    key={`${weekIndex}-${dayIndex}`} 
                    className={`w-[10px] h-[10px] rounded-[2px] ${getActivityColor(day.activityLevel)} hover:ring-1 hover:ring-blue-400 cursor-pointer transition-all relative`}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    title={`${formatDate(day.date)}: ${day.activities} activities`}
                    whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      {hoveredDay && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bg-gray-800 text-white text-xs rounded py-1.5 px-3 shadow-lg z-10"
          style={{
            top: `calc(${Math.floor(days.indexOf(hoveredDay.date.toLocaleString('en-US', { weekday: 'short' })) * 13)}px + 3rem)`,
            left: `calc(${Math.floor((new Date(hoveredDay.date) - new Date(calendarData[0][0].date)) / (86400000 * 7)) * 13}px + 5rem)`,
            transform: 'translate(-50%, -100%)',
            marginTop: '-10px'
          }}
        >
          <div className="font-semibold">{formatDate(hoveredDay.date)}</div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getActivityColor(hoveredDay.activityLevel)}`}></div>
            <span>{hoveredDay.activities} {hoveredDay.activities === 1 ? 'contribution' : 'contributions'}</span>
          </div>
          <div className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </motion.div>
      )}
      
      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-[9px] text-gray-500">
        <span>Less</span>
        <div className="flex gap-[2px]">
          <div className="w-[10px] h-[10px] rounded-[2px] bg-gray-100"></div>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-100"></div>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-300"></div>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-500"></div>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-700"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
