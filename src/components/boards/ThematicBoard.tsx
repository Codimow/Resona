import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Music, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import MusicPin from "../music/MusicPin";

interface ThematicBoardProps {
  id?: string;
  title?: string;
  description?: string;
  coverImage?: string;
  pinCount?: number;
  likes?: number;
  isLiked?: boolean;
  theme?: "chill" | "workout" | "party" | "focus" | "travel" | "custom";
  pins?: Array<{
    id: string;
    title: string;
    artist: string;
    albumArt: string;
    duration: string;
    likes: number;
    isLiked: boolean;
    genre: string;
  }>;
  onLike?: () => void;
  onShare?: () => void;
  onClick?: () => void;
}

const themeColors = {
  chill: "from-blue-500/20 to-purple-500/20 border-blue-500/30",
  workout: "from-red-500/20 to-orange-500/20 border-red-500/30",
  party: "from-pink-500/20 to-purple-500/20 border-pink-500/30",
  focus: "from-green-500/20 to-teal-500/20 border-green-500/30",
  travel: "from-amber-500/20 to-yellow-500/20 border-amber-500/30",
  custom: "from-primary/20 to-primary/10 border-primary/30",
};

const themeIcons = {
  chill: "🌊",
  workout: "💪",
  party: "🎉",
  focus: "🧠",
  travel: "✈️",
  custom: "🎵",
};

const ThematicBoard = ({
  id = "",
  title = "",
  description = "",
  coverImage = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
  pinCount = 0,
  likes = 0,
  isLiked = false,
  theme = "custom",
  pins = [],
  onLike = () => {},
  onShare = () => {},
  onClick = () => {},
}: ThematicBoardProps) => {
  const [liked, setLiked] = React.useState(isLiked);
  const [likeCount, setLikeCount] = React.useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    onLike();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare();
  };

  // No pins to preview

  return (
    <Card
      className={cn(
        "w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer bg-background",
        "border-2",
        themeColors[theme],
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br opacity-80"></div>
        <div className="h-48 overflow-hidden relative">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-30",
              themeColors[theme],
            )}
          ></div>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/90"></div>
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-1 rounded-full">
            <Badge variant="outline" className="text-xs font-normal">
              {themeIcons[theme]}{" "}
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="h-24 border-2 border-dashed border-border/50 rounded-md flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Add your first pin</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2 border-t border-border/30">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${liked ? "text-red-500" : "text-muted-foreground"}`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
          </Button>
          <span className="text-xs text-muted-foreground">{likeCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs flex items-center gap-1"
          >
            <Plus className="h-3 w-3" /> Add Pin
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThematicBoard;
