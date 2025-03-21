import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800 border-green-200',
  Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Advanced: 'bg-red-100 text-red-800 border-red-200'
};

const ProjectDetail = () => {
  const { projectTitle } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    setTimeout(() => {
      // Create mock detailed data for the selected project
      const mockProjectDetails = {
        id: projectTitle.toLowerCase().replace(/\s+/g, '-'),
        title: projectTitle,
        description: "This project demonstrates advanced concepts and real-world implementation techniques.",
        longDescription: "This project demonstrates advanced concepts and real-world implementation techniques. It includes comprehensive documentation, testing practices, and deployment strategies that align with industry standards. By completing this project, you'll gain valuable experience with modern development workflows and architectural patterns.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
        difficulty: projectTitle.includes("Advanced") ? "Advanced" : 
                   projectTitle.includes("Intermediate") ? "Intermediate" : "Beginner",
        timeEstimate: "2-3 weeks",
        githubUrl: `https://github.com/example/${projectTitle.toLowerCase().replace(/\s+/g, '-')}`,
        demoUrl: `https://demo-${projectTitle.toLowerCase().replace(/\s+/g, '-')}.netlify.app`,
        learningOutcomes: [
          "Building responsive UIs", 
          "Working with REST APIs", 
          "State management",
          "Creating reusable components",
          "Authentication and authorization",
          "Error handling and debugging",
          "Performance optimization"
        ],
        codeSnippets: [
          {
            language: "javascript",
            code: "// Example implementation for a data fetching hook\nimport { useState, useEffect } from 'react';\n\nconst useFetch = (url) => {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const fetchData = async () => {\n      try {\n        const response = await fetch(url);\n        if (!response.ok) throw new Error('Network response was not ok');\n        const json = await response.json();\n        setData(json);\n      } catch (error) {\n        setError(error);\n      } finally {\n        setLoading(false);\n      }\n    };\n\n    fetchData();\n  }, [url]);\n\n  return { data, loading, error };\n};\n\nexport default useFetch;"
          }
        ],
        resources: [
          {
            title: "Official Documentation",
            url: "https://docs.example.com/framework"
          },
          {
            title: "Project Tutorial",
            url: "https://tutorial.example.com/project-guide"
          },
          {
            title: "Best Practices Guide",
            url: "https://best-practices.example.com/react"
          }
        ],
        author: {
          name: "Greedy Map Team",
          github: "https://github.com/greedymap"
        }
      };
      
      setProjectDetails(mockProjectDetails);
      setLoading(false);
    }, 1000);
  }, [projectTitle]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="sm" className="rounded-full">
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-60 w-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link to="/projects">
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          {projectDetails?.difficulty && (
            <Badge className={difficultyColors[projectDetails.difficulty]}>
              {projectDetails.difficulty}
            </Badge>
          )}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{projectDetails?.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{projectDetails?.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <Card className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Project Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectDetails?.technologies?.map((tech, i) => (
                      <Badge key={i} variant="outline" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Time</h3>
                  <p>{projectDetails?.timeEstimate}</p>
                </div>
                
                {projectDetails?.author && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Author</h3>
                    <a 
                      href={projectDetails.author.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {projectDetails.author.name}
                      <FiExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Resources</h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <a 
                      href={projectDetails?.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <FiExternalLink className="h-4 w-4" />
                      View Demo
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline" className="flex-1">
                    <a 
                      href={projectDetails?.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <FiGithub className="h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                </div>
                
                {projectDetails?.resources && projectDetails.resources.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Resources</h3>
                    <ul className="space-y-2">
                      {projectDetails.resources.map((resource, i) => (
                        <li key={i}>
                          <a 
                            href={resource.url}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {resource.title}
                            <FiExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8 mb-10">
          {projectDetails?.longDescription && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="prose max-w-none">
                <p>{projectDetails.longDescription}</p>
              </div>
            </div>
          )}
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Learning Outcomes</h2>
            {projectDetails?.learningOutcomes && projectDetails.learningOutcomes.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {projectDetails.learningOutcomes.map((outcome, i) => (
                  <li key={i} className="text-gray-700">{outcome}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No learning outcomes specified.</p>
            )}
          </div>
          
          {projectDetails?.codeSnippets && projectDetails.codeSnippets.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Code Example</h2>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                <pre className="font-mono text-sm">
                  {projectDetails.codeSnippets[0]?.code || '// No code provided'}
                </pre>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/projects">
              Explore More Projects
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
