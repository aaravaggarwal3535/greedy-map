import React, { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

const LearningContent = ({ courses }) => {
  const [completedItems, setCompletedItems] = useState({});
  const [activeContent, setActiveContent] = useState(null);
  
  // Calculate overall progress
  const totalItems = courses.reduce((total, course) => 
    total + course.topics.reduce((sum, topic) => sum + topic.content.length, 0), 0);
  
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const overallProgress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // Handle video completion
  const handleVideoComplete = (topicId, contentId) => {
    setCompletedItems(prev => ({
      ...prev,
      [`${topicId}-${contentId}`]: true
    }));
  };

  // Handle checkbox toggle (only allowed after video completion)
  const handleCheckboxChange = (topicId, contentId, isCompleted) => {
    if (isCompleted) {
      setCompletedItems(prev => ({
        ...prev,
        [`${topicId}-${contentId}`]: !prev[`${topicId}-${contentId}`]
      }));
    }
  };

  // Set up video end event listener
  useEffect(() => {
    if (!activeContent) return;
    
    const videoElement = document.getElementById(`video-${activeContent.topicId}-${activeContent.contentId}`);
    
    if (videoElement) {
      const handleEnd = () => handleVideoComplete(activeContent.topicId, activeContent.contentId);
      videoElement.addEventListener("ended", handleEnd);
      
      return () => {
        videoElement.removeEventListener("ended", handleEnd);
      };
    }
  }, [activeContent]);

  return (
    <div className="flex flex-col gap-6">
      {/* Overall Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all" 
          style={{ width: `${overallProgress}%` }}
        ></div>
        <p className="text-sm mt-1 text-right">{overallProgress}% completed</p>
      </div>

      {courses.map((course) => (
        <div key={course.id} className="border rounded-lg p-5 space-y-4">
          <h2 className="text-xl font-bold">{course.title}</h2>
          
          {course.topics.map((topic) => {
            // Calculate topic progress
            const topicTotal = topic.content.length;
            const topicCompleted = topic.content.filter(content => 
              completedItems[`${topic.id}-${content.id}`]
            ).length;
            const topicProgress = topicTotal > 0 ? Math.round((topicCompleted / topicTotal) * 100) : 0;
            
            return (
              <div key={topic.id} className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{topic.title}</h3>
                  <span className="text-sm">{topicProgress}% completed</span>
                </div>
                
                {/* Topic Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all" 
                    style={{ width: `${topicProgress}%` }}
                  ></div>
                </div>

                {/* Content Items (Combined Video and Documentation) */}
                <div className="space-y-2 ml-2">
                  {topic.content.map((content) => {
                    const isCompleted = !!completedItems[`${topic.id}-${content.id}`];
                    
                    return (
                      <div key={content.id} className="border-l-2 pl-4 py-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Checkbox 
                            id={`check-${topic.id}-${content.id}`}
                            checked={isCompleted}
                            onCheckedChange={() => handleCheckboxChange(topic.id, content.id, isCompleted)}
                            disabled={!isCompleted}
                          />
                          <label 
                            htmlFor={`check-${topic.id}-${content.id}`}
                            className={cn(
                              "text-md font-medium cursor-pointer",
                              isCompleted && "line-through text-muted-foreground"
                            )}
                          >
                            {content.title}
                          </label>
                        </div>
                        
                        {/* Show content when selected */}
                        <button 
                          onClick={() => setActiveContent({ topicId: topic.id, contentId: content.id })}
                          className="text-sm text-primary font-medium hover:underline"
                        >
                          View content
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Active Content Viewer - Integrated Video and Documentation */}
      {activeContent && courses.some(course => 
        course.topics.some(topic => 
          topic.id === activeContent.topicId && topic.content.some(content => content.id === activeContent.contentId)
        )
      ) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {courses.flatMap(course => course.topics)
                  .find(topic => topic.id === activeContent.topicId)
                  ?.content.find(content => content.id === activeContent.contentId)?.title}
              </h3>
              <button 
                onClick={() => setActiveContent(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>
            
            {/* Integrated Content View - Video and Documentation Together */}
            {(() => {
              const currentContent = courses.flatMap(course => course.topics)
                .find(topic => topic.id === activeContent.topicId)
                ?.content.find(content => content.id === activeContent.contentId);
                
              if (!currentContent) return null;
              
              return (
                <div className="space-y-6">
                  {/* Video player with documentation flowing around it or beside it */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/2">
                      <video
                        id={`video-${activeContent.topicId}-${activeContent.contentId}`}
                        className="w-full rounded-lg"
                        controls
                      >
                        <source src={currentContent.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    
                    {/* Documentation right next to video on larger screens, below on mobile */}
                    <div className="md:w-1/2 prose prose-sm max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: currentContent.documentation }} />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export { LearningContent };
