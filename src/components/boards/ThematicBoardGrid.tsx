import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThematicBoard from "./ThematicBoard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, SlidersHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ThematicBoardData {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pinCount: number;
  likes: number;
  isLiked: boolean;
  theme: "chill" | "workout" | "party" | "focus" | "travel" | "custom";
  pins: Array<{
    id: string;
    title: string;
    artist: string;
    albumArt: string;
    duration: string;
    likes: number;
    isLiked: boolean;
    genre: string;
  }>;
}

interface ThematicBoardGridProps {
  boards?: ThematicBoardData[];
  isLoading?: boolean;
}

const ThematicBoardGrid = ({
  boards = [],
  isLoading = false,
}: ThematicBoardGridProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBoards, setFilteredBoards] =
    useState<ThematicBoardData[]>(boards);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newBoard, setNewBoard] = useState({
    title: "",
    description: "",
    theme: "custom" as const,
  });

  // Filter boards based on active tab and search query
  React.useEffect(() => {
    let filtered = [...boards];

    // Filter by theme
    if (activeTab !== "all") {
      filtered = filtered.filter((board) => board.theme === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (board) =>
          board.title.toLowerCase().includes(query) ||
          board.description.toLowerCase().includes(query),
      );
    }

    setFilteredBoards(filtered);
  }, [activeTab, searchQuery, boards]);

  const handleBoardClick = (boardId: string) => {
    navigate(`/boards/${boardId}`);
  };

  const handleCreateBoard = () => {
    // In a real implementation, this would create a new board in the database
    console.log("Creating new board:", newBoard);
    setIsCreateDialogOpen(false);
    // Reset form
    setNewBoard({
      title: "",
      description: "",
      theme: "custom",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading boards...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Thematic Boards</h1>
            <p className="text-muted-foreground">
              Organize your music by mood, genre, or occasion
            </p>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Create Board</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Board</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Board Title</Label>
                  <Input
                    id="title"
                    placeholder="My Awesome Playlist"
                    value={newBoard.title}
                    onChange={(e) =>
                      setNewBoard({ ...newBoard, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What's this board about?"
                    value={newBoard.description}
                    onChange={(e) =>
                      setNewBoard({ ...newBoard, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={newBoard.theme}
                    onValueChange={(value: any) =>
                      setNewBoard({ ...newBoard, theme: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chill">🌊 Chill</SelectItem>
                      <SelectItem value="workout">💪 Workout</SelectItem>
                      <SelectItem value="party">🎉 Party</SelectItem>
                      <SelectItem value="focus">🧠 Focus</SelectItem>
                      <SelectItem value="travel">✈️ Travel</SelectItem>
                      <SelectItem value="custom">🎵 Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={handleCreateBoard}
                  disabled={!newBoard.title}
                >
                  Create Board
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid grid-cols-3 sm:grid-cols-7">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="chill">Chill</TabsTrigger>
              <TabsTrigger value="workout">Workout</TabsTrigger>
              <TabsTrigger value="party">Party</TabsTrigger>
              <TabsTrigger value="focus">Focus</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search boards..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {filteredBoards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoards.map((board) => (
              <ThematicBoard
                key={board.id}
                id={board.id}
                title={board.title}
                description={board.description}
                coverImage={board.coverImage}
                pinCount={board.pinCount}
                likes={board.likes}
                isLiked={board.isLiked}
                theme={board.theme}
                pins={board.pins}
                onClick={() => handleBoardClick(board.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-secondary/30 p-4 rounded-full mb-4">
              <Music className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              It's kinda empty in here
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
              {searchQuery
                ? `No boards match "${searchQuery}". Try a different search term.`
                : activeTab !== "all"
                  ? `You don't have any ${activeTab} boards yet. Create one to get started!`
                  : "You haven't created any boards yet. Start organizing your music by creating your first thematic board!"}
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Create Your First Board
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThematicBoardGrid;
