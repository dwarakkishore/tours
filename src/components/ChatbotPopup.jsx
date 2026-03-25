"use client";

import { useState, useRef, useEffect, useMemo, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, Send, Bot, User, Sparkles, MapPin, Calendar, Users, ArrowRight, ChevronLeft, ChevronRight, RotateCcw, Copy, ThumbsUp, ThumbsDown, Pencil, Trash2, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPackagesByRegion, getPackagesByTheme } from "@/utils/firebase";
import { useRegionsData } from "@/hooks/regions/useRegionsData";
import PackageCard from "@/components/ui/PackageCard";
import BadgeSection from "@/components/BadgeSection";

const ChatPackageCard = ({ item, onViewItinerary }) => {
  const [showAllHighlights, setShowAllHighlights] = useState(false);

  // Enhanced Multi-Source Image Scavenger
  const imageUrl = useMemo(() => {
    const scavenger = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return [val];
    };

    const rawImages = [
      ...scavenger(item.cardImages),
      ...(item.cardImage ? [{ url: item.cardImage }] : []),
      ...(item.cardImageRef ? [{ url: item.cardImageRef }] : []),
    ];

    const firstValid = rawImages.find(img => typeof img === "string" ? img : img?.url);
    return typeof firstValid === "string" ? firstValid : firstValid?.url;
  }, [item.cardImages, item.cardImage, item.cardImageRef]);

  const highlights = useMemo(() => {
    if (Array.isArray(item.highlights)) return item.highlights;
    if (typeof item.highlights === 'string') return [item.highlights];
    return [
      "Premium Accommodation",
      "Expert Guided Tours",
      "Curated Experiences"
    ];
  }, [item.highlights]);

  const visibleHighlights = showAllHighlights ? highlights : highlights.slice(0, 3);
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[16/10] w-full">
        {imageUrl ? (
          <img src={imageUrl} alt={item.packageTitle} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            <MapPin className="w-6 h-6" />
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-20">
          <div className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full w-fit">
            {item.days}D/{item.nights}N
          </div>
          <BadgeSection item={item} />
        </div>
      </div>
      <div className="pt-3 px-4 pb-4">
        <h4 className="font-bold text-sm text-gray-900 line-clamp-1 mb-3">{item.packageTitle}</h4>
        
        {/* Highlights Section */}
        <div className="space-y-2 mb-4">
          {visibleHighlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
              <p className="text-[12px] text-gray-600 italic font-medium leading-tight">
                {highlight}
              </p>
            </div>
          ))}
          
          {highlights.length > 3 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowAllHighlights(!showAllHighlights);
              }}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors mt-1 flex items-center gap-1"
            >
              {showAllHighlights ? "Show Less" : `+${highlights.length - 3} More Highlights`}
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-50">
          <div>
            <span className="text-blue-600 font-bold text-base">₹{item.offerPrice || item.basePrice}</span>
            {item.offerPrice > 0 && item.basePrice > 0 && (
              <span className="text-xs text-gray-400 line-through ml-1.5">₹{item.basePrice}</span>
            )}
          </div>
          <button 
            onClick={() => onViewItinerary(item)}
            className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatItineraryView = ({ itineraries }) => {
  const [openDay, setOpenDay] = useState(0);

  if (!itineraries || itineraries.length === 0) return null;

  return (
    <div className="space-y-3 mt-4 animate-fadeIn">
      <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">Day wise Itinerary</h3>
      
      {itineraries.map((day, idx) => {
        const isOpen = openDay === idx;
        return (
          <div 
            key={idx} 
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
          >
            <button 
              onClick={() => setOpenDay(isOpen ? -1 : idx)}
              className="w-full flex items-stretch text-left"
            >
              <div className="bg-blue-50/50 w-16 py-3 flex flex-col items-center justify-center border-r border-slate-50">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1 opacity-60">
                  Day
                </span>
                <span className="text-xl font-bold text-blue-600 leading-none tracking-tighter">
                  {day.day?.toString().padStart(2, '0') || (idx + 1).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center gap-1">
                <span className="font-bold text-sm text-slate-900 line-clamp-1">{day.title}</span>
                {day.overnight && (
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-blue-500" />
                    Stay: {day.overnight}
                  </span>
                )}
              </div>
              <div className="pr-4 flex items-center">
                <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
              </div>
            </button>
            
            {isOpen && (
              <div className="px-5 pb-5 pt-3 space-y-5 animate-fadeIn">
                <div className="h-[1px] bg-slate-50 w-full mb-2" />
                {day.activities ? (
                  day.activities.map((act, actIdx) => {
                    const clean = (txt) => typeof txt === 'string' ? txt.replace(/^[•\-\s\*]+/, '').trim() : txt;
                    return (
                      <div key={actIdx} className="relative pl-7 group">
                        <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full border-2 border-blue-500 bg-white" />
                        {actIdx !== day.activities.length - 1 && (
                          <div className="absolute left-[4.5px] top-5 bottom-[-20px] w-[1px] bg-slate-100" />
                        )}
                        {typeof act === 'string' ? (
                          <p className="text-sm text-slate-800 leading-relaxed font-semibold">{clean(act)}</p>
                        ) : (
                          <>
                            <p className="text-sm font-bold text-slate-900 mb-1">{clean(act.activity)}</p>
                            <p className="text-[13px] text-slate-500 leading-relaxed italic">{clean(act.description)}</p>
                          </>
                        )}
                      </div>
                    );
                  })
                ) : day.description ? (
                  <div className="space-y-4">
                    {day.description.split('\n').map((line, lIdx) => {
                      if (!line.trim()) return null;
                      const clean = (txt) => typeof txt === 'string' ? txt.replace(/^[•\-\s\*]+/, '').trim() : txt;
                      const cleanedLine = clean(line);
                      return (
                        <div key={lIdx} className="flex gap-3 items-start">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {cleanedLine.includes(':') ? (
                              <>
                                <span className="font-bold text-slate-900">{cleanedLine.split(':')[0]}:</span>
                                <span>{cleanedLine.split(':').slice(1).join(':')}</span>
                              </>
                            ) : cleanedLine}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic text-center py-2">No details available for this day</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ChatMessage = memo(({ 
  message, 
  isLast,
  isMounted, 
  handleCopy, 
  handleEdit, 
  onRegenerate,
  handleViewItinerary
}) => {
  return (
    <div
      className={`flex ${isLast ? "animate-fadeIn" : ""} ${
        message.sender === "user" ? "flex-row-reverse" : "flex-row"
      }`}
      style={{ animationDelay: isLast ? "0.1s" : "0s" }}
    >
      <div
        className={`${(message.type === 'itinerary' || (message.packages && message.packages.length > 0)) ? 'w-full' : 'max-w-[85%]'} rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md ${
          message.sender === "user"
            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none"
            : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
        }`}
      >
        {message.isHtml && message.sender === "bot" ? (
          <div className="space-y-3">
            <div 
              className="text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: message.formattedText || message.text }}
            />
            
            {message.packages && message.packages.length > 0 && (
              <div className="relative mt-3">
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar-hide">
                  {message.packages.map((pkg) => (
                    <div key={pkg.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                      <ChatPackageCard item={pkg} onViewItinerary={handleViewItinerary} />
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400 font-medium">
                  <ArrowRight className="w-3 h-3" />
                  <span>Scroll for more packages</span>
                </div>
              </div>
            )}

            {message.type === 'itinerary' && (
              <ChatItineraryView itineraries={message.itineraries} />
            )}
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
        )}
        <p
          className={`text-xs mt-1.5 ${
            message.sender === "user"
              ? "text-blue-100"
              : "text-gray-400"
          }`}
        >
          {isMounted && new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {message.sender === "user" && (
          <div className="flex items-center gap-1 mt-2 -mr-1 justify-end">
            <button 
              onClick={() => handleCopy(message.text)}
              aria-label="Copy message"
              className="p-1.5 rounded-lg hover:bg-white/20 text-blue-100 hover:text-white transition-colors"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => handleEdit(message.text)}
              aria-label="Edit message"
              className="p-1.5 rounded-lg hover:bg-white/20 text-blue-100 hover:text-white transition-colors"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {message.sender === "bot" && (
          <div className="flex items-center gap-1 mt-2 -ml-1">
            <button 
              onClick={() => onRegenerate(message.id)} 
              aria-label="Regenerate response"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
              title="Regenerate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => handleCopy(message.text)}
              aria-label="Copy response"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button 
              aria-label="Thumbs up"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors" 
              title="Good response"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button 
              aria-label="Thumbs down"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors" 
              title="Bad response"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

const formatMarkdownToHTML = (text) => {
  if (!text) return '';

  let html = text;

  // Convert **bold** to <strong>
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert *italic* to <em>
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Convert ### headers
  html = html.replace(/^##### (.+)$/gm, '<h5 class="font-bold text-sm mt-2 mb-1">$1</h5>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="font-bold text-base mt-2 mb-1">$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="font-bold text-lg mt-2 mb-1">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="font-bold text-xl mt-3 mb-2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h2 class="font-bold text-2xl mt-3 mb-2">$1</h2>');

  // Convert bullet points (• or -)
  html = html.replace(/^\s*[•\-]\s+(.+)$/gm, '<li>$1</li>');

  // Wrap consecutive <li> items in <ul>
  html = html.replace(/(<li>.*?<\/li>\n?)+/g, (match) => {
    return '<ul class="list-disc pl-5 space-y-1.5 my-3 marker:text-blue-400">' + match.trim() + '</ul>';
  });

  // Convert markdown links [text](url)
  html = html.replace(/\[([^\]]+)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">$1</a>');

  // Convert line breaks, but skip if they are inside <ul> to avoid extra spacing
  html = html.replace(/\n/g, '<br>');
  html = html.replace(/(<ul.*?>.*?<\/ul>)<br>/g, '$1'); // Clean up trailing br after ul

  return html;
};

const quickReplies = [
  { icon: MapPin, text: "Popular Destinations", emoji: "🌍" },
  { icon: Calendar, text: "Plan a Trip", emoji: "✈️" },
  { icon: Users, text: "Group Packages", emoji: "👥" },
  { icon: Sparkles, text: "Special Offers", emoji: "✨" },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    text: "Hello! I'm Mira, your personal travel expert. How can I help you plan your perfect vacation today? ✈️",
    formattedText: "Hello! I'm Mira, your personal travel expert. How can I help you plan your perfect vacation today? ✈️",
    sender: "bot",
    timestamp: new Date().setHours(17, 0, 0, 0), // Use a stable timestamp during hydration
  },
];

export default function ChatbotPopup({ isOpen, onClose }) {
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const messagesRef = useRef(messages);

  // Sync ref with state for logic access without re-render dependency
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [inputMessage, setInputMessage] = useState("");
  const [viewportHeight, setViewportHeight] = useState("100dvh");
  const [viewportTop, setViewportTop] = useState(0);
  const [isViewportResizing, setIsViewportResizing] = useState(false);
  const resizeTimeoutRef = useRef(null);

  // Handle mobile keyboard and visual viewport changes
  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      setIsViewportResizing(true);
      setViewportHeight(`${window.visualViewport.height}px`);
      setViewportTop(window.visualViewport.offsetTop);
      
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setIsViewportResizing(false);
      }, 300);
    };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showDestinations, setShowDestinations] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedContext, setSelectedContext] = useState(null);
  const [destPage, setDestPage] = useState(0);
  const [streamingMessage, setStreamingMessage] = useState(null);
  const streamingBufferRef = useRef("");
  const lastRenderTimeRef = useRef(0);
  const ITEMS_PER_PAGE = 6;
  const recognitionRef = useRef(null);

  // Fetch dynamic regions
  const { regions: allRegions } = useRegionsData();

  // Sort and filter regions for "Popular Destinations"
  const popularDestinations = useMemo(() => {
    if (!allRegions) return [];
    
    // Combine international and domestic, prioritize visible ones
    return allRegions
      .filter(r => r.visible !== false)
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""))
      .map(r => ({
        name: r.name,
        slug: r.slug,
        emoji: r.isDomestic ? "🇮🇳" : "🌍", // Simple distinction
        description: r.isDomestic ? "Domestic Gem" : "International"
      }));
  }, [allRegions]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Added for iOS Safari stability
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.overscrollBehavior = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.overscrollBehavior = '';
    };
  }, [isOpen]);

  // Separate effect for mounting and speech recognition
  useEffect(() => {
    setIsMounted(true);

    const timer = setTimeout(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition && !recognitionRef.current) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setInputMessage(transcript);
        };

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            alert("Please enable microphone access to use voice input.");
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }, 1500); // Increased delay for better initialization

    return () => clearTimeout(timer);
  }, []); // Static dependency array to fix React error

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        setIsListening(false);
      }
    }
  };

  const scrollToBottom = (instant = false) => {
    if (!messagesEndRef.current) return;
    
    // Performance: Use 'auto' behavior on mobile or if instant is requested
    const isMobile = window.innerWidth < 640;
    messagesEndRef.current.scrollIntoView({ 
      behavior: (instant || isMobile) ? "auto" : "smooth",
      block: "end" 
    });
  };

  const handleCopy = useCallback((text) => {
    navigator.clipboard.writeText(text);
  }, []);

  const handleEdit = useCallback((text) => {
    setInputMessage(text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleDestinationClick = useCallback(async (slug, name) => {
    setSelectedContext({ type: 'region', slug, name });
    setShowDestinations(false);
    setShowQuickReplies(true);
    setIsTyping(true);

    try {
      const regionPackages = await getPackagesByRegion(slug);
      const text = `Here are some amazing tour packages for **${name}**! 🌴\n\nI've also noted that you're interested in ${name}. Feel free to ask specific questions about it!`;
      
      const botResponse = {
        id: Date.now() + 1,
        text,
        formattedText: formatMarkdownToHTML(text),
        sender: "bot",
        timestamp: new Date(),
        isHtml: true,
        packages: regionPackages.slice(0, 5),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
       const text = `I couldn't load specific packages for ${name} right now, but I'm ready to answer your questions about it!`;
       const botResponse = {
        id: Date.now() + 1,
        text,
        formattedText: formatMarkdownToHTML(text),
        sender: "bot",
        timestamp: new Date(),
        isHtml: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const handleViewItinerary = useCallback((pkg) => {
    const text = `Opening the itinerary for **${pkg.packageTitle}**...`;
    const botResponse = {
      id: Date.now(),
      text,
      formattedText: formatMarkdownToHTML(text),
      sender: "bot",
      timestamp: new Date(),
      isHtml: true,
      type: 'itinerary',
      itineraries: pkg.itineraries,
    };
    setMessages((prev) => [...prev.filter(m => m.type !== 'itinerary'), botResponse]);
  }, []);

  const handleQuickReply = useCallback(async (text) => {
    if (text === "Popular Destinations") {
      setShowQuickReplies(false);
      setShowDestinations(true);
      return;
    }

    let contextData = null;
    let botReplyText = "";
    let packagesToDisplay = null;

    if (text === "Group Packages") {
      contextData = { type: 'theme', slug: 'group-adventures', name: 'Group Adventures' };
      setSelectedContext(contextData);
      setIsTyping(true);

      try {
        const results = await getPackagesByTheme("group-adventures");
        if (results && results.length > 0) {
          packagesToDisplay = results.slice(0, 5);
          botReplyText = "I can certainly help with **Group Adventures**! 🚌\n\nHere are some of our most popular curated group trips. What would you like to know about them?";
        } else {
          handleSendMessage(null, text);
          return;
        }
      } catch (error) {
        handleSendMessage(null, text);
        return;
      } finally {
        setIsTyping(false);
      }
    } else if (text === "Special Offers") {
      botReplyText = "Looking for a deal? ✨\n\nI can check our latest **Special Offers** for you. Are you looking for a specific destination or just the best deals available right now?";
    } else if (text === "Plan a Trip") {
       contextData = { type: 'intent', slug: 'plan-trip', name: 'Plan a Trip' };
       botReplyText = "Exciting! Let's plan your dream trip. ✈️\n\nTo get started, could you tell me **where** you'd like to go, or what kind of experience you're looking for?";
    }

    if (contextData) {
      setSelectedContext(contextData);
    }

    if (botReplyText) {
        const botResponse = {
            id: Date.now() + 1,
            text: botReplyText,
            formattedText: formatMarkdownToHTML(botReplyText),
            sender: "bot",
            timestamp: new Date(),
            isHtml: true,
            packages: packagesToDisplay,
        };
        setMessages((prev) => [...prev, botResponse]);
    } else {
        handleSendMessage(null, text);
    }
  }, []);

  const handleRegenerate = useCallback((messageId) => {
    setMessages(prev => {
      const messageIndex = prev.findIndex(m => m.id === messageId);
      if (messageIndex === -1) return prev;
      
      const lastUserMessage = [...prev.slice(0, messageIndex)].reverse().find(m => m.sender === "user");
      if (lastUserMessage) {
          // Delay call to avoid state update during render
          setTimeout(() => handleSendMessage(null, lastUserMessage.text, true), 0);
      }
      return prev;
    });
  }, []);

  const handleSendMessage = useCallback(async (e, text = null, isRegenerate = false) => {
    if (e) e.preventDefault();
    const messageText = text || inputMessage; // Note: inputMessage dependency is needed
    if (!messageText.trim()) return;

    setShowQuickReplies(false);
    setShowDestinations(false);
    
    if (isRegenerate) {
        setMessages(prev => {
            const lastBotIndex = [...prev].reverse().findIndex(m => m.sender === "bot");
            if (lastBotIndex !== -1) {
                const actualIndex = prev.length - 1 - lastBotIndex;
                return prev.slice(0, actualIndex);
            }
            return prev;
        });
    }

    const chatHistory = messagesRef.current
      .filter(msg => msg.id !== 1)
      .slice(-10)
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

    if (!isRegenerate) {
      const userMessage = {
        id: Date.now(),
        text: messageText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
    }

    setInputMessage("");
    setIsTyping(true);

    const botMessageId = Date.now() + 1;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let payloadMessage = messageText;
    if (selectedContext) {
        payloadMessage = `${messageText}\n\n[System Context: The user is currently interested in ${selectedContext.name} (Slug: ${selectedContext.slug}). Prioritize this context in your response.]`;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: payloadMessage, history: chatHistory }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response from AI");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      setIsTyping(false); 

      setStreamingMessage({
        id: botMessageId,
        text: "",
        formattedText: "",
        sender: "bot",
        timestamp: new Date(),
        isHtml: true,
      });

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith("data: ")) {
            try {
              const dataStr = trimmedLine.slice(6);
              if (dataStr === "[DONE]") continue;
              
              const data = JSON.parse(dataStr);
              if (data.token) {
                streamingBufferRef.current += data.token;
                const now = Date.now();
                if (now - lastRenderTimeRef.current > 100) {
                  const currentText = streamingBufferRef.current;
                  setStreamingMessage(prev => ({
                    ...prev,
                    text: currentText,
                    formattedText: formatMarkdownToHTML(currentText)
                  }));
                  lastRenderTimeRef.current = now;
                }
              } else if (data.full_response && !streamingBufferRef.current) {
                streamingBufferRef.current = data.full_response;
                setStreamingMessage(prev => ({
                    ...prev,
                    text: streamingBufferRef.current,
                    formattedText: formatMarkdownToHTML(streamingBufferRef.current)
                }));
              }
            } catch (e) {}
          }
        }
      }

      const finalBotResponse = {
        id: botMessageId,
        text: streamingBufferRef.current,
        formattedText: formatMarkdownToHTML(streamingBufferRef.current),
        sender: "bot",
        timestamp: new Date(),
        isHtml: true,
      };
      
      setMessages(prev => [...prev, finalBotResponse]);
      setStreamingMessage(null);
      streamingBufferRef.current = "";
      lastRenderTimeRef.current = 0;
      
      setTimeout(() => scrollToBottom(false), 100);

    } catch (error) {
      clearTimeout(timeoutId);
      setIsTyping(false);
      const errorMessage = error.name === 'AbortError' 
        ? "I'm taking a bit too long to respond. Please try again or ask a simpler question!" 
        : "I'm having trouble connecting right now. Please call us at +91 91875 63136 or try again in a moment!";
      setMessages((prev) => [...prev, { id: Date.now() + 2, text: errorMessage, sender: "bot", timestamp: new Date() }]);
    }
  }, [inputMessage, selectedContext]);

  const handleClearChat = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setShowQuickReplies(true);
    setShowDestinations(false);
    setInputMessage("");
    setSelectedContext(null);
    setDestPage(0);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  }, [handleSendMessage]);


  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-[2px] z-[10000] transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Chat Panel - Enhanced Design */}
      <div
        className={`fixed inset-0 sm:inset-auto sm:top-[100px] sm:bottom-4 sm:right-4 sm:left-auto sm:w-[450px] bg-white rounded-none sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] z-[10001] transform overflow-hidden flex flex-col ${
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95 pointer-events-none"
        } ${!isViewportResizing ? "transition-all duration-500 ease-out" : ""}`}
        style={{ 
          height: isMounted && typeof window !== 'undefined' && window.innerWidth < 640 ? viewportHeight : '80vh',
          maxHeight: isMounted && typeof window !== 'undefined' && window.innerWidth < 640 ? viewportHeight : '80vh',
          top: isMounted && typeof window !== 'undefined' && window.innerWidth < 640 ? `${viewportTop}px` : undefined
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Header with Gradient */}
        <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-3 sm:py-3 px-6 overflow-hidden flex-shrink-0">
          {/* Animated background circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse [animation-delay:0.5s]" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                <div className="relative bg-white/20 backdrop-blur-sm p-2.5 rounded-full border border-white/30">
                  <Bot className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Mira
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-xs text-blue-100 font-medium">Online • Ready to help</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  aria-label="Clear conversation"
                  className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 group/clear flex items-center justify-center bg-white/10 border border-white/20"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4 group-hover/clear:scale-110 transition-transform" />
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close chatbot"
                className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white custom-scrollbar">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLast={index === messages.length - 1}
              isMounted={isMounted}
              handleCopy={handleCopy}
              handleEdit={handleEdit}
              onRegenerate={handleRegenerate}
              handleViewItinerary={handleViewItinerary}
            />
          ))}

          {streamingMessage && (
            <ChatMessage
              key={streamingMessage.id}
              message={streamingMessage}
              isLast={true}
              isMounted={isMounted}
              handleCopy={handleCopy}
              handleEdit={handleEdit}
              onRegenerate={handleRegenerate}
              handleViewItinerary={handleViewItinerary}
            />
          )}

          {isTyping && (
            <div className="flex animate-fadeIn">
              <div className="bg-white rounded-2xl rounded-tl-none px-5 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1.5 py-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          {/* Quick Reply Buttons */}
          {showQuickReplies && messages.length <= INITIAL_MESSAGES.length && (
            <div className="space-y-2 animate-fadeIn pt-2">
              <p className="text-xs text-gray-500 font-medium px-1">Quick options:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.text)}
                    className="flex items-center gap-2 p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group hover:scale-105 shadow-sm"
                  >
                    <span className="text-lg">{reply.emoji}</span>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">
                      {reply.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Destination Buttons */}
          {showDestinations && (
            <div className="space-y-2 animate-fadeIn pt-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs text-gray-500 font-medium">Click to explore:</p>
                {(popularDestinations.length > ITEMS_PER_PAGE) && (
                  <div className="flex gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setDestPage(p => Math.max(0, p - 1)); }}
                      disabled={destPage === 0}
                      aria-label="Previous page of destinations"
                      className={`p-1 rounded-full ${destPage === 0 ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-50'} transition-colors`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setDestPage(p => (p + 1) * ITEMS_PER_PAGE < popularDestinations.length ? p + 1 : p); }}
                      disabled={(destPage + 1) * ITEMS_PER_PAGE >= popularDestinations.length}
                      aria-label="Next page of destinations"
                      className={`p-1 rounded-full ${(destPage + 1) * ITEMS_PER_PAGE >= popularDestinations.length ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-50'} transition-colors`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {popularDestinations.slice(destPage * ITEMS_PER_PAGE, (destPage + 1) * ITEMS_PER_PAGE).map((destination, index) => (
                  <button
                    key={index}
                    onClick={() => handleDestinationClick(destination.slug, destination.name)}
                    className="flex items-center justify-between p-3 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-300 group hover:scale-105"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{destination.emoji}</span>
                      <div className="text-left w-[110px] sm:w-auto">
                        <p className="text-xs font-bold text-gray-800 line-clamp-1">{destination.name}</p>
                        <p className="text-[10px] text-gray-500 line-clamp-1">{destination.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-blue-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="bg-white p-4 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="relative group">
            <div className="relative flex items-center">
              <Textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="flex-1 min-h-[42px] max-h-[120px] rounded-full border-[1.5px] border-slate-200 sm:border-transparent bg-white px-5 py-2.5 pr-12 sm:transition-all sm:duration-300 resize-none h-auto scrollbar-none text-base sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 sm:focus:border-transparent chat-input-area"
                disabled={false}
              />
              <div className="absolute right-1.5 flex items-center gap-1">
                {recognitionRef.current && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    aria-label={isListening ? "Stop listening" : "Start voice input"}
                    className={`p-1.5 rounded-full transition-all duration-300 ${
                      isListening 
                        ? "text-blue-600 animate-pulse bg-blue-50" 
                        : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                    }`}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
                  </button>
                )}
                {!isListening && inputMessage.trim() && (
                  <button
                    type="submit"
                    disabled={isTyping}
                    aria-label="Send message"
                    className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 0px;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #f1f1f1;
          overflow-x: hidden;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #2563eb);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
        }
        
        /* Hide horizontal scrollbar specifically */
        .custom-scrollbar::-webkit-scrollbar:horizontal {
          display: none;
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(165, 194, 249, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 8px rgba(165, 194, 249, 0);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @media (min-width: 640px) {
          .chat-input-area {
            background-image: linear-gradient(white, white), linear-gradient(to right, #0146b3, #4a8dd9);
            background-origin: border-box;
            background-clip: padding-box, border-box;
          }
        }

        .custom-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
