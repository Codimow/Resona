import React, { useState, useEffect } from "react";
import MusicPin from "./MusicPin";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Music, Flame, Clock, Plus } from "lucide-react";
import CreateMusicPinDialog from "./CreateMusicPinDialog";

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
  pins = [],
  isLoading = false,
  onFilterChange = () => {},
}: MusicPinGridProps) => {
  const [activeFilter, setActiveFilter] = useState("discover");
  const [columns, setColumns] = useState(4);
  const [filteredPins, setFilteredPins] = useState<MusicPinData[]>(pins);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userPins, setUserPins] = useState<MusicPinData[]>([]);

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
    let filtered = [...pins, ...userPins];

    if (activeFilter === "trending") {
      filtered = filtered.sort((a, b) => b.likes - a.likes);
    } else if (activeFilter === "new") {
      // For demo purposes, we'll just randomize the order
      filtered = filtered.sort(() => Math.random() - 0.5);
    }

    setFilteredPins(filtered);
    if (onFilterChange) onFilterChange(activeFilter);
  }, [activeFilter, pins, userPins, onFilterChange]);

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
              onClick={() => setIsCreateDialogOpen(true)}
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
                    snippetStart={pin.snippetStart}
                    snippetEnd={pin.snippetEnd}
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

        {/* Create Music Pin Dialog */}
        <CreateMusicPinDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreatePin={(newPin) => {
            const pin: MusicPinData = {
              id: `user-pin-${Date.now()}`,
              title: newPin.title,
              artist: newPin.artist,
              albumArt: newPin.albumArt,
              duration: newPin.duration || "3:30", // Use provided duration or default
              likes: 0,
              isLiked: false,
              streamingServices: [{ name: "Custom", url: newPin.audioUrl }],
              genre: newPin.genre || "Unknown",
              snippetStart: newPin.snippetStart,
              snippetEnd: newPin.snippetEnd,
            };
            setUserPins([pin, ...userPins]);
          }}
        />
      </div>
    </div>
  );
};

export default MusicPinGrid;
