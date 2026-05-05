export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  artworkLarge: string;
  durationMs: number;
  previewUrl?: string;
  releaseDate?: string;
  genre?: string;
}

export interface ITunesSearchResponse {
  resultCount: number;
  results: ITunesTrack[];
}

export interface ITunesTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl60?: string;
  artworkUrl100: string;
  trackTimeMillis: number;
  previewUrl?: string;
  releaseDate?: string;
  primaryGenreName?: string;
}
