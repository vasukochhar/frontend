import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Image, Users, Settings, Zap } from 'lucide-react';
import { useFunMode } from '../../contexts/FunModeContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { isFunModeEnabled, toggleFunMode } = useFunMode();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    {
      to: '/home',
      icon: <Home size={20} />,
      label: 'Dashboard',
    },
    {
      to: '/editor',
      icon: <Image size={20} />,
      label: 'Panel Editor',
    },
    {
      to: '/community',
      icon: <Users size={20} />,
      label: 'Community Hub',
    },
    {
      to: '/settings',
      icon: <Settings size={20} />,
      label: 'Settings',
    },
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-20 bottom-0 left-0 z-40 w-64 bg-container transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:static md:z-0 screentone-pattern overflow-y-auto`}
      >
        <div className="p-4">
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.to)
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:bg-background hover:text-primary'
                }`}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <hr className="my-6 border-gray-700" />

          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <Zap 
                size={18} 
                className={`mr-2 ${isFunModeEnabled ? 'text-primary' : 'text-text-secondary'}`} 
              />
              <span className="text-text-secondary">Fun Mode</span>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={isFunModeEnabled}
                onChange={toggleFunMode}
              />
              <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {isFunModeEnabled && (
            <div className="mt-4 bg-background p-3 rounded-lg text-xs text-text-secondary">
              <p className="mb-2 font-medium">Fun Mode enabled!</p>
              <p>Expect random easter eggs and character pranks while using Shikimanga.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;