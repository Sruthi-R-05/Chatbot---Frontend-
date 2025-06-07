import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Plus, 
  Settings, 
  Search, 
  MessageSquare, 
  User, 
  Mic, 
  Paperclip,
  MoreVertical,
  Sparkles,
  Zap,
  Image as ImageIcon,
  Wand2,
  Camera
} from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { ImageGenerator } from './components/ImageGenerator';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'image' | 'generated-image';
  imageUrl?: string;
  imagePrompt?: string;
}

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your advanced AI assistant with image capabilities. I can help you with coding, writing, analysis, creative tasks, problem-solving, image analysis, and image generation. What would you like to work on today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [chats] = useState<Chat[]>([
    { id: '1', title: 'AI Development Tips', lastMessage: 'Great insights on machine learning...', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: '2', title: 'React Best Practices', lastMessage: 'Thanks for the component patterns...', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: '3', title: 'Design Systems', lastMessage: 'The color palette looks amazing...', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: '4', title: 'Image Analysis Project', lastMessage: 'The image shows interesting patterns...', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateIntelligentResponse(currentInput),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1500); // 1.5-2.5 second delay
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `I've uploaded an image for analysis. Can you tell me what you see?`,
      isUser: true,
      timestamp: new Date(),
      type: 'image',
      imageUrl: imageUrl
    };

    setMessages(prev => [...prev, userMessage]);
    setShowImageUpload(false);
    setIsTyping(true);

    // Simulate image analysis response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateImageAnalysisResponse(),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleImageGeneration = (prompt: string) => {
    const generatedImageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      content: `I've generated an image based on your prompt: "${prompt}"`,
      isUser: false,
      timestamp: new Date(),
      type: 'generated-image',
      imageUrl: generatedImageUrl,
      imagePrompt: prompt
    };

    setMessages(prev => [...prev, aiMessage]);
    setShowImageGenerator(false);
  };

  const generateImageAnalysisResponse = (): string => {
    const responses = [
      "I can see this is an interesting image! Based on my analysis, I notice several key elements including colors, composition, and subject matter. The image appears to have good lighting and visual balance. I can help you understand specific aspects of what's shown - would you like me to focus on any particular details?",
      
      "This image contains various visual elements that I can analyze for you. I can see patterns in the composition, color scheme, and overall structure. The image quality appears clear and well-composed. What specific aspects would you like me to examine more closely?",
      
      "I've analyzed the uploaded image and can provide insights about its visual characteristics, composition, and content. The image shows interesting details that I can break down for you. Would you like me to focus on the technical aspects, artistic elements, or specific objects in the image?",
      
      "Great image! I can see various elements including the overall composition, color palette, and visual structure. The image has good clarity and interesting visual elements. I can provide detailed analysis of specific aspects - what would you like to know more about?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateIntelligentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Image-related requests
    if (input.includes('image') || input.includes('picture') || input.includes('photo')) {
      if (input.includes('generate') || input.includes('create') || input.includes('make')) {
        return "I can help you generate images! I have AI image generation capabilities that can create artwork, illustrations, photographs, and more based on your descriptions. You can click the image generation button (wand icon) to get started. What kind of image would you like me to create for you?";
      } else if (input.includes('analyze') || input.includes('look at') || input.includes('see')) {
        return "I can analyze images for you! I can examine photos, artwork, diagrams, screenshots, and more to provide detailed descriptions, identify objects, analyze composition, and answer questions about what's shown. You can upload an image using the attachment button. What image would you like me to analyze?";
      }
    }
    
    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! It's great to meet you. I'm here to help with any questions or tasks you have. Whether you need assistance with coding, writing, analysis, creative projects, image generation, image analysis, or just want to have a conversation, I'm ready to help. What's on your mind today?";
    }
    
    // Programming/coding questions
    if (input.includes('code') || input.includes('programming') || input.includes('javascript') || input.includes('react') || input.includes('python') || input.includes('html') || input.includes('css')) {
      return "I'd be happy to help with your programming question! I can assist with various programming languages including JavaScript, Python, React, HTML, CSS, and many others. I can help with debugging, code optimization, best practices, architecture decisions, and explaining complex concepts. I can also review code, suggest improvements, and help you learn new technologies. Could you share more details about what specific coding challenge you're working on?";
    }
    
    // Writing assistance
    if (input.includes('write') || input.includes('essay') || input.includes('article') || input.includes('content') || input.includes('blog')) {
      return "I'm excellent at helping with writing tasks! I can assist with essays, articles, blog posts, creative writing, technical documentation, emails, marketing copy, and more. I can help with brainstorming ideas, structuring content, improving clarity, grammar checking, adapting tone for different audiences, and ensuring your message is compelling and effective. What type of writing project are you working on?";
    }
    
    // Math/calculations
    if (input.includes('math') || input.includes('calculate') || input.includes('equation') || input.includes('solve')) {
      return "I can definitely help with math problems and calculations! I'm capable of handling arithmetic, algebra, calculus, statistics, geometry, trigonometry, and more complex mathematical concepts. I can solve equations step-by-step, explain mathematical concepts clearly, help with word problems, and provide detailed solutions with explanations. What mathematical challenge can I help you with?";
    }
    
    // Creative tasks
    if (input.includes('creative') || input.includes('idea') || input.includes('brainstorm') || input.includes('design') || input.includes('story')) {
      return "I love helping with creative projects! I can assist with brainstorming ideas, creative writing, storytelling, design concepts, marketing campaigns, innovative problem-solving, and artistic projects. I can also generate images to bring your creative visions to life! I can help generate fresh perspectives, think outside the box, and provide inspiration for your projects. What creative project are you working on? I'd love to help spark some inspiration!";
    }
    
    // Business/professional
    if (input.includes('business') || input.includes('marketing') || input.includes('strategy') || input.includes('professional')) {
      return "I can provide valuable assistance with business and professional matters! This includes marketing strategies, business planning, professional communication, market analysis, productivity tips, strategic decision-making, and competitive analysis. I can help you think through complex business challenges, provide actionable insights, and develop comprehensive strategies. What specific business area would you like to explore?";
    }
    
    // Learning/education
    if (input.includes('learn') || input.includes('explain') || input.includes('understand') || input.includes('teach')) {
      return "I'm here to help you learn and understand new concepts! I can explain complex topics in simple terms, provide step-by-step breakdowns, offer examples and analogies, create visual explanations, and adapt my teaching style to your preferences. I cover a wide range of subjects from science and technology to arts and humanities. I can also create images to help illustrate concepts visually. What would you like to learn about today?";
    }
    
    // Problem-solving
    if (input.includes('problem') || input.includes('issue') || input.includes('challenge') || input.includes('stuck')) {
      return "I'm great at helping solve problems and work through challenges! I can help you break down complex issues, analyze different approaches, weigh pros and cons, find creative solutions, and develop step-by-step action plans. Whether it's a technical problem, personal challenge, strategic decision, or creative block, I can provide structured thinking and fresh perspectives. Tell me more about the challenge you're facing.";
    }
    
    // Questions about AI capabilities
    if (input.includes('what can you do') || input.includes('capabilities') || input.includes('help with')) {
      return "I can help with a wide variety of tasks! My capabilities include: writing and editing, coding and programming, math and calculations, analysis and research, creative projects, problem-solving, learning and explanations, business strategy, image analysis, and image generation. I can adapt my communication style to your needs, provide detailed explanations or quick answers, work through complex multi-step problems, and even create visual content. What specific area interests you most?";
    }
    
    // Default intelligent responses based on context
    const contextualResponses = [
      "That's an interesting question! Let me provide you with a comprehensive answer. Based on what you've shared, I can offer several insights and approaches that might be helpful for your situation. I can also create visual aids or analyze images if that would be useful for your specific needs.",
      
      "I understand what you're looking for. This is actually a common topic that many people find valuable to explore. Let me break this down into clear, actionable information that you can use right away. If you need any visual examples or want me to generate illustrations, just let me know!",
      
      "Great question! This touches on some important concepts that are worth diving into. I'll provide you with both the foundational understanding and practical applications so you can get the most value from this information. I can also help visualize concepts through image generation if that would be helpful.",
      
      "I can definitely help with that! This is an area where I can provide detailed guidance and specific recommendations. Let me walk you through the key points and give you a clear path forward. If you have any images to analyze or need visual content created, I'm equipped to handle that too.",
      
      "That's a thoughtful inquiry that deserves a thorough response. I'll share some insights and practical advice that should address your needs and give you a solid foundation to build upon. My capabilities extend to both text-based assistance and visual content creation and analysis.",
      
      "Excellent topic to explore! I can offer you both theoretical background and practical steps you can take. This is something that can really make a difference when approached systematically. I'm also able to help with any visual elements you might need for your project.",
      
      "I'm glad you asked about this! It's a subject I can provide substantial help with. Let me give you a comprehensive overview along with specific recommendations tailored to what you're trying to achieve. Feel free to share any images for analysis or request visual content generation as needed."
    ];
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className="h-full backdrop-blur-xl bg-white/10 border-r border-white/20 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">AI Chat Pro</h1>
                <p className="text-white/60 text-sm">Advanced AI with Vision</p>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              New Chat
            </button>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-4">
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200 group border border-transparent hover:border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate group-hover:text-purple-300 transition-colors duration-200">
                        {chat.title}
                      </h3>
                      <p className="text-white/50 text-xs truncate mt-1">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200 group">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">User_name</p>
                <p className="text-white/50 text-xs">Premium Plan</p>
              </div>
              <Settings className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors duration-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="backdrop-blur-xl bg-white/10 border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
              >
                <MessageSquare className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">AI Assistant</h2>
                  <p className="text-white/60 text-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Online • Vision Enabled
                  </p>
                </div>
              </div>
            </div>
            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200">
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {!message.isUser && (
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[70%] p-4 rounded-2xl backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] ${
                    message.isUser
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white ml-auto'
                      : 'bg-white/10 border border-white/20 text-white'
                  }`}
                >
                  {message.imageUrl && (
                    <div className="mb-3">
                      <img
                        src={message.imageUrl}
                        alt={message.type === 'generated-image' ? `Generated: ${message.imagePrompt}` : 'Uploaded image'}
                        className="max-w-full h-auto rounded-lg"
                      />
                      {message.type === 'generated-image' && message.imagePrompt && (
                        <p className={`text-xs mt-2 italic ${message.isUser ? 'text-white/70' : 'text-white/50'}`}>
                          Prompt: {message.imagePrompt}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.isUser ? 'text-white/70' : 'text-white/50'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.isUser && (
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4 justify-start animate-fadeIn">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animation-delay-200"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="backdrop-blur-xl bg-white/10 border-t border-white/20 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-4">
              <div className="flex-1 relative">
                <div className="flex items-center gap-2 p-3 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-transparent transition-all duration-200">
                  <button 
                    onClick={() => setShowImageUpload(true)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/60 hover:text-white"
                    title="Upload Image"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  
                  <button 
                    onClick={() => setShowImageUpload(true)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/60 hover:text-white"
                    title="Analyze Image"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  
                  <button 
                    onClick={() => setShowImageGenerator(true)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/60 hover:text-white"
                    title="Generate Image"
                  >
                    <Wand2 className="w-4 h-4" />
                  </button>
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything - I can help with coding, writing, analysis, images, and more..."
                    className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none py-1"
                  />
                  
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/60 hover:text-white">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-white/40 text-xs text-center mt-3">
              AI Chat Pro can make mistakes. Consider checking important information. • Image analysis and generation available
            </p>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <ImageUpload
          onImageSelect={handleImageUpload}
          onClose={() => setShowImageUpload(false)}
        />
      )}

      {/* Image Generator Modal */}
      {showImageGenerator && (
        <ImageGenerator
          onGenerate={handleImageGeneration}
          onClose={() => setShowImageGenerator(false)}
        />
      )}
    </div>
  );
}

export default App;