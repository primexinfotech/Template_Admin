import { useState } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Palette, 
  ChevronDown,
  Coins,
  Menu,
  LogOut
} from 'lucide-react';

const Header = ({ onThemeToggle }) => {
  const { isCollapsed, toggleSidebar, isMobile } = useSidebar();
  const { compactMode } = useTheme();
  const { user, logout } = useAuth();
  const [notifications] = useState(3);

  return (
    <motion.header 
      initial={{ marginLeft: isMobile ? '0' : (isCollapsed ? '64px' : '256px') }}
      animate={{ marginLeft: isMobile ? '0' : (isCollapsed ? '64px' : '256px') }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30"
    >
      <div className={`flex items-center justify-between ${compactMode ? 'px-3 py-1.5' : 'px-4 md:px-6 py-2'}`}>
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar - Hidden on mobile, shown on tablet+ */}
        <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8">
          <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden max-w-md w-full transition-all duration-300 hover:shadow-xl hover:scale-105 focus-within:shadow-xl focus-within:scale-105 focus-within:border-blue-400 dark:focus-within:border-blue-500">
            <select className="px-3 py-2 text-sm border-0 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-0 focus:outline-none min-w-0 flex-shrink-0 rounded-l-full transition-colors duration-200">
              <option value="awb" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-1">AWB ID</option>
              <option value="order" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-1">Order ID</option>
              <option value="rth" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-1">RTH ID</option>
              <option value="mobile" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-1">Mobile No</option>
              <option value="ndr" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-1">NDR</option>
              <option value="name" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-1">Name</option>
            </select>
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-600"></div>
            <input 
              type="text" 
              placeholder="Search by AWB ID" 
              className="flex-1 px-3 py-2 text-sm border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-r-full transition-colors duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          {/* Credits - Hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg">
            <Coins className="w-4 h-4" />
            <span className="text-sm font-medium">Credits: 1,247</span>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors touch-manipulation min-h-[44px]">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block text-sm text-gray-700 dark:text-gray-300">{user?.name || 'John Doe'}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation min-h-[44px]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={onThemeToggle}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Palette className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;