import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image, Rect, Transformer } from 'react-konva';
import useImage from 'use-image';
import { ChevronUp, ChevronDown, Eye, EyeOff, Trash2 } from 'lucide-react';

interface Layer {
  id: string;
  name: string;
  type: 'hair' | 'eyes' | 'clothes' | 'background' | 'custom';
  visible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  opacity: number;
}

interface LayeredEditorProps {
  originalImage?: string;
  colorizedImage?: string;
  layers: Layer[];
  onLayersChange: (layers: Layer[]) => void;
  width: number;
  height: number;
}

const LayeredEditor: React.FC<LayeredEditorProps> = ({
  originalImage,
  colorizedImage,
  layers,
  onLayersChange,
  width,
  height,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const transformerRef = useRef<any>(null);
  const [currentLayers, setCurrentLayers] = useState<Layer[]>(layers);
  
  const [originalImg] = useImage(originalImage || '');
  const [colorizedImg] = useImage(colorizedImage || '');

  useEffect(() => {
    setCurrentLayers(layers);
  }, [layers]);

  useEffect(() => {
    if (selectedId && transformerRef.current) {
      // Find the selected node by id
      const selectedNode = transformerRef.current.getStage().findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const handleSelect = (id: string) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const id = node.id();
    
    // Update layer with new position and size
    const updatedLayers = currentLayers.map(layer => {
      if (layer.id === id) {
        return {
          ...layer,
          x: node.x(),
          y: node.y(),
          width: node.width() * node.scaleX(),
          height: node.height() * node.scaleY(),
        };
      }
      return layer;
    });
    
    setCurrentLayers(updatedLayers);
    onLayersChange(updatedLayers);
    
    // Reset scale after updating dimensions
    node.scaleX(1);
    node.scaleY(1);
  };

  const toggleLayerVisibility = (id: string) => {
    const updatedLayers = currentLayers.map(layer => {
      if (layer.id === id) {
        return {
          ...layer,
          visible: !layer.visible,
        };
      }
      return layer;
    });
    
    setCurrentLayers(updatedLayers);
    onLayersChange(updatedLayers);
  };

  const moveLayer = (id: string, direction: 'up' | 'down') => {
    const index = currentLayers.findIndex(layer => layer.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === currentLayers.length - 1)) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedLayers = [...currentLayers];
    const [movedLayer] = updatedLayers.splice(index, 1);
    updatedLayers.splice(newIndex, 0, movedLayer);
    
    setCurrentLayers(updatedLayers);
    onLayersChange(updatedLayers);
  };

  const removeLayer = (id: string) => {
    const updatedLayers = currentLayers.filter(layer => layer.id !== id);
    setCurrentLayers(updatedLayers);
    onLayersChange(updatedLayers);
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const updateLayerOpacity = (id: string, opacity: number) => {
    const updatedLayers = currentLayers.map(layer => {
      if (layer.id === id) {
        return {
          ...layer,
          opacity,
        };
      }
      return layer;
    });
    
    setCurrentLayers(updatedLayers);
    onLayersChange(updatedLayers);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div 
        className="w-full md:w-2/3 bg-container rounded-lg shadow-custom overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div className="flex border-b border-gray-700 p-2">
          <button 
            className={`px-4 py-1 rounded-t-lg text-sm font-medium ${
              !showOriginal ? 'bg-primary text-white' : 'bg-background text-text-secondary'
            }`}
            onClick={() => setShowOriginal(false)}
          >
            Colorized
          </button>
          <button 
            className={`px-4 py-1 rounded-t-lg text-sm font-medium ${
              showOriginal ? 'bg-primary text-white' : 'bg-background text-text-secondary'
            }`}
            onClick={() => setShowOriginal(true)}
          >
            Original
          </button>
        </div>

        <div className="h-full">
          <Stage width={width} height={height - 35}>
            {/* Base Image Layer */}
            <Layer>
              {showOriginal ? (
                originalImg && <Image image={originalImg} width={width} height={height - 35} />
              ) : (
                colorizedImg && <Image image={colorizedImg} width={width} height={height - 35} />
              )}
            </Layer>
            
            {/* Editable Layers */}
            <Layer>
              {currentLayers.filter(layer => layer.visible).map((layer) => (
                <Rect
                  key={layer.id}
                  id={layer.id}
                  x={layer.x}
                  y={layer.y}
                  width={layer.width}
                  height={layer.height}
                  fill={layer.color || 'rgba(255, 105, 180, 0.3)'}
                  opacity={layer.opacity}
                  onClick={() => handleSelect(layer.id)}
                  onTap={() => handleSelect(layer.id)}
                  onTransformEnd={handleTransformEnd}
                  draggable
                />
              ))}
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  // Limit size
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            </Layer>
          </Stage>
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-container rounded-lg shadow-custom p-4 overflow-y-auto" style={{ height: `${height}px` }}>
        <h3 className="font-semibold mb-4 text-lg">Layers</h3>
        
        <div className="space-y-2">
          {currentLayers.map((layer, index) => (
            <div 
              key={layer.id}
              className={`bg-background rounded-lg p-3 ${
                selectedId === layer.id ? 'border border-primary' : ''
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <button 
                    className="mr-2 text-text-secondary hover:text-primary"
                    onClick={() => toggleLayerVisibility(layer.id)}
                  >
                    {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <span 
                    className={`font-medium ${layer.visible ? 'text-text-primary' : 'text-text-secondary'}`}
                    onClick={() => handleSelect(layer.id)}
                  >
                    {layer.name}
                  </span>
                </div>
                <div className="flex space-x-1">
                  <button 
                    className="text-text-secondary hover:text-primary"
                    onClick={() => moveLayer(layer.id, 'up')}
                    disabled={index === 0}
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button 
                    className="text-text-secondary hover:text-primary"
                    onClick={() => moveLayer(layer.id, 'down')}
                    disabled={index === currentLayers.length - 1}
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button 
                    className="text-text-secondary hover:text-error"
                    onClick={() => removeLayer(layer.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="mt-2">
                <label className="text-xs text-text-secondary block mb-1">
                  Opacity: {Math.round(layer.opacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={layer.opacity}
                  onChange={(e) => updateLayerOpacity(layer.id, parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none bg-background cursor-pointer"
                />
              </div>
              
              {layer.color && (
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-text-secondary block mr-2">Color:</span>
                  <div 
                    className="w-6 h-6 rounded border border-gray-700"
                    style={{ backgroundColor: layer.color }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {currentLayers.length === 0 && (
          <div className="text-center text-text-secondary py-4">
            No layers added yet. Use the tools to create layers.
          </div>
        )}
      </div>
    </div>
  );
};

export default LayeredEditor;