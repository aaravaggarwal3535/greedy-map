import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });
  
  const onSubmit = async (data) => {
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Sign in failed');
      }
      
      console.log('Signed in successfully:', responseData);
      
      // Store user data in localStorage with correct keys
      localStorage.setItem('userId', responseData.id);
      localStorage.setItem('userName', responseData.fullName);
      localStorage.setItem('userEmail', responseData.email);
      
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
      console.error('Sign in error:', err);
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
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    className="h-11 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
                    type="password"
                    autoComplete="current-password"
                    className="h-11 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    {...register("rememberMe")}
                  />
                  <Label 
                    htmlFor="rememberMe" 
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
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
