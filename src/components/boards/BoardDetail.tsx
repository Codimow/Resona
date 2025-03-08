import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Share2,
  Edit2,
  Trash2,
  Plus,
  ArrowLeft,
  Search,
  Music,
  MoreHorizontal,
  Users,
  Lock,
  Globe,
  X,
} from "lucide-react";
import MusicPin from "../music/MusicPin";
import MusicPinGrid from "../music/MusicPinGrid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const themeIcons = {
  chill: "🌊",
  workout: "💪",
  party: "🎉",
  focus: "🧠",
  travel: "✈️",
  custom: "🎵",
};

const themeColors = {
  chill: "from-blue-500/20 to-purple-500/20 border-blue-500/30",
  workout: "from-red-500/20 to-orange-500/20 border-red-500/30",
  party: "from-pink-500/20 to-purple-500/20 border-pink-500/30",
  focus: "from-green-500/20 to-teal-500/20 border-green-500/30",
  travel: "from-amber-500/20 to-yellow-500/20 border-amber-500/30",
  custom: "from-primary/20 to-primary/10 border-primary/30",
};

const BoardDetail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);

  // Board data - would be fetched from API in a real app
  const board = {
    id: boardId || "",
    title: "",
    description: "",
    coverImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    createdAt: "",
    updatedAt: "",
    pinCount: 0,
    likes: likeCount,
    isLiked: isLiked,
    isPublic: true,
    owner: {
      id: "",
      name: "",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    },
    theme: "custom" as const,
    collaborators: [],
  };

  // Pins data - would be fetched from API in a real app
  const pins: Array<{
    id: string;
    title: string;
    artist: string;
    albumArt: string;
    duration: string;
    likes: number;
    isLiked: boolean;
    streamingServices: Array<{ name: string; url: string }>;
    genre: string;
  }> = [];

  // State for edit form
  const [editForm, setEditForm] = useState({
    title: board.title,
    description: board.description,
    isPublic: board.isPublic,
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log("Sharing board:", board.id);
  };

  const handleEdit = () => {
    // In a real app, this would update the board in the database
    console.log("Updating board:", { ...board, ...editForm });
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    // In a real app, this would delete the board from the database
    console.log("Deleting board:", board.id);
    setIsDeleteDialogOpen(false);
    navigate("/boards");
  };

  const [isAddPinDialogOpen, setIsAddPinDialogOpen] = useState(false);
  const [searchPinQuery, setSearchPinQuery] = useState("");
  const [availablePins, setAvailablePins] = useState<
    Array<{
      id: string;
      title: string;
      artist: string;
      albumArt: string;
      duration: string;
      likes: number;
      isLiked: boolean;
      streamingServices: Array<{ name: string; url: string }>;
      genre: string;
    }>
  >([]);
  const [selectedPins, setSelectedPins] = useState<string[]>([]);

  const handleAddPin = () => {
    setIsAddPinDialogOpen(true);
  };

  const handleAddPinSubmit = () => {
    // In a real app, this would add the selected pins to the board in the database
    console.log("Adding pins to board:", selectedPins);
    setIsAddPinDialogOpen(false);
    setSelectedPins([]);
    setSearchPinQuery("");
  };

  const handlePinSelect = (pinId: string) => {
    if (selectedPins.includes(pinId)) {
      setSelectedPins(selectedPins.filter((id) => id !== pinId));
    } else {
      setSelectedPins([...selectedPins, pinId]);
    }
  };

  const filteredPins = pins.filter((pin) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      pin.title.toLowerCase().includes(query) ||
      pin.artist.toLowerCase().includes(query) ||
      pin.genre.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-background pt-[70px]">
      <Helmet>
        <title>{board.title} | Resona</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/boards")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Boards
        </Button>

        {/* Board header */}
        <div className="relative mb-8">
          <div className="h-64 rounded-xl overflow-hidden relative">
            <div
              className={`absolute inset-0 bg-gradient-to-br opacity-30 ${themeColors[board.theme]}`}
            ></div>
            <img
              src={board.coverImage}
              alt={board.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-background/90"></div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge
                  variant="outline"
                  className="mb-2 bg-background/80 backdrop-blur-sm"
                >
                  {themeIcons[board.theme]}{" "}
                  {board.theme.charAt(0).toUpperCase() + board.theme.slice(1)}
                </Badge>
                <h1 className="text-3xl font-bold text-white drop-shadow-md">
                  {board.title}
                </h1>
                <p className="text-white/90 max-w-2xl mt-1 drop-shadow-md">
                  {board.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  {likeCount}
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                      <Edit2 className="h-4 w-4 mr-2" /> Edit Board
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Board
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center mt-4 text-sm text-white/80">
              <div className="flex items-center mr-4">
                <img
                  src={board.owner.avatar}
                  alt={board.owner.name}
                  className="h-6 w-6 rounded-full mr-2"
                />
                {board.owner.name}
              </div>
              {board.collaborators.length > 0 && (
                <div className="flex items-center mr-4">
                  <Users className="h-4 w-4 mr-1" />
                  {board.collaborators.length} collaborator
                  {board.collaborators.length !== 1 ? "s" : ""}
                </div>
              )}
              <div className="flex items-center">
                {board.isPublic ? (
                  <>
                    <Globe className="h-4 w-4 mr-1" /> Public
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-1" /> Private
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search and add pins */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative flex-grow sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pins in this board..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAddPin}>
            <Plus className="h-4 w-4 mr-2" /> Add Pin
          </Button>
        </div>

        {/* Pins grid */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-secondary/30 p-4 rounded-full mb-4">
            <Music className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            It's kinda empty in here
          </h3>
          <p className="text-muted-foreground max-w-md mb-6">
            {searchQuery
              ? `No pins match "${searchQuery}". Try a different search term.`
              : "This board doesn't have any pins yet. Add some music to get started!"}
          </p>
          <Button onClick={handleAddPin}>
            <Plus className="h-4 w-4 mr-2" /> Add Your First Pin
          </Button>
        </div>
      </div>

      {/* Edit Board Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Board</DialogTitle>
            <DialogDescription>
              Make changes to your board. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Board Title</Label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-public"
                checked={editForm.isPublic}
                onCheckedChange={(checked) =>
                  setEditForm({ ...editForm, isPublic: checked })
                }
              />
              <Label htmlFor="edit-public">Public Board</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Board</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this board? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Pin Dialog */}
      <Dialog open={isAddPinDialogOpen} onOpenChange={setIsAddPinDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Pins to Board</DialogTitle>
            <DialogDescription>
              Search for music to add to your board.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for songs, artists, or albums..."
                className="pl-9"
                value={searchPinQuery}
                onChange={(e) => setSearchPinQuery(e.target.value)}
              />
            </div>

            <div className="border rounded-md p-4">
              <h4 className="text-sm font-medium mb-3">Search Results</h4>
              {searchPinQuery ? (
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {/* This would normally be populated with search results */}
                  <div className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-md">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&q=80"
                        alt="Blinding Lights"
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">Blinding Lights</p>
                        <p className="text-xs text-muted-foreground">
                          The Weeknd
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => handlePinSelect("pin-1")}
                    >
                      {selectedPins.includes("pin-1") ? "Selected" : "Select"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-md">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1619983081563-430f63602796?w=100&q=80"
                        alt="Levitating"
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">Levitating</p>
                        <p className="text-xs text-muted-foreground">
                          Dua Lipa
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => handlePinSelect("pin-2")}
                    >
                      {selectedPins.includes("pin-2") ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter a search term to find music</p>
                </div>
              )}
            </div>

            {selectedPins.length > 0 && (
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium">Selected Pins</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPins([])}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPins.includes("pin-1") && (
                    <div className="flex items-center gap-2 bg-secondary/50 rounded-full pl-2 pr-1 py-1">
                      <span className="text-xs">Blinding Lights</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => handlePinSelect("pin-1")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  {selectedPins.includes("pin-2") && (
                    <div className="flex items-center gap-2 bg-secondary/50 rounded-full pl-2 pr-1 py-1">
                      <span className="text-xs">Levitating</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => handlePinSelect("pin-2")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddPinDialogOpen(false);
                setSelectedPins([]);
                setSearchPinQuery("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddPinSubmit}
              disabled={selectedPins.length === 0}
            >
              Add to Board
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoardDetail;
