// Spotify API client

// Function to get Spotify access token
export async function getSpotifyToken() {
  try {
    // Using client credentials flow with real Spotify API credentials
    // These are example credentials - in a real app, these would be environment variables
    const clientId = "f81b88e496d9449e9ec00b2c5f9b3e3c";
    const clientSecret = "c7a775f096ec4acd9a0d4a2c27c8f8a1";

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting Spotify token:", error);
    return null;
  }
}

// Function to search for tracks
export async function searchTracks(query: string) {
  try {
    const token = await getSpotifyToken();
    if (!token) return [];

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10&market=US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (data.error) {
      console.error("Spotify API error:", data.error);
      return [];
    }

    return data.tracks.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(", "),
      albumArt: track.album.images[0]?.url || "",
      genre: track.album.genres?.[0] || "Unknown", // Spotify search doesn't return genres directly
      audioUrl: track.preview_url || "",
      duration: formatDuration(track.duration_ms),
      duration_ms: track.duration_ms,
      externalUrl: track.external_urls.spotify,
      popularity: track.popularity,
      releaseDate: track.album.release_date,
    }));
  } catch (error) {
    console.error("Error searching tracks:", error);
    return [];
  }
}

// Function to get track details including audio features
export async function getTrackDetails(trackId: string) {
  try {
    const token = await getSpotifyToken();
    if (!token) return null;

    // Get track details
    const trackResponse = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const trackData = await trackResponse.json();

    if (trackData.error) {
      console.error("Spotify API error:", trackData.error);
      return null;
    }

    // Get audio features for the track
    const featuresResponse = await fetch(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const featuresData = await featuresResponse.json();

    if (featuresData.error) {
      console.error("Spotify API error:", featuresData.error);
    }

    return {
      id: trackData.id,
      title: trackData.name,
      artist: trackData.artists.map((artist: any) => artist.name).join(", "),
      albumArt: trackData.album.images[0]?.url || "",
      genre: trackData.album.genres?.[0] || "Unknown",
      audioUrl: trackData.preview_url || "",
      duration: formatDuration(trackData.duration_ms),
      duration_ms: trackData.duration_ms,
      externalUrl: trackData.external_urls.spotify,
      popularity: trackData.popularity,
      releaseDate: trackData.album.release_date,
      // Audio features
      tempo: featuresData.tempo,
      key: featuresData.key,
      mode: featuresData.mode,
      timeSignature: featuresData.time_signature,
      danceability: featuresData.danceability,
      energy: featuresData.energy,
      valence: featuresData.valence,
    };
  } catch (error) {
    console.error("Error getting track details:", error);
    return null;
  }
}

// Helper function to format duration from milliseconds to MM:SS
function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
