import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Play, Pause, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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
}: MusicPinProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would trigger audio playback
  };

  return (
    <TooltipProvider>
      <Card className="w-[280px] h-[380px] overflow-hidden flex flex-col bg-background shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/30">
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
              className="rounded-full bg-white/90 hover:bg-white"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </div>
          <Badge className="absolute top-2 right-2 bg-black/70">{genre}</Badge>
          <div className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-2 py-1 rounded">
            {duration}
          </div>
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
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default MusicPin;
