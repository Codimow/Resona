import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./layout/Navbar";
import MusicPinGrid from "./music/MusicPinGrid";
import MusicPlayer from "./music/MusicPlayer";
import AuthModal from "./auth/AuthModal";
import LandingPage from "./landing/LandingPage";

interface HomeProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
}

const Home = ({
  isLoggedIn = false,
  username = "MusicLover",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=music",
}: HomeProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("discover");
  const [currentTrack, setCurrentTrack] = useState({
    id: "track-1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    albumArt:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&q=80",
    duration: 203, // 3:23 in seconds
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // In a real implementation, this would trigger a search API call
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // In a real implementation, this would trigger different API calls based on the filter
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control actual audio playback
  };

  // Show landing page for non-logged in users
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>MusicPin | Discover and Share Music</title>
          <meta
            name="description"
            content="A Pinterest-style music discovery and sharing platform"
          />
        </Helmet>

        {/* Navigation */}
        <Navbar
          isLoggedIn={isLoggedIn}
          username={username}
          avatarUrl={avatarUrl}
          onSearch={handleSearch}
          onLoginClick={handleLoginClick}
        />

        <LandingPage />

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          defaultTab="login"
        />
      </div>
    );
  }

  // Show main app for logged in users
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>MusicPin | Discover and Share Music</title>
        <meta
          name="description"
          content="A Pinterest-style music discovery and sharing platform"
        />
      </Helmet>

      {/* Navigation */}
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        avatarUrl={avatarUrl}
        onSearch={handleSearch}
        onLoginClick={handleLoginClick}
      />

      {/* Main Content */}
      <main className="pt-[70px]">
        {/* Music Pin Grid */}
        <MusicPinGrid onFilterChange={handleFilterChange} />
      </main>

      {/* Music Player */}
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="login"
      />
    </div>
  );
};

export default Home;
