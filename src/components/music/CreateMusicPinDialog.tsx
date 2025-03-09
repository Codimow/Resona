import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Music,
  Search,
  Upload,
  X,
  ExternalLink,
  Play,
  Pause,
  Scissors,
  Save,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { searchTracks, getTrackDetails } from "@/lib/spotify";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

interface CreateMusicPinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePin: (pin: {
    title: string;
    artist: string;
    albumArt: string;
    genre: string;
    audioUrl: string;
    description: string;
    duration?: string;
    externalUrl?: string;
    snippetStart?: number;
    snippetEnd?: number;
  }) => void;
}

const CreateMusicPinDialog = ({
  open,
  onOpenChange,
  onCreatePin,
}: CreateMusicPinDialogProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumArt, setAlbumArt] = useState("");
  const [genre, setGenre] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [description, setDescription] = useState("");
  const [durationString, setDurationString] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState("");

  // Audio preview and snippet selection
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [snippetStart, setSnippetStart] = useState(0);
  const [snippetEnd, setSnippetEnd] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setAlbumArt("");
    setGenre("");
    setAudioUrl("");
    setDescription("");
    setDurationString("");
    setExternalUrl("");
    setSearchQuery("");
    setSearchResults([]);
    setPreviewImage("");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Save to database if user is logged in
      if (user) {
        const { data, error } = await supabase
          .from("music_pins")
          .insert({
            title,
            artist,
            album_art:
              albumArt ||
              "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
            genre,
            streaming_url: audioUrl,
            user_id: user.id,
            snippet_start: snippetStart,
            snippet_end: snippetEnd || duration,
            description,
            external_url: externalUrl,
          })
          .select();

        if (error) {
          console.error("Error saving pin:", error);
        } else {
          console.log("Pin saved successfully:", data);
        }
      }

      // Pass the data to the parent component
      onCreatePin({
        title,
        artist,
        albumArt:
          albumArt ||
          "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
        genre,
        audioUrl,
        description,
        duration: formatTime(snippetEnd - snippetStart),
        externalUrl,
        snippetStart,
        snippetEnd: snippetEnd || duration,
      });

      handleClose();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    try {
      const results = await searchTracks(searchQuery);
      console.log("Search results:", results);

      if (results && results.length > 0) {
        setSearchResults(results);
      } else {
        // Fallback to sample tracks if no results
        setSearchResults([
          {
            id: "1",
            title: "Blinding Lights",
            artist: "The Weeknd",
            albumArt:
              "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
            genre: "Pop",
            audioUrl:
              "https://p.scdn.co/mp3-preview/5ee45fec252a6f98e30bcd8011db6d895d95b8de",
            duration: "3:20",
            externalUrl:
              "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
          },
          {
            id: "2",
            title: "Save Your Tears",
            artist: "The Weeknd",
            albumArt:
              "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
            genre: "Pop",
            audioUrl:
              "https://p.scdn.co/mp3-preview/9c7c8a3b1d70c5c629232aea3159455672f8d603",
            duration: "3:35",
            externalUrl:
              "https://open.spotify.com/track/5QO79kh1waicV47BqGRL3g",
          },
        ]);
      }
    } catch (error) {
      console.error("Error searching tracks:", error);
      // Show error message to user
      alert("Failed to search tracks. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = async (result: any) => {
    console.log("Selected track:", result);

    setTitle(result.title);
    setArtist(result.artist);
    setAlbumArt(result.albumArt);
    setGenre(result.genre);
    setAudioUrl(result.audioUrl || "");
    setDurationString(result.duration || "");
    setExternalUrl(result.externalUrl || "");

    // Reset snippet selection
    setSnippetStart(0);
    setSnippetEnd(0);
    setCurrentTime(0);
    setIsPlaying(false);

    // Try to get more detailed track info including audio features
    try {
      const trackDetails = await getTrackDetails(result.id);
      if (trackDetails) {
        // Update with more detailed information if available
        console.log("Track details:", trackDetails);

        // Only update fields that aren't already set
        if (!genre && trackDetails.genre) setGenre(trackDetails.genre);
        if (trackDetails.audioUrl) setAudioUrl(trackDetails.audioUrl);

        // Set description with track details
        const detailsText = [
          trackDetails.releaseDate
            ? `Released: ${new Date(trackDetails.releaseDate).getFullYear()}`
            : "",
          trackDetails.tempo
            ? `Tempo: ${Math.round(trackDetails.tempo)} BPM`
            : "",
          trackDetails.energy
            ? `Energy: ${Math.round(trackDetails.energy * 100)}%`
            : "",
          trackDetails.danceability
            ? `Danceability: ${Math.round(trackDetails.danceability * 100)}%`
            : "",
        ]
          .filter(Boolean)
          .join(" • ");

        if (detailsText) {
          setDescription(detailsText);
        }
      }
    } catch (error) {
      console.error("Error getting track details:", error);
    }

    // If there's a duration in milliseconds, convert it
    if (result.duration_ms) {
      const durationInSeconds = Math.floor(result.duration_ms / 1000);
      setDuration(durationInSeconds);
      setSnippetEnd(durationInSeconds);
    }

    // Hide search results
    setSearchResults([]);
    setSearchQuery("");
  };

  // Audio player controls
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // If we're at the end of the snippet, go back to start
      if (currentTime >= snippetEnd) {
        audioRef.current.currentTime = snippetStart;
      }
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    // If we're playing a snippet and reached the end, pause and go back to start
    if (snippetEnd > 0 && time >= snippetEnd) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.currentTime = snippetStart;
      setCurrentTime(snippetStart);
    }
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    const audioDuration = audioRef.current.duration;
    setDuration(audioDuration);

    // If snippet end is not set, set it to the full duration
    if (snippetEnd === 0) {
      setSnippetEnd(audioDuration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;

    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const setSnippetMarker = (type: "start" | "end") => {
    if (type === "start") {
      setSnippetStart(currentTime);
      // If current time is after snippet end, adjust snippet end
      if (snippetEnd < currentTime) {
        setSnippetEnd(Math.min(currentTime + 30, duration));
      }
    } else {
      setSnippetEnd(currentTime);
      // If current time is before snippet start, adjust snippet start
      if (snippetStart > currentTime) {
        setSnippetStart(Math.max(currentTime - 30, 0));
      }
    }
  };

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleImagePreview = (url: string) => {
    if (!url) return;
    setPreviewImage(url);
    setAlbumArt(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" /> Create New Music Pin
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Search Section */}
          <div className="space-y-2">
            <Label>Search for music</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Search for a song, artist, or album"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="border rounded-md p-3 space-y-2 max-h-[200px] overflow-y-auto">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Search Results</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchResults([])}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-3 p-2 hover:bg-secondary/50 rounded-md cursor-pointer"
                    onClick={() => selectSearchResult(result)}
                  >
                    <img
                      src={result.albumArt}
                      alt={result.title}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {result.artist}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {result.duration}
                        </Badge>
                        {result.audioUrl ? (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-green-100 text-green-800"
                          >
                            Preview Available
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-xs text-red-500 border-red-200"
                          >
                            No Preview
                          </Badge>
                        )}
                        {result.popularity && (
                          <Badge variant="outline" className="text-xs">
                            {result.popularity}% Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    {result.externalUrl && (
                      <a
                        href={result.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audio Preview and Snippet Selection */}
          {audioUrl && (
            <div className="border rounded-md p-4 space-y-4">
              <h4 className="text-sm font-medium">
                Audio Preview & Snippet Selection
              </h4>

              <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={togglePlay}
                  disabled={!audioUrl}
                  className="w-20"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" /> Play
                    </>
                  )}
                </Button>

                <div className="text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span className="mx-2">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="relative pt-5">
                {/* Snippet markers */}
                {snippetStart > 0 && (
                  <div
                    className="absolute top-0 h-5 w-0.5 bg-green-500 z-10"
                    style={{ left: `${(snippetStart / duration) * 100}%` }}
                  />
                )}
                {snippetEnd > 0 && (
                  <div
                    className="absolute top-0 h-5 w-0.5 bg-red-500 z-10"
                    style={{ left: `${(snippetEnd / duration) * 100}%` }}
                  />
                )}

                {/* Snippet range highlight */}
                <div
                  className="absolute top-0 h-5 bg-primary/20"
                  style={{
                    left: `${(snippetStart / duration) * 100}%`,
                    width: `${((snippetEnd - snippetStart) / duration) * 100}%`,
                  }}
                />

                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration}
                  step={0.1}
                  onValueChange={handleSeek}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSnippetMarker("start")}
                    className="mr-2"
                  >
                    <Scissors className="h-4 w-4 mr-2" /> Set Start
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSnippetMarker("end")}
                  >
                    <Scissors className="h-4 w-4 mr-2" /> Set End
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  Snippet: {formatTime(snippetStart)} - {formatTime(snippetEnd)}
                  ({formatTime(snippetEnd - snippetStart)})
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Song title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artist">Artist *</Label>
                <Input
                  id="artist"
                  placeholder="Artist name"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  placeholder="e.g. Pop, Rock, Hip Hop"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audioUrl">Audio URL *</Label>
                <Input
                  id="audioUrl"
                  placeholder="URL to audio file"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Right Column - Album Art & Description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Album Art</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-4 h-[180px]">
                  {previewImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previewImage}
                        alt="Album art preview"
                        className="w-full h-full object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0 h-6 w-6"
                        onClick={() => {
                          setPreviewImage("");
                          setAlbumArt("");
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Album Art URL</p>
                        <p className="text-xs text-muted-foreground">
                          Enter a URL for the album cover
                        </p>
                      </div>
                      <Input
                        placeholder="https://example.com/album-art.jpg"
                        value={albumArt}
                        onChange={(e) => setAlbumArt(e.target.value)}
                        className="mt-2"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => handleImagePreview(albumArt)}
                        disabled={!albumArt}
                      >
                        Preview
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description or notes about this music"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-[80px]"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title || !artist || !audioUrl || isSaving}
            >
              {isSaving ? (
                <>
                  <Save className="h-4 w-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Create Pin
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMusicPinDialog;
