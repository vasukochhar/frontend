import React from 'react';
import { PaintBucket, Check } from 'lucide-react';

interface StyleOption {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface StyleSelectorProps {
  selectedStyle: string;
  onChange: (styleId: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onChange }) => {
  const styles: StyleOption[] = [
    {
      id: 'hand-drawn',
      name: 'Hand-Drawn',
      description: 'Colorful style with visible brush strokes and texture',
      image: 'https://images.pexels.com/photos/1089027/pexels-photo-1089027.jpeg',
    },
    {
      id: 'anime-style',
      name: 'Anime-Style',
      description: 'Clean, vibrant colors similar to modern anime',
      image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    },
    {
      id: 'cel-shading',
      name: 'Cel-Shading',
      description: 'Bold colors with distinct, hard-edged shadows',
      image: 'https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg',
    },
    {
      id: 'vintage-manga',
      name: 'Vintage Manga',
      description: 'Muted colors with retro screentone patterns',
      image: 'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg',
    },
    {
      id: 'fan-art',
      name: 'Fan Art',
      description: 'Stylized coloring inspired by popular fan artists',
      image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    },
  ];

  return (
    <div className="bg-container rounded-lg p-4 shadow-custom">
      <div className="flex items-center mb-4">
        <PaintBucket size={18} className="text-primary mr-2" />
        <h3 className="font-medium">Coloring Style</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {styles.map((style) => (
          <div
            key={style.id}
            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
              selectedStyle === style.id ? 'ring-2 ring-primary' : 'ring-1 ring-gray-700'
            }`}
            onClick={() => onChange(style.id)}
          >
            <img
              src={style.image}
              alt={style.name}
              className="w-full h-24 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-2">
              <h4 className="text-white text-sm font-medium">{style.name}</h4>
            </div>
            
            {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                <Check size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-background rounded-lg">
        <p className="text-xs text-text-secondary">
          <span className="font-medium text-primary">
            {styles.find(s => s.id === selectedStyle)?.name}:
          </span>{' '}
          {styles.find(s => s.id === selectedStyle)?.description}
        </p>
      </div>
    </div>
  );
};

export default StyleSelector;