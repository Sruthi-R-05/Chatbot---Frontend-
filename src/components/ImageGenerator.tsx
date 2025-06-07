import React, { useState } from 'react';
import { Wand2, X, Download, Sparkles } from 'lucide-react';

interface ImageGeneratorProps {
  onClose: () => void;
  onGenerate: (prompt: string) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate image generation with a delay
    setTimeout(() => {
      // Use a placeholder image service for demo
      const imageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      setGeneratedImage(imageUrl);
      setIsGenerating(false);
      onGenerate(prompt);
    }, 3000);
  };

  const suggestedPrompts = [
    "A futuristic cityscape at sunset",
    "A magical forest with glowing mushrooms",
    "Abstract digital art with vibrant colors",
    "A cozy coffee shop in the rain",
    "Minimalist mountain landscape"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold text-xl">AI Image Generator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3">
              Describe the image you want to create:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A beautiful landscape with mountains and a lake at golden hour..."
              className="w-full h-24 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          <div>
            <p className="text-white/70 text-sm mb-3">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white/80 text-sm transition-all duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Image
              </>
            )}
          </button>

          {isGenerating && (
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <p className="text-white font-medium mb-2">Creating your image...</p>
              <p className="text-white/60 text-sm">This may take a few moments</p>
            </div>
          )}

          {generatedImage && (
            <div className="bg-white/5 rounded-xl p-4">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => setGeneratedImage(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
                >
                  Generate New
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};