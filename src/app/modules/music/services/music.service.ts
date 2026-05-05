import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { ITunesSearchResponse, ITunesTrack, MusicTrack } from '../types/music.type';
import { MediaPlayerService } from '@shared/services/media-player.service';
import { MediaItem } from '@shared/types/media.type';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly baseUrl = 'https://itunes.apple.com';
  private cache = new Map<string, Observable<MusicTrack[]>>();
  private trackById = new Map<string, MusicTrack>();

  constructor(
    private http: HttpClient,
    private mediaPlayer: MediaPlayerService,
  ) {}

  getTopPicks(): Observable<MusicTrack[]> {
    return this.search('top hits 2025', 18, 'topPicks');
  }

  getNewReleases(): Observable<MusicTrack[]> {
    return this.search('new music', 18, 'newReleases');
  }

  getRadio(): Observable<MusicTrack[]> {
    return this.search('apple music radio', 12, 'radio');
  }

  getLibrary(): Observable<MusicTrack[]> {
    return this.search('greatest hits', 12, 'library');
  }

  getTrackById(id: string): MusicTrack | undefined {
    return this.trackById.get(id);
  }

  playTrack(track: MusicTrack): void {
    this.trackById.set(track.id, track);
    this.mediaPlayer.play(this.toMediaItem(track));
  }

  loadTrack(track: MusicTrack): void {
    this.trackById.set(track.id, track);
    this.mediaPlayer.load(this.toMediaItem(track));
  }

  toMediaItem(track: MusicTrack): MediaItem {
    return {
      id: track.id,
      source: 'music',
      title: track.title,
      subtitle: track.artist,
      album: track.album,
      artwork: track.artwork,
      artworkLarge: track.artworkLarge,
      durationMs: track.durationMs,
      previewUrl: track.previewUrl,
    };
  }

  private search(term: string, limit: number, cacheKey: string): Observable<MusicTrack[]> {
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    const url = `${this.baseUrl}/search?term=${encodeURIComponent(term)}&entity=song&limit=${limit}`;
    const request$ = this.http.get<ITunesSearchResponse>(url).pipe(
      map((response) => response.results.map((t) => this.toMusicTrack(t))),
      tap((tracks) => tracks.forEach((t) => this.trackById.set(t.id, t))),
      shareReplay(1)
    );
    this.cache.set(cacheKey, request$);
    return request$;
  }

  private toMusicTrack(t: ITunesTrack): MusicTrack {
    const artworkLarge = t.artworkUrl100.replace('100x100bb', '600x600bb');
    return {
      id: String(t.trackId),
      title: t.trackName,
      artist: t.artistName,
      album: t.collectionName,
      artwork: t.artworkUrl100,
      artworkLarge,
      durationMs: t.trackTimeMillis,
      previewUrl: t.previewUrl,
      releaseDate: t.releaseDate,
      genre: t.primaryGenreName,
    };
  }
}
