import React from 'react'

export const Notsignin = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto my-8">
      <div className="text-5xl text-gray-500 mb-4">
        <i className="fas fa-user-lock"></i> {/* You may need to add FontAwesome or another icon library */}
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">You're Not Signed In</h2>
      <p className="text-gray-500 mb-6 leading-relaxed">
        Sign in to access personalized features, save your preferences, and track your activity.
      </p>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded transition-colors duration-300 focus:outline-none"
        onClick={() => window.location.href = '/signin'}
      >
        Sign In
      </button>
      <p className="mt-4 text-sm text-gray-500">
        Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Register</a>
      </p>
    </div>
  )
}