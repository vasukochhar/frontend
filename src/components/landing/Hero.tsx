import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-20">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 z-0 screentone-pattern opacity-30" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Color Your Manga World with{' '}
              <span className="gradient-text">Shikimanga</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-text-secondary mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              AI-powered colorization with endless customization options.
              Bring your favorite manga panels to life with vibrant, 
              authentic colors and share them with the community.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                to="/editor" 
                className="btn btn-primary text-center text-lg py-4 px-8 flex items-center justify-center transform hover:scale-105 transition-all duration-300"
              >
                Start Coloring Now
              </Link>
              <Link 
                to="/community" 
                className="btn btn-secondary text-center"
              >
                Explore Gallery
              </Link>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Before-After Manga Panel */}
              <div className="relative bg-container rounded-lg shadow-custom overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 p-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <img 
                        src="https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg" 
                        alt="Original Manga Panel" 
                        className="w-full h-full object-cover grayscale"
                      />
                      <div className="absolute bottom-2 left-2 bg-background px-2 py-1 rounded text-xs font-medium">
                        Original
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <img 
                        src="https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg" 
                        alt="Colorized Manga Panel" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-primary px-2 py-1 rounded text-xs font-medium">
                        Colorized
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Control Panel Mockup */}
                <div className="p-4 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-background rounded p-2 text-xs">
                      <div className="h-3 w-20 bg-primary rounded mb-1"></div>
                      <div className="h-2 w-16 bg-gray-700 rounded"></div>
                    </div>
                    <div className="bg-background rounded p-2 text-xs">
                      <div className="h-3 w-20 bg-accent rounded mb-1"></div>
                      <div className="h-2 w-16 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-background h-6 rounded flex items-center px-2">
                    <div className="h-2 w-full bg-gray-700 rounded overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-primary to-accent"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decoration */}
              <div 
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent blur-xl opacity-40 z-0"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;