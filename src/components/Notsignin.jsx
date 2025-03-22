import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export const Notsignin = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl p-10 text-center max-w-md mx-auto my-12 border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
      {/* Lottie Animation Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-full h-full">
          <DotLottieReact
            src="/animations/background-animation.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
      
      {/* Content - make sure it's above the background */}
      <div className="relative z-10">
        <div className="flex justify-center mb-6">
          <div className="text-6xl text-blue-500 bg-blue-100 p-5 rounded-full">
            <i className="fas fa-user-lock"></i>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4 text-gray-800 tracking-tight">You're Not Signed In</h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed max-w-sm mx-auto">
          Sign in to access personalized features, save your preferences, and enjoy a seamless experience.
        </p>
        
        <button 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          onClick={() => window.location.href = '/signin'}
        >
          Sign In
        </button>
        
        <div className="mt-8 text-sm text-gray-500 pt-4 border-t border-gray-100">
          Don't have an account? 
          <a href="/signup" className="text-blue-500 hover:text-blue-700 font-medium ml-1 transition-colors duration-200 hover:underline">
            Create Account
          </a>
        </div>
      </div>
    </div>
  )
}