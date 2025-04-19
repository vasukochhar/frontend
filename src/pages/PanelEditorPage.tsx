import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Save, Share, AlertTriangle, Check, Image as ImageIcon } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import LayeredEditor from '../components/panel-editor/LayeredEditor';
import ColorPicker from '../components/panel-editor/ColorPicker';
import PostProcessControls from '../components/panel-editor/PostProcessControls';
import StyleSelector from '../components/panel-editor/StyleSelector';
import { useFunMode } from '../contexts/FunModeContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const PanelEditorPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [colorizedImage, setColorizedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [layers, setLayers] = useState<any[]>([]);
  const [editorTab, setEditorTab] = useState('layered');
  const [showAuthenticModal, setShowAuthenticModal] = useState(false);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const { showRandomPrank, FeatureAnnouncer } = useFunMode();

  // Form state
  const [hairColor, setHairColor] = useState('#FFD700');
  const [eyeColor, setEyeColor] = useState('#FF69B4');
  const [clothesColor, setClothesColor] = useState('#191970');
  const [characterName, setCharacterName] = useState('');
  const [mangaTitle, setMangaTitle] = useState('');
  const [context, setContext] = useState('');
  const [coloringMode, setColoringMode] = useState('character');
  const [styleId, setStyleId] = useState('anime-style');
  
  const [postProcessSettings, setPostProcessSettings] = useState({
    contrast: 50,
    shadingIntensity: 60,
    screentoneDensity: 30,
  });

  // Dropzone for original panel
  const onOriginalDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
        setShowReferenceModal(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps: getOriginalRootProps, getInputProps: getOriginalInputProps } = useDropzone({
    onDrop: onOriginalDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
  });

  // Dropzone for reference panel
  const onReferenceDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReferenceImage(reader.result as string);
        toast.success('Reference image uploaded! This will improve colorization accuracy.');
        setShowReferenceModal(false);
        
        // For demo purposes, we'll also set a placeholder colorized image
        // In a real app, this would be the result of the AI colorization
        setColorizedImage(originalImage);
        
        // Add some initial layers for demo
        setLayers([
          {
            id: 'hair-layer',
            name: 'Hair',
            type: 'hair',
            visible: true,
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            color: hairColor,
            opacity: 0.7,
          },
          {
            id: 'eyes-layer',
            name: 'Eyes',
            type: 'eyes',
            visible: true,
            x: 80,
            y: 80,
            width: 40,
            height: 20,
            color: eyeColor,
            opacity: 0.8,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  }, [originalImage, hairColor, eyeColor]);

  const { getRootProps: getReferenceRootProps, getInputProps: getReferenceInputProps } = useDropzone({
    onDrop: onReferenceDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
  });

  const handleSkipReference = () => {
    setShowReferenceModal(false);
    setColorizedImage(originalImage);
    
    // Add initial layers
    setLayers([
      {
        id: 'hair-layer',
        name: 'Hair',
        type: 'hair',
        visible: true,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        color: hairColor,
        opacity: 0.7,
      },
      {
        id: 'eyes-layer',
        name: 'Eyes',
        type: 'eyes',
        visible: true,
        x: 80,
        y: 80,
        width: 40,
        height: 20,
        color: eyeColor,
        opacity: 0.8,
      },
    ]);
  };

  const handleColorize = () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowAuthenticModal(true);
      toast.success('Panel colorized successfully!');
    }, 2000);
  };

  const handleAuthenticResponse = (isAuthentic: boolean) => {
    setShowAuthenticModal(false);
    if (isAuthentic) {
      toast.success('Colors marked as authentic! Added to character database.');
    } else {
      toast.success('Thanks for your feedback! We\'ll improve our colorization.');
    }
  };

  const handleSave = () => {
    toast.success('Panel saved successfully!');
    showRandomPrank();
  };

  const handleShare = () => {
    toast.success('Panel shared to community!');
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      
      <div className="pt-20 flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Panel Editor</h1>
            
            <div className="flex space-x-2">
              <button 
                className="btn btn-secondary flex items-center text-sm"
                onClick={handleSave}
              >
                <Save size={16} className="mr-2" />
                Save
              </button>
              <button 
                className="btn btn-primary flex items-center text-sm"
                onClick={handleShare}
              >
                <Share size={16} className="mr-2" />
                Share
              </button>
            </div>
          </div>
          
          {!originalImage ? (
            <motion.div 
              className="grid grid-cols-1 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-container rounded-lg shadow-custom p-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Upload Your Manga Panel</h2>
                <p className="text-text-secondary text-center mb-8">
                  Start by uploading a black and white manga panel. We'll help you bring it to life with vibrant colors!
                </p>
                
                <div 
                  {...getOriginalRootProps()} 
                  className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors bg-background/50"
                >
                  <input {...getOriginalInputProps()} />
                  <Upload size={48} className="mx-auto mb-4 text-primary" />
                  <p className="text-lg text-text-secondary mb-2">
                    Drag & drop your manga panel here
                  </p>
                  <p className="text-sm text-text-secondary mb-4">
                    or click to select from your computer
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                
                <div className="mt-8 p-4 bg-background rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <ImageIcon size={16} className="text-primary mr-2" />
                    Tips for best results:
                  </h3>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• Use high-quality scans or screenshots</li>
                    <li>• Ensure the panel is clear and well-defined</li>
                    <li>• Include character faces for better recognition</li>
                    <li>• Avoid panels with heavy screentone patterns</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-container rounded-lg shadow-custom p-4">
                  <div className="flex border-b border-gray-700 mb-4">
                    <button 
                      className={`px-4 py-2 text-sm font-medium ${
                        editorTab === 'layered' 
                          ? 'border-b-2 border-primary text-primary' 
                          : 'text-text-secondary'
                      }`}
                      onClick={() => setEditorTab('layered')}
                    >
                      Layered Editor
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium ${
                        editorTab === 'comparison' 
                          ? 'border-b-2 border-primary text-primary' 
                          : 'text-text-secondary'
                      }`}
                      onClick={() => setEditorTab('comparison')}
                    >
                      Before/After
                    </button>
                  </div>
                  
                  {editorTab === 'layered' && (
                    <LayeredEditor
                      originalImage={originalImage}
                      colorizedImage={colorizedImage || undefined}
                      layers={layers}
                      onLayersChange={setLayers}
                      width={600}
                      height={500}
                    />
                  )}
                  
                  {editorTab === 'comparison' && (
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/2">
                        <h3 className="text-center mb-2 font-medium">Original</h3>
                        <div className="aspect-square overflow-hidden rounded-lg bg-black">
                          {originalImage && (
                            <img 
                              src={originalImage} 
                              alt="Original manga panel" 
                              className="w-full h-full object-contain grayscale"
                            />
                          )}
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <h3 className="text-center mb-2 font-medium">Colorized</h3>
                        <div className="aspect-square overflow-hidden rounded-lg bg-black">
                          {colorizedImage && (
                            <img 
                              src={colorizedImage} 
                              alt="Colorized manga panel" 
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-container rounded-lg shadow-custom p-6">
                  <h2 className="text-xl font-semibold mb-4">Character Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Character Name
                      </label>
                      <input
                        type="text"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                        placeholder="e.g., Marin Kitagawa"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Manga Title
                      </label>
                      <input
                        type="text"
                        value={mangaTitle}
                        onChange={(e) => setMangaTitle(e.target.value)}
                        placeholder="e.g., My Dress-Up Darling"
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Context
                    </label>
                    <input
                      type="text"
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="e.g., cosplay, battle scene"
                      className="input"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Coloring Mode
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <label className="flex items-center p-3 bg-background rounded-lg cursor-pointer hover:bg-gray-800">
                        <input
                          type="radio"
                          name="coloringMode"
                          value="character"
                          checked={coloringMode === 'character'}
                          onChange={() => setColoringMode('character')}
                          className="mr-2"
                        />
                        <span>Character-Specific</span>
                      </label>
                      <label className="flex items-center p-3 bg-background rounded-lg cursor-pointer hover:bg-gray-800">
                        <input
                          type="radio"
                          name="coloringMode"
                          value="scene"
                          checked={coloringMode === 'scene'}
                          onChange={() => setColoringMode('scene')}
                          className="mr-2"
                        />
                        <span>Scene-Specific</span>
                      </label>
                      <label className="flex items-center p-3 bg-background rounded-lg cursor-pointer hover:bg-gray-800">
                        <input
                          type="radio"
                          name="coloringMode"
                          value="general"
                          checked={coloringMode === 'general'}
                          onChange={() => setColoringMode('general')}
                          className="mr-2"
                        />
                        <span>General Palette</span>
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full btn btn-primary flex items-center justify-center"
                    onClick={handleColorize}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="spinner !w-5 !h-5 border-white border-t-transparent" />
                    ) : (
                      <>Colorize</>
                    )}
                  </button>
                  
                  {referenceImage && (
                    <div className="mt-4 p-3 bg-background rounded-lg flex items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
                        <img 
                          src={referenceImage} 
                          alt="Reference" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Reference image uploaded</p>
                        <p className="text-xs text-text-secondary">
                          Will be used to improve color accuracy
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                <ColorPicker
                  initialColor={hairColor}
                  onChange={setHairColor}
                  label="Hair Color"
                  presetColors={['#FFD700', '#FFA500', '#FF4500', '#DC143C', '#8B0000', '#000000', '#696969', '#FFFFFF', '#F5F5DC', '#F0E68C']}
                />
                
                <ColorPicker
                  initialColor={eyeColor}
                  onChange={setEyeColor}
                  label="Eye Color"
                  presetColors={['#FF69B4', '#FF1493', '#C71585', '#DB7093', '#800080', '#4B0082', '#0000FF', '#1E90FF', '#00BFFF', '#ADD8E6']}
                />
                
                <ColorPicker
                  initialColor={clothesColor}
                  onChange={setClothesColor}
                  label="Clothes Color"
                  presetColors={['#191970', '#000080', '#00008B', '#0000CD', '#4169E1', '#6495ED', '#B0C4DE', '#708090', '#778899', '#A9A9A9']}
                />
                
                <StyleSelector
                  selectedStyle={styleId}
                  onChange={setStyleId}
                />
                
                <PostProcessControls
                  settings={postProcessSettings}
                  onChange={setPostProcessSettings}
                />
              </div>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
      
      {/* Reference Image Modal */}
      <AnimatePresence>
        {showReferenceModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-container rounded-lg shadow-custom max-w-md w-full p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-center mb-4">
                Would you like to add a reference image?
              </h3>
              
              <p className="text-text-secondary text-center mb-6">
                Adding a reference image can help improve colorization accuracy, especially for specific characters or scenes.
              </p>
              
              <div 
                {...getReferenceRootProps()} 
                className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors mb-4"
              >
                <input {...getReferenceInputProps()} />
                <Upload size={32} className="mx-auto mb-3 text-primary" />
                <p className="text-sm text-text-secondary mb-2">
                  Drop a reference image here or click to select
                </p>
              </div>
              
              <button 
                className="w-full btn btn-secondary"
                onClick={handleSkipReference}
              >
                Skip for now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Authentic Colors Modal */}
      <AnimatePresence>
        {showAuthenticModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-container rounded-lg shadow-custom max-w-md w-full p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle size={40} className="text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-center mb-2">
                Are these colors authentic?
              </h3>
              
              <p className="text-text-secondary text-center mb-6">
                Help improve our character database by letting us know if these colors match the character's authentic appearance.
              </p>
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 btn btn-secondary flex items-center justify-center"
                  onClick={() => handleAuthenticResponse(false)}
                >
                  No
                </button>
                <button 
                  className="flex-1 btn btn-primary flex items-center justify-center"
                  onClick={() => handleAuthenticResponse(true)}
                >
                  <Check size={16} className="mr-2" />
                  Yes, Authentic
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <FeatureAnnouncer feature="Advanced Color Picker" />
    </div>
  );
};

export default PanelEditorPage;