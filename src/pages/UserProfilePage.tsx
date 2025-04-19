import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import ProfileHeader from '../components/profile/ProfileHeader';
import PanelCard from '../components/community/PanelCard';
import { useAuth } from '../contexts/AuthContext';
import { useFunMode } from '../contexts/FunModeContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Mock data for user panels
const mockUserPanels = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/1575841/pexels-photo-1575841.jpeg',
    title: 'Marin Kitagawa Cosplay Scene',
    username: 'artmaster',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    likes: 128,
    comments: 32,
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/3680454/pexels-photo-3680454.jpeg',
    title: 'Gojo vs. Sukuna',
    username: 'artmaster',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    likes: 94,
    comments: 18,
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/2426085/pexels-photo-2426085.jpeg',
    title: 'Akane Beach Episode',
    username: 'artmaster',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    likes: 76,
    comments: 14,
  },
  {
    id: '4',
    imageUrl: 'https://images.pexels.com/photos/1906879/pexels-photo-1906879.jpeg',
    title: 'Sunset Battle Panel',
    username: 'artmaster',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    likes: 68,
    comments: 12,
  },
];

// Mock data for favorited panels
const mockFavoritedPanels = [
  {
    id: '5',
    imageUrl: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg',
    title: 'Chainsaw Man Urban Scene',
    username: 'mangafan92',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    likes: 53,
    comments: 8,
  },
  {
    id: '6',
    imageUrl: 'https://images.pexels.com/photos/1209758/pexels-photo-1209758.jpeg',
    title: 'Demon Slayer Final Battle',
    username: 'colorwizard',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    likes: 42,
    comments: 7,
  },
];

// Mock badges
const badges = ['Color Master', 'Top Contributor', 'Character Expert'];

const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const { showRandomPrank } = useFunMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('panels');
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [bio, setBio] = useState('Manga colorization enthusiast. I love bringing black and white panels to life!');

  // Check if this is the current user's profile
  const isCurrentUser = user?.username === username;

  const handleEditProfile = () => {
    setEditProfileModalOpen(true);
  };

  const handleSaveProfile = () => {
    setEditProfileModalOpen(false);
    toast.success('Profile updated successfully!');
  };

  const stats = {
    panels: mockUserPanels.length,
    likes: mockUserPanels.reduce((sum, panel) => sum + panel.likes, 0),
    rank: 12,
  };

  useEffect(() => {
    // In a real app, we would fetch user data here
  }, [username]);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      
      <div className="pt-20 flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <ProfileHeader
            username={username || ''}
            bio={bio}
            avatar="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
            isCurrentUser={isCurrentUser}
            stats={stats}
            badges={badges}
            onEditProfile={handleEditProfile}
          />
          
          <div className="bg-container rounded-lg shadow-custom mb-6 overflow-hidden">
            <div className="flex border-b border-gray-700">
              <button 
                className={`px-6 py-3 font-medium ${
                  activeTab === 'panels' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-text-secondary'
                }`}
                onClick={() => setActiveTab('panels')}
              >
                My Panels
              </button>
              <button 
                className={`px-6 py-3 font-medium ${
                  activeTab === 'favorites' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-text-secondary'
                }`}
                onClick={() => setActiveTab('favorites')}
              >
                Favorites
              </button>
              <button 
                className={`px-6 py-3 font-medium ${
                  activeTab === 'badges' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-text-secondary'
                }`}
                onClick={() => setActiveTab('badges')}
              >
                Badges
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'panels' && (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {mockUserPanels.map(panel => (
                    <PanelCard
                      key={panel.id}
                      id={panel.id}
                      imageUrl={panel.imageUrl}
                      title={panel.title}
                      username={panel.username}
                      userAvatar={panel.userAvatar}
                      likes={panel.likes}
                      comments={panel.comments}
                      onClick={() => {
                        // In a real app, this would navigate to a detail page
                        toast.success(`Viewing panel: ${panel.title}`);
                        if (Math.random() > 0.8) {
                          showRandomPrank();
                        }
                      }}
                    />
                  ))}
                </motion.div>
              )}
              
              {activeTab === 'favorites' && (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {mockFavoritedPanels.map(panel => (
                    <PanelCard
                      key={panel.id}
                      id={panel.id}
                      imageUrl={panel.imageUrl}
                      title={panel.title}
                      username={panel.username}
                      userAvatar={panel.userAvatar}
                      likes={panel.likes}
                      comments={panel.comments}
                      isLiked={true}
                      onClick={() => {
                        // In a real app, this would navigate to a detail page
                        toast.success(`Viewing panel: ${panel.title}`);
                      }}
                    />
                  ))}
                </motion.div>
              )}
              
              {activeTab === 'badges' && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {badges.map((badge, index) => (
                      <div 
                        key={index}
                        className="bg-background rounded-lg p-4 flex flex-col items-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-center">{badge}</h3>
                        <p className="text-xs text-text-secondary text-center mt-1">
                          {index === 0 && 'Awarded for exceptional coloring skills'}
                          {index === 1 && 'Among the top 5% of contributors'}
                          {index === 2 && 'Expert in character-specific colorization'}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-background rounded-lg p-4">
                    <h3 className="font-semibold mb-2">How to Earn Badges</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-text-secondary">
                          <span className="text-text-primary">Color Master</span> - Have at least 10 panels with more than 100 likes each
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-text-secondary">
                          <span className="text-text-primary">Top Contributor</span> - Be in the top 5% of active users for a month
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-text-secondary">
                          <span className="text-text-primary">Character Expert</span> - Colorize at least 20 panels of the same character with authentic colors
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
      
      {/* Edit Profile Modal */}
      {editProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-container rounded-lg shadow-custom max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Profile Picture
              </label>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" 
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <button className="btn btn-secondary text-sm">
                  Change Picture
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                disabled
                className="input bg-gray-800 cursor-not-allowed"
              />
              <p className="text-xs text-text-secondary mt-1">
                Username cannot be changed
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="input min-h-24"
                placeholder="Tell us about yourself..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button 
                className="btn btn-secondary flex-1"
                onClick={() => setEditProfileModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary flex-1"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;