import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Share2,
  Play,
  Pause,
  Plus,
  Volume2,
  VolumeX,
  BarChart,
  Activity,
  Circle,
  ExternalLink,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import MusicVisualizer from "./MusicVisualizer";

interface MusicPinProps {
  id?: string;
  title?: string;
  artist?: string;
  albumArt?: string;
  duration?: string;
  likes?: number;
  isLiked?: boolean;
  streamingServices?: Array<{ name: string; url: string }>;
  genre?: string;
  audioUrl?: string;
  description?: string;
  externalUrl?: string;
  snippetStart?: number;
  snippetEnd?: number;
}

const MusicPin = ({
  id = "pin-1",
  title = "Blinding Lights",
  artist = "The Weeknd",
  albumArt = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
  duration = "3:20",
  likes = 1254,
  isLiked = false,
  streamingServices = [
    { name: "Spotify", url: "#" },
    { name: "Apple Music", url: "#" },
  ],
  genre = "Pop",
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Sample audio URL
  description = "",
  externalUrl = "",
  snippetStart = 0,
  snippetEnd = 0,
}: MusicPinProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);
  const [visualizerType, setVisualizerType] = useState<
    "bars" | "wave" | "circle"
  >("bars");
  const [showVisualizer, setShowVisualizer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Effect to handle audio play/pause when isPlaying state changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      try {
        // Set the current time to snippet start if defined
        if (snippetStart > 0 && audioRef.current.currentTime < snippetStart) {
          audioRef.current.currentTime = snippetStart;
        }

        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.error("Audio playback error:", err);
            setError(true);
            setIsPlaying(false);
          });
        }
      } catch (err) {
        console.error("Audio playback error:", err);
        setError(true);
        setIsPlaying(false);
      }
    } else {
      audioRef.current.pause();
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, snippetStart]);

  // Handle audio ended event
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Handle time update to implement snippet functionality
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    // If snippet end is defined and we've reached it, stop playback and reset to start
    if (snippetEnd > 0 && audioRef.current.currentTime >= snippetEnd) {
      audioRef.current.pause();
      setIsPlaying(false);

      // Reset to snippet start
      if (snippetStart > 0) {
        audioRef.current.currentTime = snippetStart;
      } else {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const togglePlay = () => {
    if (error) {
      // Try to reload the audio if there was an error
      if (audioRef.current) {
        audioRef.current.load();
        setError(false);
      }
    }
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);

    // Show visualizer when playing
    if (newPlayingState) {
      setShowVisualizer(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const cycleVisualizerType = () => {
    if (visualizerType === "bars") setVisualizerType("wave");
    else if (visualizerType === "wave") setVisualizerType("circle");
    else setVisualizerType("bars");
  };

  return (
    <TooltipProvider>
      <Card className="w-[280px] h-[380px] overflow-hidden flex flex-col bg-background shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/30">
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnded}
          onTimeUpdate={handleTimeUpdate}
          onError={() => setError(true)}
          preload="metadata"
          crossOrigin="anonymous"
        />

        <div className="relative w-full h-[280px] overflow-hidden group">
          <img
            src={albumArt}
            alt={`${title} by ${artist}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="icon"
              className={`rounded-full ${isPlaying ? "bg-primary text-white" : "bg-white/90 hover:bg-white"}`}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Music Visualizer */}
          {showVisualizer && (
            <MusicVisualizer
              audioRef={audioRef}
              isPlaying={isPlaying}
              visualizerType={visualizerType}
            />
          )}
          {isPlaying && (
            <div className="absolute top-2 left-2 flex gap-1">
              <div className="bg-black/70 rounded-full p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:text-white hover:bg-transparent"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="bg-black/70 rounded-full p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:text-white hover:bg-transparent"
                  onClick={cycleVisualizerType}
                  title="Change visualizer"
                >
                  {visualizerType === "bars" && (
                    <BarChart className="h-4 w-4" />
                  )}
                  {visualizerType === "wave" && (
                    <Activity className="h-4 w-4" />
                  )}
                  {visualizerType === "circle" && (
                    <Circle className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
          <Badge className="absolute top-2 right-2 bg-black/70">{genre}</Badge>
          <div className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-2 py-1 rounded">
            {duration}
          </div>
          {error && (
            <div className="absolute bottom-2 left-2 text-xs text-white bg-red-500/90 px-2 py-1 rounded">
              Audio unavailable
            </div>
          )}
          {isPlaying && !error && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/30">
              <div
                className="h-full bg-primary animate-pulse"
                style={{ width: "100%" }}
              ></div>
            </div>
          )}
        </div>

        <CardContent className="p-3 flex-grow">
          <h3 className="font-semibold text-base truncate text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{artist}</p>
        </CardContent>

        <CardFooter className="p-3 pt-0 flex justify-between items-center border-t border-border/30">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${liked ? "text-red-500" : "text-muted-foreground"}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{liked ? "Unlike" : "Like"}</p>
              </TooltipContent>
            </Tooltip>
            <span className="text-xs text-muted-foreground">{likeCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to board</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>

            {externalUrl && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(externalUrl, "_blank");
                    }}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open in Spotify</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default MusicPin;
