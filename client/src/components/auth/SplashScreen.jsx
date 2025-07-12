import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  LogIn, 
  User,
  Sun,
  Moon,
  Palette
} from 'lucide-react';
import { toast } from '../ui/Toast';

const BackgroundAnimation = React.memo(({ theme }) => {
  const backgroundElements = useMemo(() => ({
    smallElements: [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1,
    })),
    mediumElements: [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 15 + 8,
    })),
    largeElements: [...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 120 + 60,
    })),
    imageElements: [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 25 + 20,
    })),
  }), []);

  return (
    <div className="absolute inset-0">
      {/* Small particle elements */}
      {backgroundElements.smallElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full backdrop-blur-sm"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: theme === 'midnight' 
              ? 'radial-gradient(circle at 50% 30%, rgba(255,140,0,0.3), rgba(220,20,60,0.2))'
              : theme === 'dark'
                ? 'radial-gradient(circle at 50% 30%, rgba(139,92,246,0.4), rgba(59,130,246,0.25))'
                : theme === 'solid'
                  ? 'radial-gradient(circle at 50% 30%, rgba(59,130,246,0.35), rgba(16,185,129,0.2))'
                  : 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.4), rgba(59,130,246,0.25))',
          }}
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.3, 0.8, 0.3],
            y: [0, -25, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6 + element.id * 0.2,
            repeat: Infinity,
            delay: element.id * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Medium bubble elements */}
      {backgroundElements.mediumElements.map((element) => (
        <motion.div
          key={`medium-${element.id}`}
          className="absolute rounded-full backdrop-blur-md border"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: theme === 'midnight' 
              ? 'radial-gradient(circle at 30% 30%, rgba(255,140,0,0.25), rgba(220,20,60,0.15), rgba(139,0,0,0.1))'
              : theme === 'dark'
                ? 'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.3), rgba(59,130,246,0.2), rgba(16,185,129,0.1))'
                : theme === 'solid'
                  ? 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.25), rgba(16,185,129,0.15), rgba(100,116,139,0.1))'
                  : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), rgba(59,130,246,0.15), rgba(16,185,129,0.1))',
            borderColor: theme === 'midnight' 
              ? 'rgba(255,140,0,0.3)'
              : theme === 'dark'
                ? 'rgba(139,92,246,0.4)'
                : theme === 'solid'
                  ? 'rgba(59,130,246,0.3)'
                  : 'rgba(255,255,255,0.3)',
            aspectRatio: '1/1',
          }}
          animate={{
            x: [0, 15, -8, 0],
            y: [0, -20, 12, 0],
            scale: [0.9, 1.2, 0.9],
            opacity: [0.4, 0.9, 0.4],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 8 + element.id * 1.2,
            repeat: Infinity,
            delay: element.id * 1.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Large bubble elements */}
      {backgroundElements.largeElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full backdrop-blur-md border"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: theme === 'midnight' 
              ? 'radial-gradient(circle at 20% 20%, rgba(255,140,0,0.12), rgba(220,20,60,0.08), rgba(139,0,0,0.04))'
              : theme === 'dark'
                ? 'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.15), rgba(59,130,246,0.1), rgba(16,185,129,0.05))'
                : theme === 'solid'
                  ? 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.12), rgba(16,185,129,0.08), rgba(100,116,139,0.04))'
                  : 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), rgba(59,130,246,0.08), rgba(16,185,129,0.04))',
            borderColor: theme === 'midnight' 
              ? 'rgba(255,140,0,0.15)'
              : theme === 'dark'
                ? 'rgba(139,92,246,0.2)'
                : theme === 'solid'
                  ? 'rgba(59,130,246,0.15)'
                  : 'rgba(255,255,255,0.15)',
          }}
          animate={{
            x: [0, 35, -25, 0],
            y: [0, -45, 25, 0],
            scale: [1, 1.15, 0.85, 1],
            rotate: [0, 180, 360],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 15 + element.id * 2.5,
            repeat: Infinity,
            delay: element.id * 1.8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Perfect circle bubbles */}
      {backgroundElements.imageElements.map((element) => (
        <motion.div
          key={`circle-${element.id}`}
          className="absolute rounded-full backdrop-blur-sm border shadow-lg"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: theme === 'midnight' 
              ? 'radial-gradient(circle at 30% 30%, rgba(255,140,0,0.35), rgba(220,20,60,0.25), rgba(139,0,0,0.15))'
              : theme === 'dark'
                ? 'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.4), rgba(59,130,246,0.3), rgba(16,185,129,0.2))'
                : theme === 'solid'
                  ? 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.35), rgba(16,185,129,0.25), rgba(100,116,139,0.15))'
                  : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), rgba(59,130,246,0.25), rgba(16,185,129,0.15))',
            borderColor: theme === 'midnight' 
              ? 'rgba(255,140,0,0.4)'
              : theme === 'dark'
                ? 'rgba(139,92,246,0.5)'
                : theme === 'solid'
                  ? 'rgba(59,130,246,0.4)'
                  : 'rgba(255,255,255,0.4)',
            aspectRatio: '1/1',
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -25, 15, 0],
            scale: [0.8, 1.1, 0.9, 0.8],
            opacity: [0.4, 0.8, 0.5, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12 + element.id * 1.5,
            repeat: Infinity,
            delay: element.id * 1.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

const AnimatedGradientBackground = React.memo(({ theme }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {theme === 'solid' && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
      )}
      
      {theme === 'midnight' && (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(139,0,0,0.3) 40%, rgba(255,140,0,0.15) 100%)',
                'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(75,0,130,0.2) 45%, rgba(220,20,60,0.12) 100%)',
                'linear-gradient(225deg, rgba(15,15,15,1) 0%, rgba(139,69,19,0.25) 42%, rgba(255,69,0,0.13) 100%)',
                'linear-gradient(315deg, rgba(5,5,5,1) 0%, rgba(139,0,0,0.28) 43%, rgba(255,140,0,0.14) 100%)'
              ]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tl from-transparent via-red-900/8 to-orange-600/6"
            animate={{
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
      
      {theme === 'dark' && (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(15,23,42,1) 0%, rgba(88,28,135,0.4) 45%, rgba(49,46,129,0.25) 100%)',
                'linear-gradient(135deg, rgba(30,41,59,1) 0%, rgba(139,92,246,0.35) 48%, rgba(16,185,129,0.2) 100%)',
                'linear-gradient(225deg, rgba(15,23,42,1) 0%, rgba(124,58,237,0.4) 46%, rgba(59,130,246,0.22) 100%)',
                'linear-gradient(315deg, rgba(30,41,59,1) 0%, rgba(88,28,135,0.38) 47%, rgba(49,46,129,0.24) 100%)'
              ]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-600/8 to-blue-600/6"
            animate={{
              rotate: [0, -360],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
      
      {theme === 'light' && (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(37,99,235,1) 0%, rgba(29,78,216,0.9) 45%, rgba(30,64,175,0.7) 100%)',
                'linear-gradient(135deg, rgba(59,130,246,1) 0%, rgba(37,99,235,0.95) 48%, rgba(29,78,216,0.75) 100%)',
                'linear-gradient(225deg, rgba(29,78,216,1) 0%, rgba(30,64,175,0.9) 46%, rgba(37,99,235,0.72) 100%)',
                'linear-gradient(315deg, rgba(37,99,235,1) 0%, rgba(29,78,216,0.92) 47%, rgba(30,64,175,0.73) 100%)'
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tl from-transparent via-cyan-500/12 to-blue-400/8"
            animate={{
              rotate: [0, 360],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
    </div>
  );
});

const WelcomeScreen = ({ onLogin, onSignUp }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('auth-theme');
    return saved || 'light';
  });

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
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground theme={theme} />
      
      {/* Simplified background animation for mobile */}
      <div className="hidden md:block">
        <BackgroundAnimation theme={theme} />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4 px-2 sm:px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
          className={`backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border relative will-change-transform ${
            theme === 'solid'
              ? 'bg-slate-800/90 border-slate-600/60'
              : theme === 'midnight' 
                ? 'bg-black/60 border-gray-700/50' 
                : theme === 'dark' 
                  ? 'bg-slate-800/50 border-slate-600/40' 
                  : 'bg-white/25 border-white/30'
          }`}
        >

          {/* User Avatar with Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex justify-center mb-4 sm:mb-6"
          >
            <motion.div
              animate={{
                borderColor: theme === 'solid'
                  ? ['rgba(100,116,139,0.6)', 'rgba(59,130,246,0.8)', 'rgba(16,185,129,0.7)', 'rgba(236,72,153,0.6)', 'rgba(100,116,139,0.6)']
                  : theme === 'midnight'
                    ? ['rgba(139,69,19,0.6)', 'rgba(255,69,0,0.8)', 'rgba(255,140,0,0.7)', 'rgba(220,20,60,0.6)', 'rgba(139,69,19,0.6)']
                    : theme === 'dark' 
                      ? ['rgba(148,163,184,0.4)', 'rgba(139,92,246,0.7)', 'rgba(16,185,129,0.7)', 'rgba(248,113,113,0.7)', 'rgba(148,163,184,0.4)']
                      : ['rgba(255,255,255,0.3)', 'rgba(59,130,246,0.6)', 'rgba(16,185,129,0.6)', 'rgba(239,68,68,0.6)', 'rgba(255,255,255,0.3)']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 ${
                theme === 'solid' ? 'bg-slate-600/40' : theme === 'midnight' ? 'bg-gray-900/40' : theme === 'dark' ? 'bg-slate-700/30' : 'bg-white/20'
              }`}
            >
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Company Name and Date/Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-white text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Welcome Back</h1>

            {/* Date and Time Display */}
            <div className="mb-4">
              <div className="text-white text-2xl sm:text-3xl font-bold mb-1">
                {formatTime(currentTime)}
              </div>
              <div className="text-white/80 text-xs sm:text-sm">
                {formatDate(currentTime)}
              </div>
            </div>
          </motion.div>



          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            {/* Login Button */}
            <motion.button
              onClick={handleLogin}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 flex items-center justify-center space-x-2 touch-manipulation text-sm sm:text-base"
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Login to Account</span>
            </motion.button>

            {/* SignUp Button */}
            <motion.button
              onClick={handleSignUp}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-3 bg-white/10 text-white font-semibold rounded-lg shadow-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 flex items-center justify-center space-x-2 border border-white/20 touch-manipulation text-sm sm:text-base"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Create New Account</span>
            </motion.button>
          </motion.div>

          {/* Powered by */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className={`text-center mt-6 sm:mt-8 pt-4 border-t transition-all duration-700 ${
              theme === 'solid' ? 'border-slate-600/50' : theme === 'midnight' ? 'border-gray-700/40' : theme === 'dark' ? 'border-slate-600/30' : 'border-white/20'
            }`}
          >
            <p className="text-white/60 text-xs">Powered by</p>
            <p className="text-white/80 text-sm font-semibold">Primex Infotech</p>
          </motion.div>
        </motion.div>

        {/* Theme Selector at bottom of main container */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="flex flex-row justify-center gap-2 sm:gap-3 mt-6"
        >
        {/* Light Theme */}
        <motion.button
          onClick={() => setTheme('light')}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-2xl backdrop-blur-md border transition-colors duration-300 touch-manipulation flex items-center justify-center ${
            theme === 'light' 
              ? 'bg-blue-500/80 border-blue-300/50' 
              : 'bg-white/20 hover:bg-white/30 border-white/30'
          }`}
        >
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.button>

        {/* Dark Theme */}
        <motion.button
          onClick={() => setTheme('dark')}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-2xl backdrop-blur-md border transition-colors duration-300 touch-manipulation flex items-center justify-center ${
            theme === 'dark' 
              ? 'bg-purple-600/80 border-purple-400/50' 
              : theme === 'midnight'
                ? 'bg-gray-800/40 hover:bg-gray-700/50 border-gray-600/30'
                : 'bg-white/20 hover:bg-white/30 border-white/30'
          }`}
        >
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.button>

        {/* Midnight Theme */}
        <motion.button
          onClick={() => setTheme('midnight')}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-2xl backdrop-blur-md border transition-colors duration-300 touch-manipulation flex items-center justify-center ${
            theme === 'midnight' 
              ? 'bg-gradient-to-r from-red-900/80 to-orange-900/80 border-red-700/50' 
              : theme === 'dark' || theme === 'solid'
                ? 'bg-slate-800/40 hover:bg-slate-700/50 border-slate-600/30'
                : 'bg-white/20 hover:bg-white/30 border-white/30'
          }`}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-full"></div>
        </motion.button>

        {/* Solid Theme */}
        <motion.button
          onClick={() => setTheme('solid')}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-2xl backdrop-blur-md border transition-colors duration-300 touch-manipulation flex items-center justify-center ${
            theme === 'solid' 
              ? 'bg-slate-600/80 border-slate-400/50' 
              : theme === 'dark' || theme === 'midnight'
                ? 'bg-slate-800/40 hover:bg-slate-700/50 border-slate-600/30'
                : 'bg-white/20 hover:bg-white/30 border-white/30'
          }`}
        >
          <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;