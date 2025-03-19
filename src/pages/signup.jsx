import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  });
  
  const password = watch('password');
  
  const onSubmit = async (data) => {
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password
        }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Sign up failed');
      }
      
      console.log('Account created successfully:', responseData);
      
      // Store user data in localStorage with correct keys
      localStorage.setItem('userId', responseData.id);
      localStorage.setItem('userName', responseData.fullName); // Already correct
      localStorage.setItem('userEmail', responseData.email);
      
      navigate('/'); // Navigate to home since we're already logged in
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
      console.error('Sign up error:', err);
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
  
  const passwordStrength = getPasswordStrength(password);

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
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    className="h-11 pl-10 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register("fullName", { 
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      } 
                    })}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                  )}
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
                    type="email"
                    autoComplete="email"
                    placeholder="john@example.com"
                    className="h-11 pl-10 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register("email", { 
                      required: "Email is required", 
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address"
                      } 
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
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
                    type="password"
                    className="h-11 pl-10 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
                {password && (
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
                    type="password"
                    className="h-11 pl-10 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: value => 
                        value === password || "Passwords do not match"
                    })}
                  />
                  {password && watch('confirmPassword') && password === watch('confirmPassword') && (
                    <CheckCircle className="absolute right-3 top-3.5 h-4 w-4 text-green-500" />
                  )}
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...register("agreeTerms", {
                    required: "You must agree to the terms and privacy policy"
                  })}
                />
                <Label 
                  htmlFor="agreeTerms" 
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
                {errors.agreeTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.agreeTerms.message}</p>
                )}
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
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Signup;