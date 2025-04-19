import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, Home, Image, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'ja' for Japanese
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ja' : 'en');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav 
      className={`${
        transparent ? 'bg-transparent' : 'bg-container'
      } fixed w-full z-50 transition-all duration-300 h-20`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold gradient-text">Shikimanga</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-text-secondary hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/editor" className="text-text-secondary hover:text-primary transition-colors">
            Panel Editor
          </Link>
          <Link to="/community" className="text-text-secondary hover:text-primary transition-colors">
            Community
          </Link>
          <Link to="/pricing" className="text-text-secondary hover:text-primary transition-colors">
            Pricing
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2"
              >
                <img
                  src={user?.avatar || 'https://i.pravatar.cc/150'}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                />
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-container rounded-lg shadow-custom py-2"
                >
                  <Link 
                    to="/home" 
                    className="flex items-center px-4 py-2 text-text-secondary hover:bg-background hover:text-primary"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Home size={18} className="mr-2" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/editor" 
                    className="flex items-center px-4 py-2 text-text-secondary hover:bg-background hover:text-primary"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Image size={18} className="mr-2" />
                    Panel Editor
                  </Link>
                  <Link 
                    to={`/profile/${user?.username}`} 
                    className="flex items-center px-4 py-2 text-text-secondary hover:bg-background hover:text-primary"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User size={18} className="mr-2" />
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center px-4 py-2 text-text-secondary hover:bg-background hover:text-primary"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings size={18} className="mr-2" />
                    Settings
                  </Link>
                  <hr className="my-1 border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-error hover:bg-background"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-text-primary hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn btn-primary"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button onClick={toggleLanguage} className="text-text-secondary hover:text-primary">
            <Globe size={20} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-container py-4 px-4"
        >
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-text-secondary hover:text-primary py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/editor" 
              className="text-text-secondary hover:text-primary py-2"
              onClick={toggleMenu}
            >
              Panel Editor
            </Link>
            <Link 
              to="/community" 
              className="text-text-secondary hover:text-primary py-2"
              onClick={toggleMenu}
            >
              Community
            </Link>
            <Link 
              to="/pricing" 
              className="text-text-secondary hover:text-primary py-2"
              onClick={toggleMenu}
            >
              Pricing
            </Link>

            {isAuthenticated ? (
              <>
                <hr className="border-gray-700" />
                <Link 
                  to="/home" 
                  className="flex items-center text-text-secondary hover:text-primary py-2"
                  onClick={toggleMenu}
                >
                  <Home size={18} className="mr-2" />
                  Dashboard
                </Link>
                <Link 
                  to="/editor" 
                  className="flex items-center text-text-secondary hover:text-primary py-2"
                  onClick={toggleMenu}
                >
                  <Image size={18} className="mr-2" />
                  Panel Editor
                </Link>
                <Link 
                  to={`/profile/${user?.username}`} 
                  className="flex items-center text-text-secondary hover:text-primary py-2"
                  onClick={toggleMenu}
                >
                  <User size={18} className="mr-2" />
                  Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center text-text-secondary hover:text-primary py-2"
                  onClick={toggleMenu}
                >
                  <Settings size={18} className="mr-2" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center text-error py-2"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-text-primary hover:text-primary py-2"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary inline-block text-center"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}

            <button 
              onClick={() => {
                toggleLanguage();
                toggleMenu();
              }} 
              className="flex items-center text-text-secondary hover:text-primary py-2"
            >
              <Globe size={18} className="mr-2" />
              {language === 'en' ? 'English' : '日本語'}
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;