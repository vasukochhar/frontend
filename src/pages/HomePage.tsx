import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Folder, Upload, Users, Clock } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import PanelCard from '../components/community/PanelCard';
import { useAuth } from '../contexts/AuthContext';
import { useFunMode } from '../contexts/FunModeContext';
import { motion } from 'framer-motion';

// Mock data for recent projects
const recentProjects = [
  {
    id: '1',
    title: 'Marin Cosplay Panel',
    imageUrl: 'https://images.pexels.com/photos/3775127/pexels-photo-3775127.jpeg',
    lastModified: '2 hours ago',
  },
  {
    id: '2',
    title: 'Gojo Battle Scene',
    imageUrl: 'https://images.pexels.com/photos/1209774/pexels-photo-1209774.jpeg',
    lastModified: '1 day ago',
  },
  {
    id: '3',
    title: 'Akane Color Study',
    imageUrl: 'https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg',
    lastModified: '3 days ago',
  },
  {
    id: '4',
    title: 'JJK Group Panel',
    imageUrl: 'https://images.pexels.com/photos/3785932/pexels-photo-3785932.jpeg',
    lastModified: '1 week ago',
  },
];

// Mock data for community highlights
const communityHighlights = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    title: 'Feline Ninja Colorization',
    username: 'artmaster',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    likes: 128,
    comments: 32,
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg',
    title: 'Cherry Blossom Fight Scene',
    username: 'mangafan92',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    likes: 94,
    comments: 18,
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/1906879/pexels-photo-1906879.jpeg',
    title: 'Sunset Battle Panel',
    username: 'colorwizard',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    likes: 76,
    comments: 14,
  },
];

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { showRandomPrank } = useFunMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      
      <div className="pt-20 flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-text-secondary">
              Continue your manga colorization journey or start something new.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link 
              to="/editor"
              className="bg-container rounded-lg p-6 hover:shadow-custom transition-shadow flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Plus size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">New Panel</h3>
              <p className="text-sm text-text-secondary">Upload and colorize a single manga panel</p>
            </Link>
            
            <Link 
              to="/editor?batch=true"
              className="bg-container rounded-lg p-6 hover:shadow-custom transition-shadow flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Folder size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Batch Upload</h3>
              <p className="text-sm text-text-secondary">Colorize multiple panels at once</p>
            </Link>
            
            <Link 
              to="/editor?reference=true"
              className="bg-container rounded-lg p-6 hover:shadow-custom transition-shadow flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Upload size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Reference Upload</h3>
              <p className="text-sm text-text-secondary">Upload reference images for better accuracy</p>
            </Link>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <button
                  className={`pb-2 font-medium text-sm flex items-center ${
                    activeTab === 'projects' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-text-secondary'
                  }`}
                  onClick={() => setActiveTab('projects')}
                >
                  <Clock size={16} className="mr-2" />
                  Recent Projects
                </button>
                <button
                  className={`pb-2 font-medium text-sm flex items-center ${
                    activeTab === 'community' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-text-secondary'
                  }`}
                  onClick={() => setActiveTab('community')}
                >
                  <Users size={16} className="mr-2" />
                  Community Highlights
                </button>
              </div>
              
              {activeTab === 'projects' && (
                <Link 
                  to={`/profile/${user?.username}`}
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </Link>
              )}
              
              {activeTab === 'community' && (
                <Link 
                  to="/community"
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </Link>
              )}
            </div>
            
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {recentProjects.map((project) => (
                  <motion.div 
                    key={project.id}
                    className="bg-container rounded-lg shadow-custom overflow-hidden"
                    whileHover={{ y: -5 }}
                  >
                    <Link to={`/editor?id=${project.id}`} className="block">
                      <div className="relative aspect-square">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <p className="text-xs text-gray-300">
                            {project.lastModified}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <h3 className="font-medium text-sm truncate" title={project.title}>
                          {project.title}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
            
            {activeTab === 'community' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {communityHighlights.map((panel) => (
                  <PanelCard
                    key={panel.id}
                    id={panel.id}
                    imageUrl={panel.imageUrl}
                    title={panel.title}
                    username={panel.username}
                    userAvatar={panel.userAvatar}
                    likes={panel.likes}
                    comments={panel.comments}
                    onClick={() => window.location.href = `/community/panel/${panel.id}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-container rounded-lg p-6 shadow-custom mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Join the Community</h3>
                <p className="text-sm text-text-secondary">Share your colorized panels and connect with other manga enthusiasts</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-background rounded-lg p-4 text-center">
                <h4 className="font-bold text-2xl text-primary mb-1">8.5K+</h4>
                <p className="text-xs text-text-secondary">Community Members</p>
              </div>
              
              <div className="bg-background rounded-lg p-4 text-center">
                <h4 className="font-bold text-2xl text-primary mb-1">24K+</h4>
                <p className="text-xs text-text-secondary">Panels Colorized</p>
              </div>
              
              <div className="bg-background rounded-lg p-4 text-center">
                <h4 className="font-bold text-2xl text-primary mb-1">120+</h4>
                <p className="text-xs text-text-secondary">Featured Artists</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Link to="/community" className="btn btn-primary">
                Explore Community Hub
              </Link>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;