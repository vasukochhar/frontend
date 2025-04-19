import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  isColorBlindMode: boolean;
  toggleColorBlindMode: () => void;
  theme: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isColorBlindMode, setIsColorBlindMode] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('shikimanga_theme');
    if (savedTheme) {
      const themeData = JSON.parse(savedTheme);
      setIsDarkMode(themeData.isDarkMode);
      setIsHighContrast(themeData.isHighContrast);
      setIsColorBlindMode(themeData.isColorBlindMode);
    }
  }, []);

  useEffect(() => {
    // Update theme class on body
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('high-contrast', isHighContrast);
    document.body.classList.toggle('color-blind', isColorBlindMode);
    
    // Save preferences
    localStorage.setItem('shikimanga_theme', JSON.stringify({
      isDarkMode,
      isHighContrast,
      isColorBlindMode
    }));

    // Set theme string
    let themeString = isDarkMode ? 'dark' : 'light';
    if (isHighContrast) themeString += '-high-contrast';
    if (isColorBlindMode) themeString += '-color-blind';
    setTheme(themeString);
  }, [isDarkMode, isHighContrast, isColorBlindMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleHighContrast = () => setIsHighContrast(!isHighContrast);
  const toggleColorBlindMode = () => setIsColorBlindMode(!isColorBlindMode);

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        toggleDarkMode, 
        isHighContrast, 
        toggleHighContrast,
        isColorBlindMode,
        toggleColorBlindMode,
        theme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};