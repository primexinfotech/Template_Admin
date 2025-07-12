
import React, { useState } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  BarChart3, 
  CreditCard, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  Zap,
  Shield
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    title: 'Orders',
    icon: Package,
    path: '/orders',
  },
  {
    title: 'Shipments',
    icon: Truck,
    path: '/shipments',
    submenu: [
      { title: 'All Shipments', path: '/shipments' },
      { title: 'In Transit', path: '/shipments/transit' },
      { title: 'Delivered', path: '/shipments/delivered' },
    ],
  },
  {
    title: 'Customers',
    icon: Users,
    path: '/customers',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
    submenu: [
      { title: 'Overview', path: '/analytics' },
      { title: 'Sales Report', path: '/analytics/sales' },
      { title: 'Customer Insights', path: '/analytics/customers' },
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
  },
];

function Sidebar() {
  const { isCollapsed, isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { theme } = useTheme();
  const [location] = useLocation();
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (itemTitle) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemTitle)) {
      newExpanded.delete(itemTitle);
    } else {
      newExpanded.add(itemTitle);
    }
    setExpandedItems(newExpanded);
  };

  const sidebarClasses = `
    fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
    ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Admin
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-1 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden p-1 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigationItems.map((item) => (
            <div key={item.title}>
              <div className="flex items-center">
                <Link href={item.path}>
                  <a
                    className={`
                      flex items-center w-full p-2 rounded-lg transition-colors
                      ${location === item.path || location.startsWith(item.path + '/') 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                    {!isCollapsed && <span className="font-medium">{item.title}</span>}
                  </a>
                </Link>

                {item.submenu && !isCollapsed && (
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className="p-1 ml-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {expandedItems.has(item.title) ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </button>
                )}
              </div>

              {/* Submenu */}
              {item.submenu && !isCollapsed && (
                <AnimatePresence>
                  {expandedItems.has(item.title) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-8 mt-2 space-y-1"
                    >
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.path} href={subItem.path}>
                          <a
                            className={`
                              block p-2 rounded-lg text-sm transition-colors
                              ${location === subItem.path 
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                              }
                            `}
                          >
                            {subItem.title}
                          </a>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
