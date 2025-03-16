import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';

// Note: We'll avoid using the Checkbox component for now
// import { Checkbox } from '@/components/ui/checkbox';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      // This is where you would handle real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      console.log('Signed in with:', email);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <div className="font-bold text-white text-2xl">G</div>
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            <p className="text-sm text-gray-600">
              Or{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center">
                  {/* Using standard HTML checkbox instead of custom Checkbox component */}
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label 
                    htmlFor="remember-me" 
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </Label>
                </div>
              </div>
            </div>

            <div className=" space-y-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-3xl bg-gradient-to-r  from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
              
              <div className="relative">
                <div className="absolute  inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 border-gray-300 bg-white rounded-3xl text-gray-700 hover:bg-gray-50"
                >
                  <Github className="mr-2 h-4 w-4" />
                  <span>GitHub</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 border-gray-300 bg-white rounded-3xl text-gray-700 hover:bg-gray-50"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Google</span>
                </Button>
              </div>
            </div>
          </form>
          
          <div className="text-center text-sm text-gray-600">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Signin;
