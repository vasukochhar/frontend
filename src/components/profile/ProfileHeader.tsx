import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Edit, Medal } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileHeaderProps {
  username: string;
  bio?: string;
  avatar: string;
  isCurrentUser: boolean;
  stats: {
    panels: number;
    likes: number;
    rank: number;
  };
  badges?: string[];
  onEditProfile?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  bio,
  avatar,
  isCurrentUser,
  stats,
  badges = [],
  onEditProfile,
}) => {
  const { user } = useAuth();

  return (
    <div className="bg-container rounded-lg shadow-custom p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <img 
            src={avatar} 
            alt={username}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-primary"
          />
          {badges.length > 0 && (
            <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1 shadow-md">
              <Medal size={18} />
            </div>
          )}
        </motion.div>
        
        <div className="md:ml-6 mt-4 md:mt-0 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                {username}
                {badges.length > 0 && (
                  <span className="ml-2 text-xs bg-primary/20 text-primary rounded-full px-2 py-1 flex items-center">
                    <Medal size={12} className="mr-1" />
                    Color Master
                  </span>
                )}
              </h1>
              <p className="text-text-secondary mt-1">{bio || "No bio yet"}</p>
            </div>
            
            {isCurrentUser ? (
              <button 
                className="btn btn-secondary flex items-center text-sm"
                onClick={onEditProfile}
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <button className="btn btn-primary text-sm">
                Follow
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold">{stats.panels}</div>
              <div className="text-text-secondary text-xs">Panels</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{stats.likes}</div>
              <div className="text-text-secondary text-xs">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">#{stats.rank}</div>
              <div className="text-text-secondary text-xs">Rank</div>
            </div>
          </div>
        </div>
      </div>
      
      {badges.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-sm font-medium mb-2">Badges</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <div 
                key={index}
                className="bg-background/50 px-3 py-1 rounded-full text-xs flex items-center"
              >
                <Medal size={12} className="mr-1 text-primary" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;