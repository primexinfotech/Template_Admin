import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [navbarColor, setNavbarColor] = useState('slate');
  const [borderRadius, setBorderRadius] = useState(8);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const updateNavbarColor = (color) => {
    setNavbarColor(color);
  };

  const updateBorderRadius = (radius) => {
    setBorderRadius(radius);
  };

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled);
  };

  const value = {
    theme,
    toggleTheme,
    sidebarCollapsed,
    setSidebarCollapsed,
    navbarColor,
    updateNavbarColor,
    borderRadius,
    updateBorderRadius,
    animationsEnabled,
    toggleAnimations,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}