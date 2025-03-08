import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import MusicPinGrid from "./music/MusicPinGrid";
import MusicPlayer from "./music/MusicPlayer";
import LandingPage from "./landing/LandingPage";
import { useAuth } from "@/lib/auth";

interface HomeProps {
  avatarUrl?: string;
}

const Home = ({
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=music",
}: HomeProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const isLoggedIn = !!user;
  const username = user?.email?.split("@")[0] || "User";

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // In a real implementation, this would trigger a search API call
  };

  const handleLoginClick = () => {
    navigate("/login");
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
          <title>Resona | Discover and Share Music</title>
          <meta
            name="description"
            content="A modern music discovery and sharing platform"
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
      </div>
    );
  }

  // Show main app for logged in users
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Resona | Discover and Share Music</title>
        <meta
          name="description"
          content="A modern music discovery and sharing platform"
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
    </div>
  );
};

export default Home;
