"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Profile } from '@/types';

interface SwipeCardProps {
  profile: Profile;
  onLike: () => void;
  onPass: () => void;
}

export default function SwipeCard({ profile, onLike, onPass }: SwipeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === profile.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm mx-auto">
      <div 
        className="relative h-96 w-full cursor-pointer"
        onClick={handleNextImage}
      >
        {/* Using div with background image as fallback since placeholder images aren't real images */}
        <div 
          className="absolute inset-0 bg-gray-200"
          style={{
            backgroundImage: `url(${profile.images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-white text-xl font-bold">
              {profile.name}, {profile.age}
            </h2>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700">{profile.bio}</p>
        
        <div className="mt-4 flex justify-center space-x-6">
          <button 
            onClick={onPass}
            className="bg-white border border-gray-300 rounded-full p-3 shadow-md hover:shadow-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button 
            onClick={onLike}
            className="bg-white border border-gray-300 rounded-full p-3 shadow-md hover:shadow-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
