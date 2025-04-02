"use client"

import { useState } from 'react';
import { Profile } from '@/types';

interface ProfileModalProps {
  profile: Profile;
  onClose: () => void;
}

export default function ProfileModal({ profile, onClose }: ProfileModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === profile.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="relative">
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
            />
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white hover:bg-black/75"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <h2 className="text-2xl font-bold">
            {profile.name}, {profile.age}
          </h2>
          <p className="mt-2 text-gray-700">{profile.bio}</p>
          
          <div className="mt-4 flex justify-between">
            <div className="text-sm text-gray-500">
              <p>Photos: {profile.images.length}</p>
            </div>
            <p className="text-sm text-gray-500">ID: {profile.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
