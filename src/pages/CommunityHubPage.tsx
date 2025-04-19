import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import PanelCard from '../components/community/PanelCard';
import FilterControls from '../components/community/FilterControls';
import { useAuth } from '../contexts/AuthContext';
import { useFunMode } from '../contexts/FunModeContext';
import { Upload, Star, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Mock data for community panels
const mockPanels = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/1575841/pexels-photo-1575841.jpeg',
    title: 'Marin Kitagawa Cosplay Scene',
    username: 'artmaster',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    likes: 128,
    comments: 32,
    mangaTitle: 'My Dress-Up Darling',
    character: 'Marin Kitagawa',
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/3680454/pexels-photo-3680454.jpeg',
    title: 'Gojo vs. Sukuna',
    username: 'mangafan92',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    likes: 94,
    comments: 18,
    mangaTitle: 'Jujutsu Kaisen',
    character: 'Gojo Satoru',
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/774866/pexels-photo-774866.jpeg',
    title: 'Akane Beach Episode',
    username: 'colorwizard',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    likes: 76,
    comments: 14,
    mangaTitle: 'Oshi no Ko',
    character: 'Akane Kurokawa',
  },
  {
    id: '4',
    imageUrl: 'https://images.pexels.com/photos/1906879/pexels-photo-1906879.jpeg',
    title: 'Sunset Battle Panel',
    username: 'artmaster',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    likes: 68,
    comments: 12,
    mangaTitle: 'One Punch Man',
    character: 'Saitama',
  },
  {
    id: '5',
    imageUrl: 'https://images.pexels.com/photos/8534214/pexels-photo-8534214.jpeg',
    title: 'Chika Dance Colorization',
    username: 'colorwizard',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    likes: 53,
    comments: 8,
    mangaTitle: 'Kaguya-sama',
    character: 'Chika Fujiwara',
  },
  {
    id: '6',
    imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
    title: 'Demon Slayer Final Battle',
    username: 'mangafan92',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    likes: 42,
    comments: 7,
    mangaTitle: 'Demon Slayer',
    character: 'Tanjiro',
  },
];

const mangaList = ['Jujutsu Kaisen', 'My Dress-Up Darling', 'Oshi no Ko', 'One Punch Man', 'Kaguya-sama', 'Demon Slayer'];

const CommunityHubPage: React.FC = () => {
  const { user } = useAuth();
  const { showRandomPrank } = useFunMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayedPanels, setDisplayedPanels] = useState(mockPanels);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState('popular');
  const [activeFilter, setActiveFilter] = useState('all');
  const [featuredPanel, setFeaturedPanel] = useState(mockPanels[0]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...mockPanels];
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(panel => 
        panel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        panel.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        panel.mangaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        panel.character.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply manga filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(panel => panel.mangaTitle === activeFilter);
    }
    
    // Apply sorting
    if (activeSort === 'popular') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (activeSort === 'recent') {
      // In a real app, we'd sort by date
      filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
    
    setDisplayedPanels(filtered);
    
    // Set featured panel to the most popular
    if (filtered.length > 0) {
      setFeaturedPanel(
        activeSort === 'popular' 
          ? filtered[0] 
          : filtered.reduce((max, panel) => max.likes > panel.likes ? max : panel)
      );
    }
  }, [searchQuery, activeSort, activeFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleLike = (id: string) => {
    // In a real app, this would call an API to like/unlike the panel
    console.log('Like panel:', id);
  };

  const handleShare = (id: string) => {
    // In a real app, this would open a share dialog
    toast.success('Sharing dialog opened!');
  };

  const handleUploadClick = () => {
    // In a real app, this would redirect to the editor with a special flag
    window.location.href = '/editor?upload=community';
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      
      <div className="pt-20 flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Community Hub</h1>
            
            <button 
              className="btn btn-primary flex items-center text-sm"
              onClick={handleUploadClick}
            >
              <Upload size={16} className="mr-2" />
              Upload to Hub
            </button>
          </div>
          
          {/* Featured Panel */}
          <div className="bg-container rounded-lg shadow-custom overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-700 flex items-center">
              <Trophy size={20} className="text-primary mr-2" />
              <h2 className="font-semibold">Featured Panel</h2>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2">
                  <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={featuredPanel.imageUrl} 
                      alt={featuredPanel.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="lg:w-1/2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{featuredPanel.title}</h3>
                    
                    <div className="flex items-center mb-4">
                      <img 
                        src={featuredPanel.userAvatar} 
                        alt={featuredPanel.username}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-text-secondary">@{featuredPanel.username}</span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <span className="w-24 text-text-secondary">Manga:</span>
                        <span>{featuredPanel.mangaTitle}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-text-secondary">Character:</span>
                        <span>{featuredPanel.character}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-text-secondary">Likes:</span>
                        <span className="flex items-center">
                          <Star size={16} className="text-primary mr-1" fill="#ff69b4" />
                          {featuredPanel.likes}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-background p-4 rounded-lg mb-4">
                      <p className="text-sm">
                        This {featuredPanel.character} panel from {featuredPanel.mangaTitle} was colorized 
                        using Shikimanga's advanced character recognition and hybrid coloring system. 
                        The artist used the {Math.random() > 0.5 ? 'Hand-Drawn' : 'Anime-Style'} preset 
                        with custom post-processing settings.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      className="btn btn-secondary flex-1"
                      onClick={() => handleLike(featuredPanel.id)}
                    >
                      Like
                    </button>
                    <button 
                      className="btn btn-primary flex-1"
                      onClick={() => handleShare(featuredPanel.id)}
                    >
                      Share to X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <FilterControls
            onSearch={handleSearch}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
            mangaList={mangaList}
          />
          
          {/* Gallery */}
          <div className="mb-6">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {displayedPanels.length > 0 ? (
                displayedPanels.map(panel => (
                  <PanelCard
                    key={panel.id}
                    id={panel.id}
                    imageUrl={panel.imageUrl}
                    title={panel.title}
                    username={panel.username}
                    userAvatar={panel.userAvatar}
                    likes={panel.likes}
                    comments={panel.comments}
                    mangaTitle={panel.mangaTitle}
                    character={panel.character}
                    onLike={handleLike}
                    onShare={handleShare}
                    onClick={() => {
                      // In a real app, this would navigate to a detail page
                      toast.success(`Viewing panel: ${panel.title}`);
                      if (Math.random() > 0.8) {
                        showRandomPrank();
                      }
                    }}
                  />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-text-secondary">No panels found matching your criteria.</p>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Load More */}
          {displayedPanels.length > 0 && (
            <div className="flex justify-center mb-8">
              <button className="btn btn-secondary">
                Load More
              </button>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default CommunityHubPage;