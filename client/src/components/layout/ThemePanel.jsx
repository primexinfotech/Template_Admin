import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon } from 'lucide-react';

const ThemePanel = ({ isOpen, onClose }) => {
  const {
    theme,
    sidebarColor,
    navbarColor,
    navbarVisible,
    fontSize,
    borderRadius,
    animationsEnabled,
    compactMode,
    sidebarFixed,
    updateTheme,
    updateSidebarColor,
    updateNavbarColor,
    toggleNavbarVisible,
    updateFontSize,
    updateBorderRadius,
    toggleAnimations,
    toggleCompactMode,
    toggleSidebarFixed,
    resetToDefault,
  } = useTheme();

  const sidebarColors = [
    { name: 'blue', class: 'bg-blue-600', label: 'Blue' },
    { name: 'cyan', class: 'bg-cyan-600', label: 'Cyan' },
    { name: 'emerald', class: 'bg-emerald-600', label: 'Emerald' },
    { name: 'purple', class: 'bg-purple-600', label: 'Purple' },
    { name: 'orange', class: 'bg-orange-600', label: 'Orange' },
    { name: 'pink', class: 'bg-pink-600', label: 'Pink' },
    { name: 'indigo', class: 'bg-indigo-600', label: 'Indigo' },
    { name: 'slate', class: 'bg-slate-600', label: 'Slate' },
  ];

  const themePresets = [
    { 
      name: 'light', 
      label: 'Light', 
      icon: Sun,
      theme: 'light',
      sidebarColor: 'blue',
      navbarColor: 'white',
      colors: ['#3B82F6', '#F8FAFC', '#1E293B']
    },
    { 
      name: 'dark', 
      label: 'Dark', 
      icon: Moon,
      theme: 'dark',
      sidebarColor: 'slate',
      navbarColor: 'dark',
      colors: ['#1E293B', '#0F172A', '#64748B']
    },
    { 
      name: 'ocean', 
      label: 'Ocean', 
      icon: Moon,
      theme: 'light',
      sidebarColor: 'cyan',
      navbarColor: 'colored',
      colors: ['#06B6D4', '#0891B2', '#164E63']
    },
    { 
      name: 'forest', 
      label: 'Forest', 
      icon: Moon,
      theme: 'light',
      sidebarColor: 'emerald',
      navbarColor: 'colored',
      colors: ['#10B981', '#059669', '#064E3B']
    },
    { 
      name: 'sunset', 
      label: 'Sunset', 
      icon: Sun,
      theme: 'light',
      sidebarColor: 'orange',
      navbarColor: 'colored',
      colors: ['#F97316', '#EA580C', '#9A3412']
    },
    { 
      name: 'lavender', 
      label: 'Lavender', 
      icon: Sun,
      theme: 'light',
      sidebarColor: 'purple',
      navbarColor: 'colored',
      colors: ['#8B5CF6', '#7C3AED', '#581C87']
    },
    { 
      name: 'rose', 
      label: 'Rose', 
      icon: Moon,
      theme: 'light',
      sidebarColor: 'pink',
      navbarColor: 'colored',
      colors: ['#EC4899', '#DB2777', '#831843']
    },
    { 
      name: 'midnight', 
      label: 'Midnight', 
      icon: Moon,
      theme: 'dark',
      sidebarColor: 'indigo',
      navbarColor: 'dark',
      colors: ['#6366F1', '#4F46E5', '#312E81']
    }
  ];

  const panelVariants = {
    closed: { x: '100%' },
    open: { x: 0 }
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed right-0 top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Theme Settings
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto h-full pb-24">
              {/* Theme Presets */}
              <div>
                <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                  Theme Presets
                </h4>
                <div className="grid grid-cols-2 gap-1">
                  {themePresets.map((preset) => {
                    const Icon = preset.icon;
                    return (
                      <button
                        key={preset.name}
                        onClick={() => {
                          updateTheme(preset.theme);
                          updateSidebarColor(preset.sidebarColor);
                          updateNavbarColor(preset.navbarColor);
                        }}
                        className={`p-2 border rounded-md text-xs font-medium transition-all ${
                          theme === preset.theme && sidebarColor === preset.sidebarColor
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Icon className="w-3 h-3 mx-auto mb-1" />
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Theme Toggle */}
              <div>
                <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                  Quick Mode
                </h4>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateTheme('light')}
                    className={`p-2 border rounded-md text-xs font-medium transition-all ${
                      theme === 'light'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <Sun className="w-3 h-3 mx-auto mb-1" />
                    Light
                  </button>
                  <button
                    onClick={() => updateTheme('dark')}
                    className={`p-2 border rounded-md text-xs font-medium transition-all ${
                      theme === 'dark'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Moon className="w-3 h-3 mx-auto mb-1" />
                    Dark
                  </button>
                </div>
              </div>

              {/* Sidebar Color */}
              <div>
                <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                  Sidebar Color
                </h4>
                <div className="grid grid-cols-4 gap-1.5">
                  {sidebarColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => updateSidebarColor(color.name)}
                      className={`relative w-7 h-7 rounded-lg border-2 ${color.class} transition-all duration-200 hover:scale-110 ${
                        sidebarColor === color.name
                          ? 'border-gray-800 dark:border-white shadow-lg ring-2 ring-gray-300 dark:ring-gray-600'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                      title={color.label}
                    >
                      {sidebarColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navbar Color */}
              <div>
                <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                  Navbar Style
                </h4>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateNavbarColor('white')}
                    className={`p-2 border rounded-md text-xs font-medium transition-all ${
                      navbarColor === 'white'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => updateNavbarColor('colored')}
                    className={`p-2 border rounded-md text-xs font-medium transition-all ${
                      navbarColor === 'colored'
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    Colored
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div>
                <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                  Font Size
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">S</span>
                  <input
                    type="range"
                    min="12"
                    max="18"
                    value={fontSize}
                    onChange={(e) => updateFontSize(parseInt(e.target.value))}
                    className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">L</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium min-w-[24px]">{fontSize}px</span>
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                  Border Radius
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">□</span>
                  <input
                    type="range"
                    min="0"
                    max="16"
                    value={borderRadius}
                    onChange={(e) => updateBorderRadius(parseInt(e.target.value))}
                    className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">◯</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium min-w-[24px]">{borderRadius}px</span>
                </div>
              </div>

              {/* Animations */}
              <div>
                <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                  Animations
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Enable animations
                  </span>
                  <ToggleSwitch checked={animationsEnabled} onChange={toggleAnimations} />
                </div>
              </div>

              {/* Layout Options */}
              <div>
                <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                  Layout
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Show navbar
                    </span>
                    <ToggleSwitch checked={navbarVisible} onChange={toggleNavbarVisible} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Compact mode
                    </span>
                    <ToggleSwitch checked={compactMode} onChange={toggleCompactMode} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Sidebar fixed
                    </span>
                    <ToggleSwitch checked={sidebarFixed} onChange={toggleSidebarFixed} />
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={resetToDefault}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs font-medium"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemePanel;