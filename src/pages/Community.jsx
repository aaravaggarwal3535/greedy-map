import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { FaThumbsUp, FaThumbsDown, FaFlag, FaReply, FaImage, FaHashtag, FaSearch, FaBell, FaCode, FaDatabase, FaGamepad, FaMobile, FaCloud, FaStar, FaPlus, FaTimes } from 'react-icons/fa';

const Community = () => {
  // Enhanced community categories
  const [communities, setCommunities] = useState([
    { id: 'frontend', name: 'Frontend', icon: <FaCode />, active: true },
    { id: 'backend', name: 'Backend', icon: <FaDatabase />, active: false },
    { id: 'blockchain', name: 'Blockchain', icon: <FaHashtag />, active: false },
    { id: 'aiml', name: 'AI/ML', icon: <FaCloud />, active: false },
    { id: 'mobile', name: 'Mobile Dev', icon: <FaMobile />, active: false },
    { id: 'devops', name: 'DevOps', icon: <FaCloud />, active: false },
    { id: 'gaming', name: 'Game Dev', icon: <FaGamepad />, active: false },
    { id: 'career', name: 'Career', icon: <FaStar />, active: false },
  ]);

  const [posts, setPosts] = useState({
    frontend: [
      {
        id: 1,
        author: 'Sarah Chen',
        role: 'Frontend Developer',
        content: 'What\'s your favorite React state management library in 2025?',
        upvotes: 24,
        downvotes: 3,
        timestamp: '2 hours ago',
        replies: [
          {
            id: 101,
            author: 'Mike Johnson',
            role: 'Senior UI Engineer',
            content: 'Still loving Redux Toolkit for complex apps, but Zustand for simpler projects!',
            upvotes: 12,
            downvotes: 0,
            timestamp: '1 hour ago'
          }
        ]
      }
    ],
    backend: [],
    blockchain: [],
    aiml: [],
    mobile: [],
    devops: [],
    gaming: [],
    career: [],
  });

  const [activeTab, setActiveTab] = useState('frontend');
  const [newPost, setNewPost] = useState('');
  const [replyContent, setReplyContent] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Enhanced animation states
  const [isPostInputExpanded, setIsPostInputExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const textareaRef = useRef(null);
  
  // User info - would come from auth context in a real app
  const currentUser = {
    name: 'Jamie Smith',
    role: 'Full Stack Developer'
  };

  // Your existing handlers
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    const newPostObj = {
      id: Date.now(),
      author: currentUser.name,
      role: currentUser.role,
      content: newPost,
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
      upvotes: 0,
      downvotes: 0,
      timestamp: 'Just now',
      replies: []
    };

    setPosts(prev => ({
      ...prev,
      [activeTab]: [newPostObj, ...prev[activeTab]]
    }));
    
    setNewPost('');
    setSelectedFile(null);
    
    // Close with animation
    closePostInput();
  };

  const handleReplySubmit = (postId) => {
    if (!replyContent[postId]?.trim()) return;
    
    const newReply = {
      id: Date.now(),
      author: currentUser.name,
      role: currentUser.role,
      content: replyContent[postId],
      upvotes: 0,
      downvotes: 0,
      timestamp: 'Just now'
    };

    setPosts(prev => {
      const updatedPosts = {...prev};
      const postIndex = updatedPosts[activeTab].findIndex(post => post.id === postId);
      
      if (postIndex !== -1) {
        updatedPosts[activeTab][postIndex].replies = [
          newReply,
          ...updatedPosts[activeTab][postIndex].replies
        ];
      }
      
      return updatedPosts;
    });
    
    setReplyContent(prev => ({...prev, [postId]: ''}));
    setReplyingTo(null);
  };

  const handleVote = (postId, replyId = null, isUpvote) => {
    setPosts(prev => {
      const updatedPosts = {...prev};
      
      if (replyId) {
        // Voting on a reply
        const postIndex = updatedPosts[activeTab].findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          const replyIndex = updatedPosts[activeTab][postIndex].replies.findIndex(reply => reply.id === replyId);
          if (replyIndex !== -1) {
            const voteType = isUpvote ? 'upvotes' : 'downvotes';
            updatedPosts[activeTab][postIndex].replies[replyIndex][voteType] += 1;
          }
        }
      } else {
        // Voting on a post
        const postIndex = updatedPosts[activeTab].findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          const voteType = isUpvote ? 'upvotes' : 'downvotes';
          updatedPosts[activeTab][postIndex][voteType] += 1;
        }
      }
      
      return updatedPosts;
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleReport = (postId, replyId = null) => {
    alert(`Reported ${replyId ? 'reply' : 'post'}. In a real app, this would send a report to moderators.`);
  };

  // Filter posts based on search
  const filteredPosts = posts[activeTab].filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Enhanced animation functions
  const openPostInput = () => {
    if (isPostInputExpanded || isAnimating) return;
    
    setIsAnimating(true);
    setIsPostInputExpanded(true);
    
    // Focus the textarea after animation completes
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      setIsAnimating(false);
    }, 400);
  };
  
  const closePostInput = () => {
    if (!isPostInputExpanded || isAnimating) return;
    
    setIsAnimating(true);
    setIsPostInputExpanded(false);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left sidebar - Categories (Discord style with refined styling) */}
        <div className="w-64 bg-gray-900 text-white flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-bold text-gray-100">Communities</h2>
          </div>
          
          <div className="py-3 px-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {communities.map((community) => (
              <button
                key={community.id}
                onClick={() => handleTabChange(community.id)}
                className={`flex items-center w-full px-4 py-2.5 mb-0.5 rounded-md text-left transition-all ${
                  activeTab === community.id 
                    ? "bg-indigo-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-3 text-lg opacity-80">{community.icon}</span>
                <span className="text-sm font-medium">{community.name}</span>
                {posts[community.id].length > 0 && (
                  <span className="ml-auto bg-gray-700 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {posts[community.id].length}
                  </span>
                )}
              </button>
            ))}
            
            <button className="flex items-center w-full px-4 py-2.5 mt-3 rounded-md text-left text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <FaPlus className="mr-3 text-sm" />
              <span className="text-sm">Request New Community</span>
            </button>
          </div>
          
          <div className="p-4 border-t border-gray-800 bg-gray-850">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                {currentUser.name.charAt(0)}
              </div>
              <div className="ml-3">
                <div className="text-sm font-semibold text-gray-200">{currentUser.name}</div>
                <div className="text-xs text-gray-400">{currentUser.role}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area with refined styling */}
        <div className="flex-1 flex flex-col bg-gray-50 relative">
          {/* Channel header */}
          <div className="bg-white shadow-sm border-b border-gray-200 p-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">
                <FaHashtag />
              </span>
              <h2 className="font-medium text-gray-800">{communities.find(c => c.id === activeTab)?.name}</h2>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-100 rounded-md w-56 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                <FaBell />
              </button>
            </div>
          </div>
          
          {/* Message list - with increased bottom padding for expandable input */}
          <div className="flex-1 overflow-y-auto p-4 pb-24">
            <div className="space-y-5 max-w-3xl mx-auto">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-medium shadow-sm">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-semibold text-gray-900">{post.author}</div>
                            <div className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                              {post.role}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">{post.timestamp}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-gray-800 mb-4 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                        
                        {post.image && (
                          <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                            <img 
                              src={post.image} 
                              alt="Post attachment" 
                              className="max-h-96 w-full object-contain bg-gray-900"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-gray-600 mt-4">
                        <button 
                          onClick={() => handleVote(post.id, null, true)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                            post.upvotes > 0 ? "text-indigo-600 bg-indigo-50" : "hover:bg-gray-100"
                          }`}
                        >
                          <FaThumbsUp className="text-sm" /> <span className="text-sm">{post.upvotes}</span>
                        </button>
                        <button 
                          onClick={() => handleVote(post.id, null, false)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                            post.downvotes > 0 ? "text-red-600 bg-red-50" : "hover:bg-gray-100"
                          }`}
                        >
                          <FaThumbsDown className="text-sm" /> <span className="text-sm">{post.downvotes}</span>
                        </button>
                        <button 
                          onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                            replyingTo === post.id ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"
                          }`}
                        >
                          <FaReply className="text-sm" /> <span className="text-sm">Reply</span>
                        </button>
                        <button 
                          onClick={() => handleReport(post.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-100 ml-auto transition-colors"
                        >
                          <FaFlag className="text-sm" /> <span className="text-sm">Report</span>
                        </button>
                      </div>
                      
                      {replyingTo === post.id && (
                        <div className="mt-4 pl-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                              {currentUser.name.charAt(0)}
                            </div>
                            <div className="text-sm font-medium">{currentUser.name}</div>
                            <div className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">
                              {currentUser.role}
                            </div>
                          </div>
                          <textarea
                            value={replyContent[post.id] || ''}
                            onChange={(e) => setReplyContent({...replyContent, [post.id]: e.target.value})}
                            placeholder="Write a reply..."
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows={2}
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={() => handleReplySubmit(post.id)}
                              className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {post.replies.length > 0 && (
                      <div className="bg-gray-50 p-5 border-t border-gray-200">
                        <div className="space-y-4">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                                {reply.author.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="font-medium text-sm text-gray-900">{reply.author}</div>
                                  <div className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">
                                    {reply.role}
                                  </div>
                                  <div className="text-xs text-gray-500 ml-auto">{reply.timestamp}</div>
                                </div>
                                <p className="text-sm text-gray-800 mb-2">{reply.content}</p>
                                <div className="flex items-center gap-3 text-gray-600 text-sm">
                                  <button 
                                    onClick={() => handleVote(post.id, reply.id, true)}
                                    className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                                      reply.upvotes > 0 ? "text-indigo-600" : "hover:bg-gray-200"
                                    }`}
                                  >
                                    <FaThumbsUp size={12} /> <span>{reply.upvotes}</span>
                                  </button>
                                  <button 
                                    onClick={() => handleVote(post.id, reply.id, false)}
                                    className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                                      reply.downvotes > 0 ? "text-red-600" : "hover:bg-gray-200"
                                    }`}
                                  >
                                    <FaThumbsDown size={12} /> <span>{reply.downvotes}</span>
                                  </button>
                                  <button 
                                    onClick={() => handleReport(post.id, reply.id)}
                                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 ml-auto transition-colors"
                                  >
                                    <FaFlag size={12} /> <span>Report</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
                  <p className="text-gray-500">
                    {searchQuery 
                      ? "No posts match your search criteria." 
                      : `Be the first to post in the ${communities.find(c => c.id === activeTab)?.name} community!`}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Simplified bottom post input - always visible input box */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out transform">
            <div className="p-3 flex items-center">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm mr-3">
                {currentUser.name.charAt(0)}
              </div>
              
              <form onSubmit={handlePostSubmit} className="flex-1 flex items-center">
                <div className="relative flex-1 flex items-center">
                  <input
                    type="text"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    onClick={() => !isPostInputExpanded && openPostInput()}
                    placeholder={`Share your thoughts with ${communities.find(c => c.id === activeTab)?.name}...`}
                    className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white border border-transparent focus:border-indigo-300"
                  />
                  
                  <div className="absolute right-2 flex items-center space-x-1">
                    <label className="cursor-pointer p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
                      <FaImage size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!newPost.trim()}
                  className={`ml-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    newPost.trim() 
                      ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Post
                </button>
              </form>
            </div>
            
            {/* Show selected image preview if any */}
            {selectedFile && (
              <div className="px-4 pb-3 flex items-center">
                <div className="flex-1 flex items-center bg-green-50 text-green-800 text-sm py-1 px-3 rounded-md">
                  <div className="flex-shrink-0 w-6 h-6 mr-2 bg-gray-200 rounded overflow-hidden">
                    {/* Preview thumbnail */}
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="truncate">{selectedFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;

// Add this to your global CSS or create a tailwind.config.js plugin
// These animations will make the UI feel more fluid
/* 
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
  */
