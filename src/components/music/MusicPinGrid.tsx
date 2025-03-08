import React, { useState, useEffect } from "react";
import MusicPin from "./MusicPin";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Music, Flame, Clock, Plus } from "lucide-react";

interface MusicPinData {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: string;
  likes: number;
  isLiked: boolean;
  streamingServices: Array<{ name: string; url: string }>;
  genre: string;
}

interface MusicPinGridProps {
  pins?: MusicPinData[];
  isLoading?: boolean;
  onFilterChange?: (filter: string) => void;
}

const MusicPinGrid = ({
  pins = [
    {
      id: "pin-1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      albumArt:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
      duration: "3:20",
      likes: 1254,
      isLiked: false,
      streamingServices: [
        { name: "Spotify", url: "#" },
        { name: "Apple Music", url: "#" },
      ],
      genre: "Pop",
    },
    {
      id: "pin-2",
      title: "Levitating",
      artist: "Dua Lipa",
      albumArt:
        "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&q=80",
      duration: "3:23",
      likes: 982,
      isLiked: true,
      streamingServices: [
        { name: "Spotify", url: "#" },
        { name: "Apple Music", url: "#" },
      ],
      genre: "Pop",
    },
    {
      id: "pin-3",
      title: "Save Your Tears",
      artist: "The Weeknd & Ariana Grande",
      albumArt:
        "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=300&q=80",
      duration: "3:08",
      likes: 1547,
      isLiked: false,
      streamingServices: [
        { name: "Spotify", url: "#" },
        { name: "Apple Music", url: "#" },
      ],
      genre: "Pop",
    },
    {
      id: "pin-4",
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      albumArt:
        "https://images.unsplash.com/photo-1618609377864-68609b857e90?w=300&q=80",
      duration: "2:58",
      likes: 2103,
      isLiked: false,
      streamingServices: [
        { name: "Spotify", url: "#" },
        { name: "Apple Music", url: "#" },
      ],
      genre: "Pop Rock",
    },
    {
      id: "pin-5",
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      albumArt:
        "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=300&q=80",
      duration: "2:21",
      likes: 1876,
      isLiked: true,
      streamingServices: [
        { name: "Spotify", url: "#" },
        { name: "Apple Music", url: "#" },
      ],
      genre: "Pop",
    },
    {
      id: "pin-6",
      title: "Montero (Call Me By Your Name)",
      artist: "Lil Nas X",
      albumArt:
        "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&q=80",
      duration: "2:17",
      likes: 1654,
      isLiked: false,
      streamingServices: [
        { name: "Spotify", url: "#" },
        { name: "Apple Music", url: "#" },
      ],
      genre: "Hip Hop",
    },
    {
      id: "pin-7",
      title: "Kiss Me More",
      artist: "Doja Cat ft. SZA",
      albumArt:
        "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=300&q=80",
      duration: "3:28",
      likes: 1432,
      isLiked: false,
      streamingServices: [
        { name: "Spotify", url: "#" },
        { name: "Apple Music", url: "#" },
      ],
      genre: "R&B",
    },
    {
      id: "pin-8",
      title: "Peaches",
      artist: "Justin Bieber ft. Daniel Caesar, Giveon",
      albumArt:
        "https://images.unsplash.com/photo-1618609377864-68609b857e90?w=300&q=80",
      duration: "3:18",
      likes: 1987,
      isLiked: true,
      streamingServices: [
        { name: "Spotify", url: "#" },
        { name: "Apple Music", url: "#" },
      ],
      genre: "R&B",
    },
  ],
  isLoading = false,
  onFilterChange = () => {},
}: MusicPinGridProps) => {
  const [activeFilter, setActiveFilter] = useState("discover");
  const [columns, setColumns] = useState(4);
  const [filteredPins, setFilteredPins] = useState<MusicPinData[]>(pins);

  // Handle responsive columns based on window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else if (width < 1280) setColumns(4);
      else setColumns(5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply filter when activeFilter changes
  useEffect(() => {
    // In a real app, this would likely be an API call with filter parameters
    // For now, we'll just simulate filtering
    let filtered = [...pins];

    if (activeFilter === "trending") {
      filtered = filtered.sort((a, b) => b.likes - a.likes);
    } else if (activeFilter === "new") {
      // For demo purposes, we'll just randomize the order
      filtered = filtered.sort(() => Math.random() - 0.5);
    }

    setFilteredPins(filtered);
    if (onFilterChange) onFilterChange(activeFilter);
  }, [activeFilter, pins, onFilterChange]);

  // Create column arrays for masonry layout
  const getColumnPins = () => {
    const columnArrays: MusicPinData[][] = Array.from(
      { length: columns },
      () => [],
    );

    filteredPins.forEach((pin, index) => {
      const columnIndex = index % columns;
      columnArrays[columnIndex].push(pin);
    });

    return columnArrays;
  };

  const columnPins = getColumnPins();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400">Loading music pins...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-[850px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Tabs
            defaultValue="discover"
            value={activeFilter}
            onValueChange={setActiveFilter}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:grid-cols-3">
              <TabsTrigger value="discover" className="flex items-center gap-1">
                <Music className="h-4 w-4" />
                <span className="hidden sm:inline">Discover</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-1">
                <Flame className="h-4 w-4" />
                <span className="hidden sm:inline">Trending</span>
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">New</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Pin</span>
            </Button>
          </div>
        </div>

        {/* Masonry Grid Layout */}
        <div className="flex gap-4 w-full">
          {columnPins.map((column, columnIndex) => (
            <div
              key={`column-${columnIndex}`}
              className="flex flex-col gap-4 flex-1"
            >
              {column.map((pin) => (
                <div
                  key={pin.id}
                  className="transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <MusicPin
                    id={pin.id}
                    title={pin.title}
                    artist={pin.artist}
                    albumArt={pin.albumArt}
                    duration={pin.duration}
                    likes={pin.likes}
                    isLiked={pin.isLiked}
                    streamingServices={pin.streamingServices}
                    genre={pin.genre}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {filteredPins.length === 0 && (
          <div className="w-full py-20 text-center text-gray-500">
            <p>No music pins found. Try a different filter or add some pins!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPinGrid;
