import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Rocket } from 'lucide-react';

// Pranks and Easter Eggs
const pranks = [
  {
    id: 'kana-arima',
    character: 'Kana Arima',
    message: 'Hun, so you\'re a fan of Kana Arima who had zero relevance?',
    image: 'https://images.pexels.com/photos/16776159/pexels-photo-16776159.jpeg',
    hairColor: '#ff4040',
  },
  {
    id: 'gojo-satoru',
    character: 'Gojo Satoru',
    message: 'Looking vibrant! My six eyes approve.',
    image: 'https://images.pexels.com/photos/19078622/pexels-photo-19078622.jpeg',
    hairColor: '#FFFFFF',
  },
  {
    id: 'marin-kitagawa',
    character: 'Marin Kitagawa',
    message: 'Wow! This cosplay coloring is so perfect!',
    image: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
    hairColor: '#FFD700',
  },
];

interface FunModeContextType {
  isFunModeEnabled: boolean;
  toggleFunMode: () => void;
  showRandomPrank: () => JSX.Element | null;
  FeatureAnnouncer: React.FC<{ feature: string }>;
}

const FunModeContext = createContext<FunModeContextType | undefined>(undefined);

export const FunModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFunModeEnabled, setIsFunModeEnabled] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('shikimanga_fun_mode');
    if (savedMode) {
      setIsFunModeEnabled(JSON.parse(savedMode));
    }
  }, []);

  const toggleFunMode = () => {
    const newMode = !isFunModeEnabled;
    setIsFunModeEnabled(newMode);
    localStorage.setItem('shikimanga_fun_mode', JSON.stringify(newMode));
  };

  const showRandomPrank = () => {
    if (!isFunModeEnabled) return null;

    const randomPrank = pranks[Math.floor(Math.random() * pranks.length)];

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 fade-in">
        <div className="bg-container p-6 rounded-lg shadow-custom max-w-md animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={randomPrank.image} 
              alt={randomPrank.character} 
              className="w-16 h-16 rounded-full object-cover border-2"
              style={{ borderColor: randomPrank.hairColor }}
            />
            <h3 className="text-xl font-bold">{randomPrank.character}</h3>
          </div>
          <p className="text-text-secondary mb-4">{randomPrank.message}</p>
          <button 
            className="btn btn-primary w-full"
            onClick={() => document.body.click()}
          >
            Got it!
          </button>
        </div>
      </div>
    );
  };

  const FeatureAnnouncer: React.FC<{ feature: string }> = ({ feature }) => {
    if (!isFunModeEnabled) return null;

    return (
      <div className="fixed bottom-4 right-4 bg-container p-3 rounded-lg shadow-custom flex items-center gap-2 text-sm animate-fade-in">
        <Rocket size={18} className="text-primary" />
        <span>
          <span className="font-bold gradient-text">{feature}</span> unlocked!
        </span>
      </div>
    );
  };

  return (
    <FunModeContext.Provider 
      value={{ 
        isFunModeEnabled, 
        toggleFunMode,
        showRandomPrank,
        FeatureAnnouncer,
      }}
    >
      {children}
    </FunModeContext.Provider>
  );
};

export const useFunMode = (): FunModeContextType => {
  const context = useContext(FunModeContext);
  if (context === undefined) {
    throw new Error('useFunMode must be used within a FunModeProvider');
  }
  return context;
};