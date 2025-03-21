import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, BarChart2, Award, BookOpen, Code, CheckCircle, 
  ChevronRight, Settings, PieChart, Layout as LayoutIcon, 
  Calendar, Star, ArrowRight, Zap, Bell, MessageSquare, TrendingUp,
  Briefcase, Bookmark, FileText, Coffee, Target, Layers, Hexagon,
  Clock // Add Clock icon here
} from 'lucide-react';
import { Link } from "react-router-dom";
import { DashboardChart } from "@/components/dashboard/DashboardChart";
import { DashboardActivityCalendar } from "@/components/dashboard/DashboardActivityCalendar";
import { DashboardProjectsList } from "@/components/dashboard/DashboardProjectsList";
import { DashboardSkillsRadar } from "@/components/dashboard/DashboardSkillsRadar";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const cardHoverVariants = {
  hover: { 
    y: -5, 
    boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStats, setCurrentStats] = useState('weekly');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Fetch user data
  useEffect(() => {
    // Simulating API call with setTimeout
    setTimeout(() => {
      // In a real app, you would fetch this data from your API
      const mockUserData = {
        name: localStorage.getItem('userName') || 'User',
        email: localStorage.getItem('userEmail') || 'user@example.com',
        completedProjects: 4,
        skills: [
          { name: 'JavaScript', level: 75 },
          { name: 'React', level: 68 },
          { name: 'Node.js', level: 62 },
          { name: 'CSS', level: 82 },
          { name: 'Python', level: 45 }
        ],
        learningProgress: 42,
        recentActivity: [
          { type: 'project', name: 'Weather App', date: '2023-06-15' },
          { type: 'skill', name: 'Completed React Assessment', date: '2023-06-12' },
          { type: 'learning', name: 'JavaScript Advanced Course', date: '2023-06-10' }
        ],
        badges: [
          { name: 'Frontend Developer', description: 'Completed frontend roadmap', icon: <Code size={16} /> },
          { name: 'React Pro', description: 'Built 5+ React projects', icon: <Hexagon size={16} /> },
          { name: 'Quick Learner', description: 'Completed 10 courses', icon: <Zap size={16} /> }
        ],
        joinDate: '2023-05-01',
        nextGoals: [
          { name: 'Complete Node.js Course', progress: 65, dueDate: '2023-07-15' },
          { name: 'Launch Portfolio Website', progress: 30, dueDate: '2023-07-30' }
        ],
        stats: {
          daily: [
            { name: 'Mon', value: 3 },
            { name: 'Tue', value: 7 },
            { name: 'Wed', value: 5 },
            { name: 'Thu', value: 12 },
            { name: 'Fri', value: 8 },
            { name: 'Sat', value: 4 },
            { name: 'Sun', value: 9 }
          ],
          weekly: [
            { name: 'Week 1', value: 21 },
            { name: 'Week 2', value: 15 },
            { name: 'Week 3', value: 32 },
            { name: 'Week 4', value: 28 }
          ],
          monthly: [
            { name: 'Jan', value: 65 },
            { name: 'Feb', value: 59 },
            { name: 'Mar', value: 80 },
            { name: 'Apr', value: 81 },
            { name: 'May', value: 56 },
            { name: 'Jun', value: 87 }
          ]
        }
      };
      
      setUserData(mockUserData);
      setLoading(false);
    }, 800);
  }, []);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex items-center justify-center h-80">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 right-0 bottom-0 animate-ping rounded-full bg-blue-400 opacity-25"></div>
              <div className="relative rounded-full h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center animate-pulse">
                  <Hexagon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const calculateDaysActive = () => {
    const joinDate = new Date(userData.joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto py-8 px-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full">
              <svg className="absolute right-0 top-0 opacity-10" width="400" height="400" viewBox="0 0 200 200">
                <path
                  fill="currentColor"
                  d="M45.1,-76.3C59.2,-69.2,72.1,-59.2,79.7,-45.3C87.4,-31.3,89.8,-13.4,88.5,3.8C87.1,21,82,37.7,72.3,50.4C62.7,63.1,48.5,71.9,33.4,75.7C18.2,79.5,2,78.3,-12.9,74.1C-27.8,70,-41.5,62.8,-53.7,52.7C-65.9,42.6,-76.5,29.6,-80.3,14.6C-84.1,-0.5,-81,-17.6,-74.4,-32.5C-67.8,-47.4,-57.6,-60,-44.5,-67.8C-31.4,-75.5,-15.7,-78.5,-0.2,-78.1C15.3,-77.8,30.9,-83.4,45.1,-76.3Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start relative z-10">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}!</h1>
                <p className="text-blue-100">Here's an overview of your developer journey</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="flex gap-1 items-center px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{calculateDaysActive()} days active</span>
                </div>
                <Button 
                  variant="outline" 
                  className="border-white/20 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm flex items-center gap-2"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                >
                  <Settings className="h-4 w-4" />
                  <span>Customize</span>
                </Button>
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 hover:bg-white/20 transition-colors">
                <div className="bg-white/20 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Learning Progress</p>
                  <h3 className="text-2xl font-bold">{userData.learningProgress}%</h3>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 hover:bg-white/20 transition-colors">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Code className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Projects Completed</p>
                  <h3 className="text-2xl font-bold">{userData.completedProjects}</h3>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 hover:bg-white/20 transition-colors">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Badges Earned</p>
                  <h3 className="text-2xl font-bold">{userData.badges.length}</h3>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 hover:bg-white/20 transition-colors">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Current Goals</p>
                  <h3 className="text-2xl font-bold">{userData.nextGoals.length}</h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-full border shadow-sm mx-auto w-auto flex justify-center mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-6">
                Overview
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-6">
                Skills
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-6">
                Projects
              </TabsTrigger>
              <TabsTrigger value="learning" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-6">
                Learning
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab Content */}
            <TabsContent value="overview">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                {/* User Stats & Activity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* User Profile Card */}
                  <motion.div variants={itemVariants} whileHover="hover" className="md:col-span-1">
                    <Card className="overflow-hidden border-none shadow-xl bg-white rounded-2xl h-full transition-all duration-300">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24 w-full"></div>
                      <div className="px-6 relative pb-6">
                        <div className="relative -mt-12 mb-4 flex justify-center">
                          <div className="relative w-24 h-24 rounded-full border-4 border-white bg-white p-1 shadow-lg">
                            <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white text-3xl font-bold">{userData.name.charAt(0)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-1">{userData.name}</h3>
                          <p className="text-gray-500 text-sm mb-4">{userData.email}</p>
                          <div className="flex justify-center flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                              Developer
                            </Badge>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1">
                              {calculateDaysActive()} days
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full w-full">Edit Profile</Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                  
                  {/* Activity Chart & Stats */}
                  <motion.div variants={itemVariants} whileHover="hover" className="md:col-span-2">
                    <Card className="border-none shadow-xl rounded-2xl h-full transition-all duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                            Developer Activity
                          </CardTitle>
                          <div className="flex rounded-full bg-gray-100 p-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`rounded-full px-3 text-xs ${currentStats === 'daily' ? 'bg-white shadow-sm' : ''}`}
                              onClick={() => setCurrentStats('daily')}
                            >
                              Daily
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`rounded-full px-3 text-xs ${currentStats === 'weekly' ? 'bg-white shadow-sm' : ''}`}
                              onClick={() => setCurrentStats('weekly')}
                            >
                              Weekly
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`rounded-full px-3 text-xs ${currentStats === 'monthly' ? 'bg-white shadow-sm' : ''}`}
                              onClick={() => setCurrentStats('monthly')}
                            >
                              Monthly
                            </Button>
                          </div>
                        </div>
                        <CardDescription>Your contributions over time</CardDescription>
                      </CardHeader>
                      <CardContent className="h-56">
                        <DashboardChart data={userData.stats[currentStats]} />
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
                
                {/* Progress & Activity Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skills Radar Chart */}
                  <motion.div variants={itemVariants} whileHover="hover">
                    <Card className="border-none shadow-xl rounded-2xl transition-all duration-300 overflow-hidden">
                      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardTitle className="text-lg flex items-center">
                          <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                          Skills Overview
                        </CardTitle>
                        <CardDescription>Your current skill proficiency levels</CardDescription>
                      </CardHeader>
                      <CardContent className="h-72 pt-6">
                        <DashboardSkillsRadar skills={userData.skills} />
                      </CardContent>
                      <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t">
                        <Button variant="ghost" size="sm" className="ml-auto group" asChild>
                          <Link to="/skills">
                            View all skills
                            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                  
                  {/* Activity Calendar */}
                  <motion.div variants={itemVariants} whileHover="hover">
                    <Card className="border-none shadow-xl rounded-2xl transition-all duration-300 overflow-hidden">
                      <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-indigo-50">
                        <CardTitle className="text-lg flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                          Contribution Activity
                        </CardTitle>
                        <CardDescription>Your learning and development activity</CardDescription>
                      </CardHeader>
                      <CardContent className="h-72 pt-6">
                        <DashboardActivityCalendar />
                      </CardContent>
                      <CardFooter className="bg-gradient-to-r from-purple-50 to-indigo-50 border-t">
                        <Link to="/projects" className="ml-auto">
                          <Button variant="ghost" size="sm" className="group">
                            View detailed activity
                            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </div>
                
                {/* Goals & Badges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Goals */}
                  <motion.div variants={itemVariants} whileHover="hover">
                    <Card className="border-none shadow-xl rounded-2xl transition-all duration-300 overflow-hidden">
                      <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
                        <CardTitle className="text-lg flex items-center">
                          <Target className="h-5 w-5 mr-2 text-green-600" />
                          Current Goals
                        </CardTitle>
                        <CardDescription>What you're working toward</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-5">
                          {userData.nextGoals.map((goal, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between">
                                <div className="flex items-center">
                                  <span className="flex h-8 w-8 rounded-full bg-green-100 mr-3 items-center justify-center">
                                    <Target className="h-4 w-4 text-green-600" />
                                  </span>
                                  <div>
                                    <h4 className="font-medium text-gray-800">{goal.name}</h4>
                                    <span className="text-xs text-gray-500">Due {new Date(goal.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                  </div>
                                </div>
                                <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
                              </div>
                              <Progress value={goal.progress} className="h-2 bg-gray-100">
                                <div className={`h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full`} style={{ width: `${goal.progress}%` }} />
                              </Progress>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gradient-to-r from-green-50 to-emerald-50 border-t">
                        <Button variant="ghost" size="sm" className="ml-auto group">
                          Set new goal
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                  
                  {/* Achievement Badges */}
                  <motion.div variants={itemVariants} whileHover="hover">
                    <Card className="border-none shadow-xl rounded-2xl transition-all duration-300 overflow-hidden">
                      <CardHeader className="border-b bg-gradient-to-r from-amber-50 to-yellow-50">
                        <CardTitle className="text-lg flex items-center">
                          <Award className="h-5 w-5 mr-2 text-amber-600" />
                          Achievement Badges
                        </CardTitle>
                        <CardDescription>Recognitions for your accomplishments</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          {userData.badges.map((badge, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow transition-shadow">
                              <div className="bg-gradient-to-r from-amber-400 to-yellow-500 h-12 w-12 rounded-full flex items-center justify-center text-white shadow-inner">
                                {badge.icon || <Star className="h-6 w-6" />}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">{badge.name}</h4>
                                <p className="text-xs text-gray-500">{badge.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gradient-to-r from-amber-50 to-yellow-50 border-t">
                        <Button variant="ghost" size="sm" className="ml-auto group">
                          View all achievements
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </div>
                
                {/* Learning Recommendations */}
                <motion.div variants={itemVariants} whileHover="hover" className="rounded-2xl overflow-hidden">
                  <Card className="border-none shadow-xl transition-all duration-300">
                    <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle className="text-lg flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                        Learning Recommendations
                      </CardTitle>
                      <CardDescription>Personalized suggestions based on your skills and interests</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.div 
                          className="rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300 border border-gray-100"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700 relative overflow-hidden">
                            <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center">
                              <Code className="h-12 w-12 text-white" />
                            </div>
                            <div className="absolute top-0 right-0 m-2">
                              <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold mb-1 text-gray-800">Advanced React Patterns</h4>
                            <p className="text-sm text-gray-600 mb-3">Learn advanced component patterns and hooks</p>
                            <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800">
                              Start Learning
                            </Button>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300 border border-gray-100"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="h-32 bg-gradient-to-r from-purple-500 to-purple-700 relative overflow-hidden">
                            <div className="absolute inset-0 bg-purple-900/20 flex items-center justify-center">
                              <BarChart2 className="h-12 w-12 text-white" />
                            </div>
                            <div className="absolute top-0 right-0 m-2">
                              <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
                                Intermediate
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold mb-1 text-gray-800">Data Visualization</h4>
                            <p className="text-sm text-gray-600 mb-3">Create interactive charts and visualizations</p>
                            <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800">
                              Start Learning
                            </Button>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300 border border-gray-100"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-green-900/20 flex items-center justify-center">
                              <Layers className="h-12 w-12 text-white" />
                            </div>
                            <div className="absolute top-0 right-0 m-2">
                              <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
                                Popular
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold mb-1 text-gray-800">Backend Development</h4>
                            <p className="text-sm text-gray-600 mb-3">Build RESTful APIs with Node.js and Express</p>
                            <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700">
                              Start Learning
                            </Button>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t">
                      <Button asChild variant="ghost" size="sm" className="ml-auto group">
                        <Link to="/learning">
                          Browse all courses
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            {/* Skills Tab Content */}
            <TabsContent value="skills">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      <CardTitle>Your Skills Proficiency</CardTitle>
                      <CardDescription className="text-blue-100">
                        Track and improve your technical expertise
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {userData.skills.map((skill, index) => (
                          <motion.div
                            key={index}
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-gray-800 flex items-center">
                                <span className="flex h-7 w-7 rounded-full bg-blue-100 mr-2 items-center justify-center">
                                  <Code className="h-3.5 w-3.5 text-blue-600" />
                                </span>
                                {skill.name}
                              </h4>
                              <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                                style={{ width: `${skill.level}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Beginner</span>
                              <span>Intermediate</span>
                              <span>Advanced</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t">
                      <Button asChild className="ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Link to="/skills">
                          Improve your skills
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            {/* Projects Tab Content */}
            <TabsContent value="projects">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                      <CardTitle>Your Projects</CardTitle>
                      <CardDescription className="text-purple-100">
                        Track your progress on development projects
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="divide-y">
                      <div className="space-y-6 py-6">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-800">Projects Overview</h3>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">2 Completed</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">1 In Progress</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">1 Planned</Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="border-2 border-green-200 shadow-md">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-md">Weather Dashboard</CardTitle>
                                <Badge className="bg-green-100 text-green-800">Completed</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 mb-3">A weather app that displays current weather and forecasts.</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="outline" className="bg-blue-50">React</Badge>
                                <Badge variant="outline" className="bg-blue-50">API</Badge>
                                <Badge variant="outline" className="bg-blue-50">CSS</Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">100% complete</span>
                                <Link to="#" className="text-blue-600 hover:underline">View Project</Link>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-2 border-yellow-200 shadow-md">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-md">Task Manager</CardTitle>
                                <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 mb-3">A full-stack task management application with authentication.</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="outline" className="bg-blue-50">React</Badge>
                                <Badge variant="outline" className="bg-blue-50">Node.js</Badge>
                                <Badge variant="outline" className="bg-blue-50">MongoDB</Badge>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Progress</span>
                                  <span>65%</span>
                                </div>
                                <Progress value={65} className="h-2">
                                  <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" style={{ width: '65%' }} />
                                </Progress>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-2 border-blue-200 shadow-md">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-md">E-commerce Site</CardTitle>
                                <Badge className="bg-blue-100 text-blue-800">Planned</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 mb-3">An online store with product listings, cart, and checkout.</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="outline" className="bg-blue-50">Next.js</Badge>
                                <Badge variant="outline" className="bg-blue-50">Stripe</Badge>
                                <Badge variant="outline" className="bg-blue-50">Tailwind</Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Not started</span>
                                <Button size="sm" variant="outline" className="h-7 rounded-full px-3 text-xs">Start Project</Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div className="py-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Project Activity</h3>
                        <DashboardProjectsList />
                      </div>
                    </CardContent>
                    <CardFooter className="border-t">
                      <Button asChild className="ml-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                        <Link to="/projects">
                          Start new project
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            {/* Learning Tab Content */}
            <TabsContent value="learning">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                      <CardTitle>Your Learning Journey</CardTitle>
                      <CardDescription className="text-green-100">
                        Track your progress on courses and tutorials
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <motion.div 
                          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-inner"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                              <div className="bg-green-100 p-2 rounded-lg mr-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              </div>
                              JavaScript Fundamentals
                            </h3>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              Completed
                            </Badge>
                          </div>
                          <div className="pl-12 space-y-3">
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Course progress</span>
                              <span className="font-medium">100%</span>
                            </div>
                            <Progress value={100} className="h-2">
                              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: '100%' }} />
                            </Progress>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2 text-gray-500">
                                <Calendar className="h-4 w-4" /> 
                                <span>Completed on June 5, 2023</span>
                              </div>
                              <Button size="sm" variant="outline" className="h-8 rounded-full">
                                View Certificate
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 shadow-inner"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                              <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                                <Clock className="h-5 w-5 text-yellow-600" />
                              </div>
                              React - The Complete Guide
                            </h3>
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                              In Progress
                            </Badge>
                          </div>
                          <div className="pl-12 space-y-3">
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Course progress</span>
                              <span className="font-medium">68%</span>
                            </div>
                            <Progress value={68} className="h-2">
                              <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" style={{ width: '68%' }} />
                            </Progress>
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2 text-gray-500">
                                <MessageSquare className="h-4 w-4" /> 
                                <span>Last module: Advanced Components</span>
                              </div>
                              <Button size="sm" className="h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600">
                                Continue Learning
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-inner"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                              </div>
                              Node.js API Development
                            </h3>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                              Started
                            </Badge>
                          </div>
                          <div className="pl-12 space-y-3">
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Course progress</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <Progress value={15} className="h-2">
                              <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" style={{ width: '15%' }} />
                            </Progress>
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2 text-gray-500">
                                <Calendar className="h-4 w-4" /> 
                                <span>Started on June 8, 2023</span>
                              </div>
                              <Button size="sm" className="h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                                Continue Course
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t">
                      <Button asChild className="ml-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        <Link to="/learning">
                          Browse all courses
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
