"use client"

import { createContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';
import { Profile, ChatConversation, Message } from '@/types';

type AppContextType = {
  profiles: Profile[];
  currentProfileIndex: number;
  likedProfiles: Profile[];
  conversations: ChatConversation[];
  handleLike: () => void;
  handlePass: () => void;
  sendMessage: (profileId: number, text: string) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);

  // Load profiles data - using hardcoded profiles instead of fetch
  useEffect(() => {
    // Using hardcoded profiles to avoid 404 issues with fetch
    const profilesData = [
      {
        id: 1,
        name: "Alice",
        age: 28,
        bio: "Loves hiking, coffee, and great conversations.",
        images: ["/images/alice1.jpg", "/images/alice2.jpg"]
      },
      {
        id: 2,
        name: "Bob",
        age: 30,
        bio: "Foodie, traveler, and aspiring photographer.",
        images: ["/images/bob1.jpg", "/images/bob2.jpg"]
      },
      {
        id: 3,
        name: "Charlie",
        age: 25,
        bio: "Music lover, guitarist, and craft beer enthusiast.",
        images: ["/images/charlie1.jpg", "/images/charlie2.jpg"]
      },
      {
        id: 4,
        name: "Diana",
        age: 27,
        bio: "Yoga instructor, bookworm, and amateur chef.",
        images: ["/images/diana1.jpg", "/images/diana2.jpg"]
      },
      {
        id: 5,
        name: "Ethan",
        age: 29,
        bio: "Tech enthusiast, runner, and coffee addict.",
        images: ["/images/ethan1.jpg", "/images/ethan2.jpg"]
      }
    ];
    
    setProfiles(profilesData);
  }, []);

  // Load saved state from localStorage
  useEffect(() => {
    const loadSavedState = () => {
      if (typeof window === 'undefined') return;
      
      try {
        const savedLikedProfiles = localStorage.getItem('likedProfiles');
        const savedConversations = localStorage.getItem('conversations');
        
        if (savedLikedProfiles) {
          setLikedProfiles(JSON.parse(savedLikedProfiles));
        }
        
        if (savedConversations) {
          setConversations(JSON.parse(savedConversations));
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    };
    
    loadSavedState();
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    const saveState = () => {
      if (typeof window === 'undefined') return;
      
      try {
        localStorage.setItem('likedProfiles', JSON.stringify(likedProfiles));
        localStorage.setItem('conversations', JSON.stringify(conversations));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    };
    
    saveState();
  }, [likedProfiles, conversations]);

  const handleLike = () => {
    if (profiles.length === 0 || currentProfileIndex >= profiles.length) return;
    
    const likedProfile = profiles[currentProfileIndex];
    setLikedProfiles(prev => {
      if (prev.some(profile => profile.id === likedProfile.id)) {
        return prev;
      }
      return [...prev, likedProfile];
    });
    
    // Initialize a conversation if it doesn't exist
    if (!conversations.some(conv => conv.profileId === likedProfile.id)) {
      setConversations(prev => [
        ...prev,
        {
          profileId: likedProfile.id,
          messages: []
        }
      ]);
    }
    
    // Move to next profile
    setCurrentProfileIndex(prev => prev + 1);
  };

  const handlePass = () => {
    // Simply move to the next profile
    setCurrentProfileIndex(prev => prev + 1);
  };

  const sendMessage = (profileId: number, text: string) => {
    if (!text.trim()) return;
    
    const newMessage: Message = {
      id: Date.now(),
      sender: 'You',
      text: text.trim(),
      timestamp: new Date()
    };
    
    setConversations(prev => {
      const updatedConversations = [...prev];
      const conversationIndex = updatedConversations.findIndex(
        conv => conv.profileId === profileId
      );
      
      if (conversationIndex >= 0) {
        updatedConversations[conversationIndex] = {
          ...updatedConversations[conversationIndex],
          messages: [
            ...updatedConversations[conversationIndex].messages,
            newMessage
          ]
        };
      } else {
        // Create new conversation if it doesn't exist
        updatedConversations.push({
          profileId,
          messages: [newMessage]
        });
      }
      
      return updatedConversations;
    });
    
    // Simulate a reply after a delay
    setTimeout(() => {
      const profile = profiles.find(p => p.id === profileId);
      if (!profile) return;
      
      const replyMessage: Message = {
        id: Date.now(),
        sender: profile.name,
        text: getRandomReply(),
        timestamp: new Date()
      };
      
      setConversations(prev => {
        const updatedConversations = [...prev];
        const conversationIndex = updatedConversations.findIndex(
          conv => conv.profileId === profileId
        );
        
        if (conversationIndex >= 0) {
          updatedConversations[conversationIndex] = {
            ...updatedConversations[conversationIndex],
            messages: [
              ...updatedConversations[conversationIndex].messages,
              replyMessage
            ]
          };
        }
        
        return updatedConversations;
      });
    }, 1000);
  };

  // Helper function to generate random replies
  const getRandomReply = () => {
    const replies = [
      "Hey there! How's your day going?",
      "Nice to hear from you!",
      "I'd love to chat more about that.",
      "That's interesting! Tell me more.",
      "What are your plans for the weekend?",
      "Have you watched any good movies lately?",
      "I love that too! We have a lot in common.",
      "What do you enjoy doing in your free time?",
      "I just got back from a hike. It was amazing!",
      "Thanks for the message! I was hoping we'd match."
    ];
    
    return replies[Math.floor(Math.random() * replies.length)];
  };

  return (
    <AppContext.Provider value={{
      profiles,
      currentProfileIndex,
      likedProfiles,
      conversations,
      handleLike,
      handlePass,
      sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};