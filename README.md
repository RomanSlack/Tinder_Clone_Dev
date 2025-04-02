# Tinder Clone App

A simple Tinder-like application built with Next.js, React, and Tailwind CSS.

## Features

- Swipe through profiles (like or pass)
- View detailed profile information
- Chat with matched profiles
- Persistent conversations using localStorage
- Responsive design for mobile and desktop

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation
- **React**: Frontend library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: Strongly typed programming language that builds on JavaScript
- **localStorage**: For persisting user data between sessions

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tinder-clone.git
cd tinder-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How It Works

### Home Page (Swipe Page)
- Displays one profile at a time
- Users can like or pass on profiles
- View detailed profile information by clicking "View Full Profile"

### Chat Page
- Shows a list of matches (profiles that were liked)
- Select a match to start or continue a conversation
- Messages are saved to localStorage for persistence

### Data Management
- Profile data is stored in `data/profiles.json`
- Matches and conversations are saved to localStorage
- The app includes simulated replies from matched profiles

## Project Structure

- `app/`: Main Next.js app directory
  - `page.tsx`: Home/Swipe page
  - `chat/page.tsx`: Chat page
- `components/`: Reusable React components
  - `SwipeCard.tsx`: Card component for displaying profiles
  - `ProfileModal.tsx`: Modal for showing detailed profile information
  - `Header.tsx`: Navigation header
- `context/`: React context for global state management
  - `AppContext.tsx`: Provides profile data and app functionality
- `data/`: Static data
  - `profiles.json`: Sample user profiles
- `public/images/`: Profile images
- `types/`: TypeScript type definitions

## License

This project is open source and available under the [MIT License](LICENSE).