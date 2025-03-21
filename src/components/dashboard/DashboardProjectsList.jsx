import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, CalendarClock, ExternalLink, Github, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardProjectsList = () => {
  const projects = [
    { 
      id: 1, 
      name: 'Weather Dashboard', 
      status: 'completed', 
      date: '2023-06-15',
      technologies: ['React', 'API', 'CSS'],
      githubUrl: 'https://github.com/yourusername/weather-dashboard',
      demoUrl: 'https://weather-dashboard-demo.netlify.app'
    },
    { 
      id: 2, 
      name: 'Task Manager App', 
      status: 'in-progress', 
      progress: 65,
      date: '2023-06-02',
      technologies: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/yourusername/task-manager',
      demoUrl: 'https://task-manager-demo.netlify.app'
    },
    { 
      id: 3, 
      name: 'Portfolio Website', 
      status: 'completed', 
      date: '2023-05-20',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/yourusername/portfolio',
      demoUrl: 'https://your-portfolio.dev'
    }
  ];
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <CalendarClock className="h-4 w-4 text-blue-500" />;
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Planned';
    }
  };
  
  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default: return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-3">
      {projects.map(project => (
        <div key={project.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div className="flex items-center p-4">
            <div className="mr-4 p-2 rounded-full bg-gray-50">
              {getStatusIcon(project.status)}
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap justify-between items-center">
                <h4 className="font-medium text-gray-800 mb-1">{project.name}</h4>
                <Badge className={getStatusBadgeColor(project.status)}>
                  {getStatusText(project.status)}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-white">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500 flex items-center">
                  <CalendarClock className="h-3 w-3 mr-1" />
                  {formatDate(project.date)}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="View on GitHub">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" title="View Demo">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Demo</span>
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                    <Link to={`/projects?id=${project.id}`} title="View Details">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Details</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {project.status === 'in-progress' && (
            <div className="h-1 bg-gray-100">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          )}
          {project.status === 'completed' && (
            <div className="h-1 bg-gradient-to-r from-green-400 to-green-500"></div>
          )}
        </div>
      ))}
    </div>
  );
};
