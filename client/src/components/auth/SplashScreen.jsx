import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, LogIn, Sun, Moon, Palette, Zap } from 'lucide-react';

import { useToast } from '../../hooks/use-toast';

const WelcomeScreen = ({ onLogin, onSignUp }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('auth-theme');
    return saved || 'light';
  });
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark' || theme === 'midnight' || theme === 'solid');
    localStorage.setItem('auth-theme', theme);
  }, [theme]);

  const handleLogin = () => {
    toast({
      type: 'info',
      message: 'Redirecting to login...',
      duration: 2000
    });
    setTimeout(() => onLogin(), 500);
  };

  const handleSignUp = () => {
    toast({
      type: 'info', 
      message: 'Redirecting to signup...',
      duration: 2000
    });
    setTimeout(() => onSignUp(), 500);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome</h1>
          <p className="text-white/80">Admin Dashboard</p>
        </motion.div>

        {/* Time Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="text-2xl font-mono text-white mb-1">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm text-white/60">
            {formatDate(currentTime)}
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
        >
          {/* Login Button */}
          <motion.button
            onClick={handleLogin}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </motion.button>

          {/* SignUp Button */}
          <motion.button
            onClick={handleSignUp}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-white/10 text-white font-semibold rounded-lg shadow-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 flex items-center justify-center space-x-2 border border-white/20"
          >
            <UserPlus className="w-5 h-5" />
            <span>Create New Account</span>
          </motion.button>
        </motion.div>

        {/* Powered by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8 pt-4 border-t border-white/20"
        >
          <p className="text-white/60 text-xs">Powered by</p>
          <p className="text-white/80 text-sm font-semibold">Primex Infotech</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;