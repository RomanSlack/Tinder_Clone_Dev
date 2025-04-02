"use client";

import { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import { Profile } from '@/types';

export default function ChatPage() {
  const appContext = useContext(AppContext);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedProfile]);

  if (!appContext) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const { likedProfiles, conversations, sendMessage } = appContext;

  if (likedProfiles.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">No matches yet!</h2>
        <p className="text-gray-500">Go back to the swipe page and like some profiles</p>
      </div>
    );
  }

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedProfile && newMessage.trim()) {
      sendMessage(selectedProfile.id, newMessage);
      setNewMessage('');
    }
  };

  const getConversationMessages = (profileId: number) => {
    const conversation = conversations.find(c => c.profileId === profileId);
    return conversation?.messages || [];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[75vh]">
      {/* Matches List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Your Matches</h2>
        </div>
        <div className="overflow-y-auto h-[calc(75vh-60px)]">
          {likedProfiles.map(profile => (
            <div
              key={profile.id}
              onClick={() => setSelectedProfile(profile)}
              className={`p-4 border-b flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${selectedProfile?.id === profile.id ? 'bg-pink-50' : ''}`}
            >
              <div 
                className="w-12 h-12 rounded-full bg-gray-200 mr-3 flex-shrink-0"
                style={{
                  backgroundImage: `url(${profile.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div>
                <h3 className="font-medium">{profile.name}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {getConversationMessages(profile.id).length > 0 
                    ? getConversationMessages(profile.id).slice(-1)[0].text 
                    : 'No messages yet'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2 flex flex-col">
        {selectedProfile ? (
          <>
            <div className="p-4 border-b flex items-center">
              <div 
                className="w-10 h-10 rounded-full bg-gray-200 mr-3"
                style={{
                  backgroundImage: `url(${selectedProfile.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <h2 className="font-medium">{selectedProfile.name}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {getConversationMessages(selectedProfile.id).length > 0 ? (
                  getConversationMessages(selectedProfile.id).map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'You' 
                          ? 'bg-pink-500 text-white rounded-tr-none' 
                          : 'bg-white border border-gray-200 rounded-tl-none'}`}
                      >
                        <p>{message.text}</p>
                        <span className="text-xs opacity-70 block mt-1">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    Send a message to start the conversation!
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="ml-2 bg-pink-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a match to start chatting
          </div>
        )}
      </div>
    </div>
  );
}