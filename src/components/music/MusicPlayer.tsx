import React, { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  ListMusic,
  Share2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MusicPlayerProps {
  currentTrack?: {
    id: string;
    title: string;
    artist: string;
    albumArt: string;
    duration: number; // in seconds
  };
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSeek?: (position: number) => void;
  onVolumeChange?: (volume: number) => void;
}

const MusicPlayer = ({
  currentTrack = {
    id: "track-1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    albumArt:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&q=80",
    duration: 203, // 3:23 in seconds
  },
  isPlaying = false,
  onPlayPause = () => {},
  onNext = () => {},
  onPrevious = () => {},
  onSeek = () => {},
  onVolumeChange = () => {},
}: MusicPlayerProps) => {
  const [playing, setPlaying] = useState(isPlaying);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= currentTrack.duration) {
            clearInterval(intervalRef.current!);
            setPlaying(false);
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playing, currentTrack.duration]);

  useEffect(() => {
    setPlaying(isPlaying);
  }, [isPlaying]);

  const togglePlay = () => {
    setPlaying(!playing);
    onPlayPause();
  };

  const handleSeek = (value: number[]) => {
    const newPosition = value[0];
    setCurrentTime(newPosition);
    onSeek(newPosition);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    onVolumeChange(newVolume / 100);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    onVolumeChange(isMuted ? volume / 100 : 0);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 h-20 bg-background border-t border-border/30 shadow-lg z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Track Info */}
        <div className="flex items-center space-x-3 w-1/4">
          <img
            src={currentTrack.albumArt}
            alt={currentTrack.title}
            className="h-12 w-12 rounded-md object-cover"
          />
          <div className="hidden sm:block overflow-hidden">
            <h4 className="text-sm font-medium truncate">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
                  onClick={toggleLike}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLiked ? "Unlike" : "Like"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center justify-center w-2/4">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${isShuffleOn ? "text-primary" : "text-muted-foreground"}`}
                    onClick={toggleShuffle}
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shuffle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onPrevious}
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={togglePlay}
            >
              {playing ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onNext}
            >
              <SkipForward className="h-5 w-5" />
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${isRepeatOn ? "text-primary" : "text-muted-foreground"}`}
                    onClick={toggleRepeat}
                  >
                    <Repeat className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Repeat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center w-full space-x-2">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={currentTrack.duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Volume and Additional Controls */}
        <div className="flex items-center justify-end space-x-2 w-1/4">
          <TooltipProvider>
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
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <ListMusic className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Queue</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={toggleMute}
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>

            {showVolume && (
              <div
                className="absolute bottom-full right-0 mb-2 p-2 bg-background shadow-lg rounded-md w-32"
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
              >
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;
