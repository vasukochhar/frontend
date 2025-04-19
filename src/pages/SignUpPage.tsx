import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Lock, User, X, Twitter, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors: {
      email?: string;
      username?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    if (!email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!username) {
      formErrors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      formErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Character type checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return Math.min(strength, 4);
  };

  const renderPasswordStrength = () => {
    const strength = getPasswordStrength();
    const colors = [
      'bg-error',
      'bg-error', 
      'bg-yellow-500',
      'bg-green-500',
      'bg-green-600'
    ];
    const labels = [
      '',
      'Weak',
      'Fair',
      'Good',
      'Strong'
    ];
    
    return (
      <div className="mt-1">
        <div className="flex gap-1 mb-1">
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              className={`h-1 flex-1 rounded-full ${
                strength > index ? colors[strength] : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
        {password && (
          <p className={`text-xs ${
            strength <= 1 ? 'text-error' :
            strength === 2 ? 'text-yellow-500' :
            'text-green-500'
          }`}>
            {labels[strength]}
          </p>
        )}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await signup(email, password, username);
      toast.success('Account created successfully!');
      navigate('/home');
    } catch (error) {
      toast.error('Failed to create an account. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary screentone-pattern">
      <Navbar />
      
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-container rounded-lg shadow-custom overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold gradient-text">Create an account</h1>
                <p className="text-text-secondary mt-2">Join Shikimanga and start colorizing!</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign size={16} className="text-gray-500" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`input pl-10 ${errors.email ? 'border-error' : ''}`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-error flex items-center">
                      <X size={12} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-500" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`input pl-10 ${errors.username ? 'border-error' : ''}`}
                      placeholder="Choose a username"
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-xs text-error flex items-center">
                      <X size={12} className="mr-1" />
                      {errors.username}
                    </p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-500" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`input pl-10 ${errors.password ? 'border-error' : ''}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {renderPasswordStrength()}
                  {errors.password && (
                    <p className="mt-1 text-xs text-error flex items-center">
                      <X size={12} className="mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-500" />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`input pl-10 ${errors.confirmPassword ? 'border-error' : ''}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-error flex items-center">
                      <X size={12} className="mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="w-full btn btn-primary flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="spinner !w-5 !h-5 border-white border-t-transparent" />
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-container px-2 text-text-secondary">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="btn btn-secondary flex items-center justify-center">
                    <Twitter size={16} className="mr-2" />
                    X
                  </button>
                  <button className="btn btn-secondary flex items-center justify-center">
                    <Github size={16} className="mr-2" />
                    GitHub
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-8 py-4 bg-background text-center">
              <p className="text-text-secondary text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignUpPage;