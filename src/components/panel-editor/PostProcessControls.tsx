import React from 'react';
import { Sliders, Contrast, Grid, SunDim } from 'lucide-react';

interface PostProcessSettings {
  contrast: number;
  shadingIntensity: number;
  screentoneDensity: number;
}

interface PostProcessControlsProps {
  settings: PostProcessSettings;
  onChange: (settings: PostProcessSettings) => void;
}

const PostProcessControls: React.FC<PostProcessControlsProps> = ({ settings, onChange }) => {
  const handleChange = (property: keyof PostProcessSettings, value: number) => {
    onChange({
      ...settings,
      [property]: value,
    });
  };

  return (
    <div className="bg-container rounded-lg p-4 shadow-custom">
      <div className="flex items-center mb-4">
        <Sliders size={18} className="text-primary mr-2" />
        <h3 className="font-medium">Post-Processing</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm flex items-center">
              <Contrast size={14} className="mr-1" />
              Contrast: {settings.contrast}%
            </label>
            <span className="text-xs text-text-secondary">
              {settings.contrast < 30 ? 'Low' : settings.contrast < 70 ? 'Medium' : 'High'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.contrast}
            onChange={(e) => handleChange('contrast', parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none bg-background cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm flex items-center">
              <SunDim size={14} className="mr-1" />
              Shading Intensity: {settings.shadingIntensity}%
            </label>
            <span className="text-xs text-text-secondary">
              {settings.shadingIntensity < 30 ? 'Subtle' : settings.shadingIntensity < 70 ? 'Balanced' : 'Dramatic'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.shadingIntensity}
            onChange={(e) => handleChange('shadingIntensity', parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none bg-background cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm flex items-center">
              <Grid size={14} className="mr-1" />
              Screentone Density: {settings.screentoneDensity}%
            </label>
            <span className="text-xs text-text-secondary">
              {settings.screentoneDensity < 30 ? 'Minimal' : settings.screentoneDensity < 70 ? 'Moderate' : 'Dense'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.screentoneDensity}
            onChange={(e) => handleChange('screentoneDensity', parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none bg-background cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-background rounded-lg">
        <p className="text-xs text-text-secondary">
          Adjusting these settings will affect how your colorized manga panel looks in terms of 
          contrast, shading depth, and the density of screentone patterns.
        </p>
      </div>
    </div>
  );
};

export default PostProcessControls;