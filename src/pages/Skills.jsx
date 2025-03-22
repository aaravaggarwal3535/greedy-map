import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckSquare, FiCode, FiCpu, FiLayers, FiBriefcase, FiExternalLink, 
  FiCheckCircle, FiClock, FiAward, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Notsignin } from '@/components/Notsignin';

const Skills = () => {
  const [completedAssessments, setCompletedAssessments] = useState({});
  const [activeTab, setActiveTab] = useState("assessments");
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(0);
  
  // Load user data from localStorage
  useEffect(() => {
    const savedAssessments = localStorage.getItem('completedAssessments');
    if (savedAssessments) {
      setCompletedAssessments(JSON.parse(savedAssessments));
    }
  }, []);
  
  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('completedAssessments', JSON.stringify(completedAssessments));
  }, [completedAssessments]);
  
  // Calculate completion percentage for each category
  const getCategoryCompletion = (categoryName) => {
    const category = assessmentCategories.find(cat => cat.name === categoryName);
    if (!category) return 0;
    
    let completed = 0;
    let total = 0;
    
    category.assessments.forEach(assessment => {
      total++;
      if (completedAssessments[assessment.id]) completed++;
    });
    
    return total > 0 ? (completed / total) * 100 : 0;
  };
  
  // Start an assessment
  const startAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setShowResults(false);
  };
  
  // Complete an assessment
  const completeAssessment = () => {
    const score = Math.floor(Math.random() * 41) + 60; // Random score between 60-100
    
    // Mark assessment as completed
    setCompletedAssessments(prev => ({
      ...prev,
      [currentAssessment.id]: {
        completed: true,
        score: score,
        date: new Date().toISOString()
      }
    }));
    
    setAssessmentScore(score);
    setShowResults(true);
  };
  
  // Start a challenge
  const startChallenge = (challenge) => {
    setCurrentChallenge(challenge);
  };
  
  // Complete a challenge
  const completeChallenge = () => {
    // Simulate challenge completion and award points
    const pointsEarned = currentChallenge.startingPoints;
    const currentPoints = parseInt(localStorage.getItem('skillPoints') || '0');
    localStorage.setItem('skillPoints', currentPoints + pointsEarned);
    
    setCurrentChallenge(null);
    // Show success notification (would be implemented with a toast library)
  };
  
  // Format date string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Assessment categories data
  const assessmentCategories = [
    {
      id: 'frontend',
      name: 'Frontend Development',
      icon: <FiLayers className="w-6 h-6" />,
      color: 'from-blue-600 to-indigo-600',
      assessments: [
        {
          id: 'html-css',
          name: 'HTML & CSS',
          description: 'Test your knowledge of HTML5 and CSS3 fundamentals',
          questions: 20,
          duration: '30 minutes',
          level: 'Beginner',
          sampleQuestions: [
            {
              question: "What does CSS stand for?",
              options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
              answer: 2
            },
            {
              question: "Which HTML tag is used to define an internal style sheet?",
              options: ["<css>", "<script>", "<style>", "<link>"],
              answer: 2
            }
          ]
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          description: 'Advanced JavaScript concepts and ES6+ features',
          questions: 25,
          duration: '45 minutes',
          level: 'Intermediate',
          sampleQuestions: [
            {
              question: "What will be the output of: console.log(typeof [])?",
              options: ["array", "object", "Array", "undefined"],
              answer: 1
            },
            {
              question: "Which method adds one or more elements to the end of an array?",
              options: ["push()", "join()", "pop()", "concat()"],
              answer: 0
            }
          ]
        },
        {
          id: 'react',
          name: 'React',
          description: 'Component architecture, hooks, and state management',
          questions: 30,
          duration: '60 minutes',
          level: 'Advanced',
          sampleQuestions: [
            {
              question: "What hook would you use to run side effects after render?",
              options: ["useState", "useEffect", "useContext", "useReducer"],
              answer: 1
            },
            {
              question: "What method is used to update state in a class component?",
              options: ["this.state()", "this.setState()", "this.updateState()", "this.changeState()"],
              answer: 1
            }
          ]
        }
      ]
    },
    {
      id: 'backend',
      name: 'Backend Development',
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-green-600 to-teal-600',
      assessments: [
        {
          id: 'nodejs',
          name: 'Node.js',
          description: 'Core concepts, async programming, and Express.js',
          questions: 25,
          duration: '45 minutes',
          level: 'Intermediate',
          sampleQuestions: [
            {
              question: "Which of the following is NOT a Node.js module?",
              options: ["fs", "http", "path", "window"],
              answer: 3
            },
            {
              question: "What does the EventEmitter class do in Node.js?",
              options: [
                "Manages file system operations", 
                "Implements the Observer pattern", 
                "Creates HTTP servers", 
                "Handles database connections"
              ],
              answer: 1
            }
          ]
        },
        {
          id: 'databases',
          name: 'Databases',
          description: 'SQL, NoSQL, and database design principles',
          questions: 20,
          duration: '40 minutes',
          level: 'Intermediate',
          sampleQuestions: [
            {
              question: "Which of these is NOT a NoSQL database?",
              options: ["MongoDB", "Redis", "Oracle", "Cassandra"],
              answer: 2
            },
            {
              question: "What does ACID stand for in database transactions?",
              options: [
                "Atomicity, Consistency, Isolation, Durability",
                "Aggregation, Completion, Integrity, Delivery",
                "Association, Composition, Inheritance, Dependency",
                "Authentication, Certification, Identification, Decryption"
              ],
              answer: 0
            }
          ]
        }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: <FiBriefcase className="w-6 h-6" />,
      color: 'from-orange-500 to-amber-500',
      assessments: [
        {
          id: 'git',
          name: 'Git & GitHub',
          description: 'Version control, branching strategies, and collaboration',
          questions: 15,
          duration: '30 minutes',
          level: 'Beginner',
          sampleQuestions: [
            {
              question: "Which command creates a new Git repository?",
              options: ["git init", "git start", "git create", "git new"],
              answer: 0
            },
            {
              question: "What does 'git pull' do?",
              options: [
                "Creates a new branch",
                "Fetches and merges changes from a remote repository",
                "Uploads local changes to a remote repository",
                "Lists all branches"
              ],
              answer: 1
            }
          ]
        },
        {
          id: 'docker',
          name: 'Docker',
          description: 'Containerization, Docker Compose, and orchestration',
          questions: 20,
          duration: '40 minutes',
          level: 'Intermediate',
          sampleQuestions: [
            {
              question: "What command starts a Docker container?",
              options: ["docker start", "docker run", "docker build", "docker pull"],
              answer: 1
            },
            {
              question: "What file is used to define a Docker container?",
              options: ["docker.yml", "container.json", "Dockerfile", "docker-compose.yml"],
              answer: 2
            }
          ]
        }
      ]
    }
  ];
  
  // Coding challenges data
  const codingChallenges = [
    {
      id: 'algo-1',
      name: 'Array Manipulation',
      difficulty: 'Easy',
      description: 'Implement functions to perform common array operations like filtering and mapping.',
      technologies: ['JavaScript'],
      startingPoints: 100,
      exampleCode: `// Implement a function that filters out all numbers less than 10
function filterSmallNumbers(array) {
  // Your code here
}

// Example usage:
const numbers = [5, 10, 15, 20];
console.log(filterSmallNumbers(numbers)); // Should return [10, 15, 20]`
    },
    {
      id: 'algo-2',
      name: 'String Processing',
      difficulty: 'Medium',
      description: 'Parse and manipulate strings to extract information and transform data.',
      technologies: ['Python', 'JavaScript'],
      startingPoints: 200,
      exampleCode: `// Implement a function that reverses words in a sentence
function reverseWords(sentence) {
  // Your code here
}

// Example usage:
console.log(reverseWords("Hello world")); // Should return "olleH dlrow"`
    },
    {
      id: 'react-1',
      name: 'React Component Library',
      difficulty: 'Medium',
      description: 'Build a small component library with proper documentation.',
      technologies: ['React', 'TypeScript'],
      startingPoints: 300,
      exampleCode: `// Create a reusable Button component with variants
import React from 'react';

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = () => {
  // Your code here
};

export default Button;`
    },
    {
      id: 'backend-1',
      name: 'RESTful API',
      difficulty: 'Hard',
      description: 'Create a fully functional REST API with authentication and testing.',
      technologies: ['Node.js', 'Express'],
      startingPoints: 500,
      exampleCode: `// Create an Express route for user authentication
const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  // Your authentication logic here
});

module.exports = router;`
    }
  ];

  // Fix the conditional rendering logic
  if (localStorage.userId == undefined){
    return <Notsignin/>;
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Skills Assessment & Challenges
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Test your knowledge and take on coding challenges to improve your technical skills.
          </p>
        </motion.div>
        
        {/* Points Display */}
        <div className="flex justify-center mb-10">
          <div className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <FiAward className="text-white text-xl" />
              <span className="text-white font-bold text-xl">
                {parseInt(localStorage.getItem('skillPoints') || '0')} Points
              </span>
            </div>
          </div>
        </div>
        
        {/* Main tabs */}
        {!currentAssessment && !currentChallenge ? (
          <Tabs defaultValue="assessments" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="assessments" className="flex items-center gap-2">
                <FiCheckSquare /> Assessments
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <FiCode /> Coding Challenges
              </TabsTrigger>
            </TabsList>
            
            {/* Assessments Tab */}
            <TabsContent value="assessments">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessmentCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-xl overflow-hidden shadow-sm bg-white"
                  >
                    <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">{category.name}</h2>
                        {category.icon}
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span>Progress</span>
                          <span>{getCategoryCompletion(category.name).toFixed(0)}%</span>
                        </div>
                        <Progress value={getCategoryCompletion(category.name)} className="h-1.5 bg-white/30" />
                      </div>
                    </div>
                    
                    <div className="p-4">
                      {category.assessments.map((assessment) => {
                        const isCompleted = completedAssessments[assessment.id];
                        
                        return (
                          <div key={assessment.id} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-gray-800 flex items-center">
                                {assessment.name}
                                {isCompleted && (
                                  <FiCheckCircle className="ml-2 text-green-500" />
                                )}
                              </h3>
                              <span className={`text-xs font-medium ${
                                assessment.level === 'Beginner' ? 'bg-blue-100 text-blue-600' :
                                assessment.level === 'Intermediate' ? 'bg-amber-100 text-amber-600' :
                                'bg-purple-100 text-purple-600'
                              } px-2 py-0.5 rounded-full`}>
                                {assessment.level}
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">
                              {assessment.description}
                            </p>
                            
                            <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                              <span>{assessment.questions} questions</span>
                              <span>{assessment.duration}</span>
                            </div>
                            
                            {isCompleted ? (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex justify-between items-center text-sm mb-1">
                                  <span className="font-medium">Your score</span>
                                  <span className={`font-semibold ${
                                    completedAssessments[assessment.id].score >= 80 ? 'text-green-600' :
                                    completedAssessments[assessment.id].score >= 70 ? 'text-amber-600' :
                                    'text-orange-600'
                                  }`}>
                                    {completedAssessments[assessment.id].score}%
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Completed on {formatDate(completedAssessments[assessment.id].date)}
                                </div>
                                <Button 
                                  onClick={() => startAssessment(assessment)}
                                  className="w-full mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                                >
                                  Retake Assessment
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => startAssessment(assessment)}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                              >
                                Start Assessment
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            {/* Coding Challenges Tab */}
            <TabsContent value="challenges">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {codingChallenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-xl overflow-hidden shadow-sm bg-white p-6"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-semibold text-gray-800">{challenge.name}</h2>
                      <span className={`text-xs font-medium ${
                        challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                        challenge.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600' :
                        'bg-red-100 text-red-600'
                      } px-2 py-0.5 rounded-full`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {challenge.technologies.map(tech => (
                        <span key={tech} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-amber-600 font-medium flex items-center gap-1">
                        <FiAward /> {challenge.startingPoints} points
                      </span>
                      <span className="text-sm text-gray-500">45 minute limit</span>
                    </div>
                    
                    <Button 
                      onClick={() => startChallenge(challenge)}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    >
                      Accept Challenge
                    </Button>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : currentAssessment ? (
          // Assessment View
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{currentAssessment.name} Assessment</h2>
              <Button 
                variant="outline" 
                onClick={() => setCurrentAssessment(null)}
                className="border-gray-300"
              >
                Back to Assessments
              </Button>
            </div>
            
            {!showResults ? (
              <div className="space-y-8">
                <div className="flex justify-between pb-4 border-b">
                  <div>
                    <span className={`text-xs font-medium ${
                      currentAssessment.level === 'Beginner' ? 'bg-blue-100 text-blue-600' :
                      currentAssessment.level === 'Intermediate' ? 'bg-amber-100 text-amber-600' :
                      'bg-purple-100 text-purple-600'
                    } px-2 py-0.5 rounded-full`}>
                      {currentAssessment.level}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <FiClock className="mr-1" /> {currentAssessment.duration}
                  </div>
                </div>
                
                {/* Sample Questions */}
                <div className="space-y-10">
                  {currentAssessment.sampleQuestions.map((q, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">Question {i+1}: {q.question}</h3>
                      <div className="space-y-3">
                        {q.options.map((option, j) => (
                          <div 
                            key={j} 
                            className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-blue-50 transition-colors"
                          >
                            <div className="h-5 w-5 rounded-full border border-gray-300 mr-3"></div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-6 border-t">
                  <div className="text-gray-600">
                    <span className="font-medium">Note:</span> This is a sample of questions you'll encounter in the assessment.
                  </div>
                  <Button 
                    onClick={completeAssessment}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    Complete Assessment
                  </Button>
                </div>
              </div>
            ) : (
              // Results view
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-3xl font-bold mb-4">
                  {assessmentScore}%
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {
                    assessmentScore >= 80 ? "Great job!" :
                    assessmentScore >= 70 ? "Well done!" :
                    "Keep practicing!"
                  }
                </h3>
                <p className="text-gray-600 mb-6">
                  {
                    assessmentScore >= 80 ? "You've mastered this skill!" :
                    assessmentScore >= 70 ? "You're on the right track!" :
                    "You're making progress. Keep learning!"
                  }
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => setCurrentAssessment(null)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    Back to Assessments
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowResults(false);
                    }}
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Review Questions
                  </Button>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-semibold mb-2">Recommended Learning Resources</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link to="/learning" className="text-blue-600 hover:underline flex items-center">
                      <FiArrowRight className="mr-1" /> View learning materials
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          // Challenge View
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{currentChallenge.name} Challenge</h2>
              <Button 
                variant="outline" 
                onClick={() => setCurrentChallenge(null)}
                className="border-gray-300"
              >
                Back to Challenges
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between pb-4 border-b">
                <div>
                  <span className={`text-xs font-medium ${
                    currentChallenge.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                    currentChallenge.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  } px-2 py-0.5 rounded-full`}>
                    {currentChallenge.difficulty}
                  </span>
                </div>
                <div className="text-amber-600 font-medium flex items-center gap-1">
                  <FiAward /> {currentChallenge.startingPoints} points
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600">{currentChallenge.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Example Code</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                    {currentChallenge.exampleCode}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Your Solution</h3>
                <div className="bg-gray-100 p-4 rounded-md h-64 mb-4">
                  <textarea 
                    className="w-full h-full bg-transparent resize-none p-2 focus:outline-none font-mono text-sm" 
                    placeholder="// Write your solution here..."
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentChallenge(null)}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={completeChallenge}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  Submit Solution
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 mb-6 text-center border-t border-gray-200 pt-16"
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Need to strengthen your skills first?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Take advantage of our learning resources to build your knowledge before attempting the assessments.
          </p>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl px-8 py-2 h-11 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Link to="/learning">Go to Learning Resources</Link>
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Skills;