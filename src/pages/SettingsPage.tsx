import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useFunMode } from '../contexts/FunModeContext';
import { 
  User, 
  Lock, 
  Trash2, 
  Bell, 
  Globe, 
  Eye, 
  Zap, 
  Palette,
  LogOut,
  Check,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { 
    isDarkMode, 
    toggleDarkMode, 
    isHighContrast, 
    toggleHighContrast,
    isColorBlindMode,
    toggleColorBlindMode,
  } = useTheme();
  const { isFunModeEnabled, toggleFunMode } = useFunMode();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('account');
  const [language, setLanguage] = useState('en');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [enableKeyboardShortcuts, setEnableKeyboardShortcuts] = useState(true);
  
  const navigate = useNavigate();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    toast.success(`Language changed to ${e.target.value === 'en' ? 'English' : '日本語'}`);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    toast.success('Account deleted successfully');
    logout();
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      
      <div className="pt-20 flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-text-secondary">
              Manage your account settings and preferences
            </p>
          </div>
          
          <div className="bg-container rounded-lg shadow-custom overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="md:w-64 md:border-r border-gray-700">
                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                          activeSection === 'account'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:bg-background'
                        }`}
                        onClick={() => setActiveSection('account')}
                      >
                        <User size={18} className="mr-2" />
                        Account
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                          activeSection === 'accessibility'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:bg-background'
                        }`}
                        onClick={() => setActiveSection('accessibility')}
                      >
                        <Eye size={18} className="mr-2" />
                        Accessibility
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                          activeSection === 'fun-mode'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:bg-background'
                        }`}
                        onClick={() => setActiveSection('fun-mode')}
                      >
                        <Zap size={18} className="mr-2" />
                        Fun Mode
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                          activeSection === 'language'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:bg-background'
                        }`}
                        onClick={() => setActiveSection('language')}
                      >
                        <Globe size={18} className="mr-2" />
                        Language
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                          activeSection === 'notifications'
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:bg-background'
                        }`}
                        onClick={() => setActiveSection('notifications')}
                      >
                        <Bell size={18} className="mr-2" />
                        Notifications
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full flex items-center px-3 py-2 rounded-lg text-error hover:bg-error hover:bg-opacity-10 transition-colors"
                        onClick={handleLogout}
                      >
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6">
                {/* Account Settings */}
                {activeSection === 'account' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <img 
                          src={user?.avatar || 'https://i.pravatar.cc/150'} 
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="font-medium">{user?.username}</h3>
                          <p className="text-text-secondary text-sm">{user?.email}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Email Address</h3>
                        <div className="flex items-center mb-4">
                          <input 
                            type="email" 
                            value={user?.email || ''}
                            className="input mr-2 flex-grow"
                            readOnly
                          />
                          <button className="btn btn-secondary text-sm">
                            Change
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Password</h3>
                        <button className="btn btn-secondary text-sm flex items-center">
                          <Lock size={16} className="mr-2" />
                          Change Password
                        </button>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-700">
                        <h3 className="font-medium text-error mb-3">Danger Zone</h3>
                        <button 
                          className="btn bg-background text-error border border-error hover:bg-error hover:bg-opacity-10 text-sm flex items-center"
                          onClick={handleDeleteAccount}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete Account
                        </button>
                        
                        <p className="text-xs text-text-secondary mt-2">
                          This will permanently delete your account and all your data.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Accessibility Settings */}
                {activeSection === 'accessibility' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Accessibility Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Dark Mode</h3>
                          <p className="text-text-secondary text-sm">
                            Use dark theme for the application
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                          />
                          <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">High Contrast</h3>
                          <p className="text-text-secondary text-sm">
                            Increase contrast for better readability
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={isHighContrast}
                            onChange={toggleHighContrast}
                          />
                          <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Colorblind Mode</h3>
                          <p className="text-text-secondary text-sm">
                            Adjust colors for colorblind accessibility
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={isColorBlindMode}
                            onChange={toggleColorBlindMode}
                          />
                          <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Keyboard Shortcuts</h3>
                          <p className="text-text-secondary text-sm">
                            Enable keyboard shortcuts for faster navigation
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={enableKeyboardShortcuts}
                            onChange={() => setEnableKeyboardShortcuts(!enableKeyboardShortcuts)}
                          />
                          <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      {enableKeyboardShortcuts && (
                        <div className="mt-2 p-4 bg-background rounded-lg">
                          <h4 className="font-medium mb-2">Available Shortcuts</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-text-secondary">New Panel:</span>
                              <kbd className="px-2 py-1 bg-container rounded text-xs">N</kbd>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Save:</span>
                              <kbd className="px-2 py-1 bg-container rounded text-xs">Ctrl+S</kbd>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Undo:</span>
                              <kbd className="px-2 py-1 bg-container rounded text-xs">Ctrl+Z</kbd>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Colorize:</span>
                              <kbd className="px-2 py-1 bg-container rounded text-xs">C</kbd>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Fun Mode Settings */}
                {activeSection === 'fun-mode' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Fun Mode Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Fun Mode</h3>
                          <p className="text-text-secondary text-sm">
                            Enable easter eggs and character pranks
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={isFunModeEnabled}
                            onChange={toggleFunMode}
                          />
                          <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      {isFunModeEnabled && (
                        <div className="p-4 bg-background rounded-lg">
                          <h4 className="font-medium mb-3">Preview</h4>
                          <div className="bg-container p-3 rounded-lg flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                              <img 
                                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" 
                                alt="Kana Arima" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm">
                                <span className="font-medium">Kana Arima:</span> Hun, so you're a fan of Kana Arima who had zero relevance?
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-xs text-text-secondary">
                            Fun Mode adds character-specific pranks and easter eggs throughout the application. 
                            Characters might comment on your panels or appear when you least expect them!
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Character Preferences</h3>
                          <p className="text-text-secondary text-sm">
                            Choose which characters can appear in pranks
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded bg-background border-gray-700 text-primary focus:ring-primary" checked />
                          <span>Marin Kitagawa</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded bg-background border-gray-700 text-primary focus:ring-primary" checked />
                          <span>Gojo Satoru</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded bg-background border-gray-700 text-primary focus:ring-primary" checked />
                          <span>Kana Arima</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Language Settings */}
                {activeSection === 'language' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Language Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">Display Language</h3>
                        <select 
                          value={language}
                          onChange={handleLanguageChange}
                          className="input"
                        >
                          <option value="en">English</option>
                          <option value="ja">日本語 (Japanese)</option>
                        </select>
                        <p className="text-xs text-text-secondary mt-2">
                          Changes the language throughout the application
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Notification Settings */}
                {activeSection === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-text-secondary text-sm">
                            Receive notifications via email
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                          />
                          <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Community Updates</h3>
                          <p className="text-text-secondary text-sm">
                            Receive updates about community activity
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={communityUpdates}
                            onChange={() => setCommunityUpdates(!communityUpdates)}
                          />
                          <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 pt-4 border-t border-gray-700">
                  <button 
                    className="btn btn-primary"
                    onClick={handleSaveSettings}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
      
      {/* Delete Account Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-container rounded-lg shadow-custom max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle size={40} className="text-error" />
            </div>
            
            <h3 className="text-xl font-bold text-center mb-2">
              Delete Your Account?
            </h3>
            
            <p className="text-text-secondary text-center mb-6">
              This action cannot be undone. All of your data will be permanently removed, including your profile, panels, and comments.
            </p>
            
            <div className="flex space-x-4">
              <button 
                className="flex-1 btn btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="flex-1 btn bg-error hover:bg-red-700 text-white flex items-center justify-center"
                onClick={confirmDeleteAccount}
              >
                <Trash2 size={16} className="mr-2" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;