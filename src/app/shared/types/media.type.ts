export type MediaSource = 'music' | 'audiobook';

export interface MediaItem {
  id: string;
  source: MediaSource;
  title: string;
  subtitle: string;
  album?: string;
  artwork: string;
  artworkLarge: string;
  durationMs: number;
  previewUrl?: string;
}
