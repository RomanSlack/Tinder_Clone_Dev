"use client"

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="text-2xl font-bold text-pink-500">
          TinderClone
        </Link>
        
        <nav className="flex space-x-4">
          <Link 
            href="/" 
            className="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
          >
            Swipe
          </Link>
          <Link 
            href="/chat" 
            className="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
          >
            Chat
          </Link>
        </nav>
      </div>
    </header>
  );
}
