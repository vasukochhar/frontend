import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, PartyPopper as Eyedropper, History } from 'lucide-react';

interface ColorPickerProps {
  initialColor: string;
  onChange: (color: string) => void;
  onClose?: () => void;
  label?: string;
  presetColors?: string[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  initialColor,
  onChange,
  onClose,
  label = 'Color',
  presetColors = ['#FFD700', '#FF69B4', '#191970', '#FF4500', '#32CD32', '#4169E1', '#800080', '#FF6347', '#483D8B', '#FFFFFF']
}) => {
  const [color, setColor] = useState(initialColor);
  const [showPicker, setShowPicker] = useState(false);
  const [colorHistory, setColorHistory] = useState<string[]>([initialColor]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex);
    onChange(newColor.hex);
  };

  const handleColorChangeComplete = (newColor: any) => {
    // Add to history only if different from last color
    if (colorHistory[colorHistory.length - 1] !== newColor.hex) {
      const newHistory = [...colorHistory.slice(0, historyIndex + 1), newColor.hex];
      setColorHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setColor(colorHistory[newIndex]);
      onChange(colorHistory[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < colorHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setColor(colorHistory[newIndex]);
      onChange(colorHistory[newIndex]);
    }
  };

  return (
    <div className="bg-container rounded-lg p-4 shadow-custom">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Palette size={18} className="text-primary mr-2" />
          <span className="font-medium">{label}</span>
        </div>
        <div className="flex space-x-2">
          <button 
            className="text-text-secondary hover:text-primary p-1 rounded"
            onClick={handleUndo}
            disabled={historyIndex === 0}
          >
            <History size={16} />
          </button>
          <button 
            className="text-text-secondary hover:text-primary p-1 rounded"
            onClick={() => setShowPicker(!showPicker)}
          >
            <Eyedropper size={16} />
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <div 
          className="w-10 h-10 rounded border border-gray-700 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <input 
          type="text" 
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            onChange(e.target.value);
          }}
          className="bg-background text-text-primary border border-gray-700 rounded px-2 text-sm flex-grow"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {presetColors.map((presetColor, i) => (
          <button 
            key={i}
            className={`w-6 h-6 rounded border-2 transition-transform hover:scale-110 ${
              color === presetColor ? 'border-white' : 'border-gray-700'
            }`}
            style={{ backgroundColor: presetColor }}
            onClick={() => {
              setColor(presetColor);
              onChange(presetColor);
              handleColorChangeComplete({ hex: presetColor });
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2"
          >
            <SketchPicker
              color={color}
              onChange={handleColorChange}
              onChangeComplete={handleColorChangeComplete}
              presetColors={presetColors}
              styles={{
                default: {
                  picker: {
                    background: '#2a2a2a',
                    boxShadow: 'none',
                    width: '100%'
                  },
                  input: {
                    background: '#1a1a1a',
                    boxShadow: 'none',
                    color: '#ffffff'
                  }
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;