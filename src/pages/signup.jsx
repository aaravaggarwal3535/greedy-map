import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Mail, User, Lock, CheckCircle } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const { fullName, email, password, confirmPassword } = formData;
    
    // Basic validation
    if (!fullName || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!agreeTerms) {
      setError('You must agree to the terms and privacy policy');
      return;
    }
    
    setIsLoading(true);
    
    // This would be where you connect to your authentication service
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Account created for:', email);
      
      // Redirect to success page or login
      navigate('/signin');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: 'bg-gray-200' };
    
    let strength = 0;
    if (password.length > 6) strength += 1;
    if (password.length > 10) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    if (strength < 2) return { strength: 1, text: 'Weak', color: 'bg-red-400' };
    if (strength < 4) return { strength: 2, text: 'Medium', color: 'bg-yellow-400' };
    return { strength: 3, text: 'Strong', color: 'bg-green-400' };
  };
  
  const passwordStrength = getPasswordStrength(formData.password);

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
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in instead
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
                <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="h-11 pl-10 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="h-11 pl-10 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="h-11 pl-10 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="h-1.5 w-full flex gap-1">
                        <div 
                          className={`h-full rounded flex-1 ${passwordStrength.strength >= 1 ? passwordStrength.color : 'bg-gray-200'}`}
                        />
                        <div 
                          className={`h-full rounded flex-1 ${passwordStrength.strength >= 2 ? passwordStrength.color : 'bg-gray-200'}`}
                        />
                        <div 
                          className={`h-full rounded flex-1 ${passwordStrength.strength >= 3 ? passwordStrength.color : 'bg-gray-200'}`}
                        />
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{passwordStrength.text}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-11 pl-10 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <CheckCircle className="absolute right-3 top-3.5 h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label 
                  htmlFor="agree-terms" 
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{' '}
                  <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r rounded-3xl from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm"
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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
                  className="h-11 border-gray-300 rounded-3xl bg-white text-gray-700 hover:bg-gray-50"
                >
                  <Mail className="mr-2  h-4 w-4" />
                  <span>Google</span>
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Signup;