import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [sidebarColor, setSidebarColor] = useState('blue');
  const [navbarColor, setNavbarColor] = useState('white');
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [borderRadius, setBorderRadius] = useState(6);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [sidebarFixed, setSidebarFixed] = useState(true);

  useEffect(() => {
    // Load theme preferences from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedSidebarColor = localStorage.getItem('sidebarColor') || 'blue';
    const savedNavbarColor = localStorage.getItem('navbarColor') || 'white';
    const savedNavbarVisible = localStorage.getItem('navbarVisible') !== 'false';
    const savedFontSize = parseInt(localStorage.getItem('fontSize')) || 14;
    const savedBorderRadius = parseInt(localStorage.getItem('borderRadius')) || 6;
    const savedAnimations = localStorage.getItem('animationsEnabled') !== 'false';
    const savedCompactMode = localStorage.getItem('compactMode') === 'true';
    const savedSidebarFixed = localStorage.getItem('sidebarFixed') !== 'false';

    setTheme(savedTheme);
    setSidebarColor(savedSidebarColor);
    setNavbarColor(savedNavbarColor);
    setNavbarVisible(savedNavbarVisible);
    setFontSize(savedFontSize);
    setBorderRadius(savedBorderRadius);
    setAnimationsEnabled(savedAnimations);
    setCompactMode(savedCompactMode);
    setSidebarFixed(savedSidebarFixed);

    // Apply theme to document
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    // Apply font size
    document.documentElement.style.setProperty('--font-size', `${savedFontSize}px`);
    document.documentElement.style.setProperty('--border-radius', `${savedBorderRadius}px`);
  }, []);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const updateSidebarColor = (color) => {
    setSidebarColor(color);
    localStorage.setItem('sidebarColor', color);
  };

  const updateNavbarColor = (color) => {
    setNavbarColor(color);
    localStorage.setItem('navbarColor', color);
  };

  const toggleNavbarVisible = () => {
    const newValue = !navbarVisible;
    setNavbarVisible(newValue);
    localStorage.setItem('navbarVisible', newValue.toString());
  };

  const updateFontSize = (size) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size.toString());
    document.documentElement.style.setProperty('--font-size', `${size}px`);
  };

  const updateBorderRadius = (radius) => {
    setBorderRadius(radius);
    localStorage.setItem('borderRadius', radius.toString());
    document.documentElement.style.setProperty('--border-radius', `${radius}px`);
  };

  const toggleAnimations = () => {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    localStorage.setItem('animationsEnabled', newValue.toString());
    document.documentElement.classList.toggle('no-animations', !newValue);
  };

  const toggleCompactMode = () => {
    const newValue = !compactMode;
    setCompactMode(newValue);
    localStorage.setItem('compactMode', newValue.toString());
  };

  const toggleSidebarFixed = () => {
    const newValue = !sidebarFixed;
    setSidebarFixed(newValue);
    localStorage.setItem('sidebarFixed', newValue.toString());
  };

  const resetToDefault = () => {
    updateTheme('light');
    updateSidebarColor('blue');
    updateNavbarColor('white');
    setNavbarVisible(true);
    updateFontSize(14);
    updateBorderRadius(6);
    setAnimationsEnabled(true);
    setCompactMode(false);
    setSidebarFixed(true);
    localStorage.removeItem('theme');
    localStorage.removeItem('sidebarColor');
    localStorage.removeItem('navbarColor');
    localStorage.removeItem('navbarVisible');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('borderRadius');
    localStorage.removeItem('animationsEnabled');
    localStorage.removeItem('compactMode');
    localStorage.removeItem('sidebarFixed');
  };

  const contextValue = {
    theme: theme || 'light',
    updateTheme,
    sidebarColor: sidebarColor || 'blue',
    updateSidebarColor,
    navbarColor: navbarColor || 'white',
    updateNavbarColor,
    navbarVisible: navbarVisible !== undefined ? navbarVisible : true,
    toggleNavbarVisible,
    fontSize: fontSize || 14,
    updateFontSize,
    borderRadius: borderRadius || 6,
    updateBorderRadius,
    animationsEnabled: animationsEnabled !== undefined ? animationsEnabled : true,
    toggleAnimations,
    compactMode: compactMode !== undefined ? compactMode : false,
    toggleCompactMode,
    sidebarFixed: sidebarFixed !== undefined ? sidebarFixed : true,
    toggleSidebarFixed,
    resetToDefault,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};