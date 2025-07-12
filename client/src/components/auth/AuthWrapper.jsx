
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import WelcomeScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import AdminLayout from '../layout/AdminLayout';

const AuthWrapper = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome', 'login', 'signup'
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen overflow-hidden">
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onLogin={() => setCurrentScreen('login')}
            onSignUp={() => setCurrentScreen('signup')}
          />
        )}
        {currentScreen === 'login' && (
          <LoginScreen onBack={() => setCurrentScreen('welcome')} />
        )}
        {currentScreen === 'signup' && (
          <LoginScreen onBack={() => setCurrentScreen('welcome')} />
        )}
      </div>
    );
  }

  // User is authenticated, render the admin layout
  return <AdminLayout />;
};

export default AuthWrapper;
