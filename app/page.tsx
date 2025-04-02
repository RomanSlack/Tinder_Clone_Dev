"use client";

import { useContext, useState } from 'react';
import SwipeCard from '@/components/SwipeCard';
import ProfileModal from '@/components/ProfileModal';
import { AppContext } from '@/context/AppContext';

export default function Home() {
  const appContext = useContext(AppContext);
  const [selectedProfile, setSelectedProfile] = useState(null);

  if (!appContext) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const { profiles, currentProfileIndex, handleLike, handlePass } = appContext;

  // No more profiles to show
  if (currentProfileIndex >= profiles.length) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">No more profiles to show!</h2>
        <p className="text-gray-500">Check back later for more matches</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow-md transition-colors"
        >
          Restart
        </button>
      </div>
    );
  }

  const currentProfile = profiles[currentProfileIndex];

  return (
    <div className="pt-4">
      <div className="flex justify-center">
        <SwipeCard
          profile={currentProfile}
          onLike={handleLike}
          onPass={handlePass}
        />
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setSelectedProfile(currentProfile)}
          className="px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-700 shadow hover:shadow-md transition-all"
        >
          View Full Profile
        </button>
      </div>

      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}