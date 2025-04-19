import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface PanelCardProps {
  id: string;
  imageUrl: string;
  title: string;
  username: string;
  userAvatar: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  mangaTitle?: string;
  character?: string;
  onLike?: (id: string) => void;
  onShare?: (id: string) => void;
  onClick?: () => void;
}

const PanelCard: React.FC<PanelCardProps> = ({
  id,
  imageUrl,
  title,
  username,
  userAvatar,
  likes,
  comments,
  isLiked = false,
  mangaTitle,
  character,
  onLike,
  onShare,
  onClick,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    if (onLike) onLike(id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare(id);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <motion.div 
      className="bg-container rounded-lg shadow-custom overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(255, 105, 180, 0.2)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        
        {(mangaTitle || character) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            {character && (
              <span className="inline-block bg-primary text-white text-xs rounded px-2 py-1 mb-1">
                {character}
              </span>
            )}
            {mangaTitle && (
              <span className="text-xs text-gray-300 block">
                From: {mangaTitle}
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium mb-2 text-sm truncate" title={title}>
          {title}
        </h3>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/profile/${username}`}
            className="flex items-center group"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={userAvatar} 
              alt={username}
              className="w-6 h-6 rounded-full mr-2 object-cover"
            />
            <span className="text-xs text-text-secondary group-hover:text-primary transition-colors">
              @{username}
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <button 
              className={`text-xs flex items-center ${liked ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}
              onClick={handleLike}
            >
              <Heart size={14} className={liked ? 'fill-primary' : ''} />
              <span className="ml-1">{likeCount}</span>
            </button>
            
            <button 
              className="text-xs flex items-center text-text-secondary hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={14} />
              <span className="ml-1">{comments}</span>
            </button>
            
            <button 
              className="text-xs flex items-center text-text-secondary hover:text-primary"
              onClick={handleShare}
            >
              <Share2 size={14} />
            </button>
            
            <div className="relative">
              <button 
                className="text-xs flex items-center text-text-secondary hover:text-primary"
                onClick={toggleMenu}
              >
                <MoreHorizontal size={14} />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 bottom-full mb-1 w-32 bg-container shadow-lg rounded-lg py-1 z-10">
                  <button 
                    className="text-xs text-text-secondary hover:bg-background hover:text-primary w-full text-left px-3 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                    }}
                  >
                    Report
                  </button>
                  <button 
                    className="text-xs text-text-secondary hover:bg-background hover:text-primary w-full text-left px-3 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                    }}
                  >
                    Hide
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PanelCard;