import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MediaItem } from '@shared/types/media.type';

@Injectable({ providedIn: 'root' })
export class MediaPlayerService implements OnDestroy {
  private currentMedia$ = new BehaviorSubject<MediaItem | null>(null);
  private isPlaying$ = new BehaviorSubject<boolean>(false);
  private progressMs$ = new BehaviorSubject<number>(0);

  private audio: HTMLAudioElement = new Audio();
  private fallbackTimer?: number;

  constructor() {
    this.audio.preload = 'metadata';
    this.audio.addEventListener('timeupdate', () => {
      this.progressMs$.next(this.audio.currentTime * 1000);
    });
    this.audio.addEventListener('ended', () => {
      this.isPlaying$.next(false);
      this.stopFallbackTimer();
    });
    this.audio.addEventListener('pause', () => {
      if (!this.audio.ended) this.isPlaying$.next(false);
      this.stopFallbackTimer();
    });
    this.audio.addEventListener('play', () => {
      this.isPlaying$.next(true);
    });
  }

  ngOnDestroy(): void {
    this.stop();
  }

  getCurrentMedia(): Observable<MediaItem | null> {
    return this.currentMedia$.asObservable();
  }

  getIsPlaying(): Observable<boolean> {
    return this.isPlaying$.asObservable();
  }

  getProgress(): Observable<number> {
    return this.progressMs$.asObservable();
  }

  get currentMediaValue(): MediaItem | null {
    return this.currentMedia$.value;
  }

  load(item: MediaItem): void {
    if (this.currentMedia$.value?.id === item.id) return;
    this.stopFallbackTimer();
    this.currentMedia$.next(item);
    this.progressMs$.next(0);
    this.audio.src = item.previewUrl ?? '';
  }

  play(item?: MediaItem): void {
    if (item) this.load(item);
    const current = this.currentMedia$.value;
    if (!current) return;

    if (current.previewUrl) {
      this.audio.play().catch(() => this.isPlaying$.next(false));
    } else {
      this.isPlaying$.next(true);
      this.startFallbackTimer();
    }
  }

  pause(): void {
    if (this.currentMedia$.value?.previewUrl) {
      this.audio.pause();
    } else {
      this.isPlaying$.next(false);
      this.stopFallbackTimer();
    }
  }

  toggle(): void {
    this.isPlaying$.value ? this.pause() : this.play();
  }

  seek(ms: number): void {
    const current = this.currentMedia$.value;
    if (!current) return;
    const clamped = Math.max(0, Math.min(current.durationMs, ms));
    this.progressMs$.next(clamped);
    if (current.previewUrl) {
      this.audio.currentTime = clamped / 1000;
    }
  }

  stop(): void {
    this.audio.pause();
    this.audio.src = '';
    this.stopFallbackTimer();
    this.isPlaying$.next(false);
    this.progressMs$.next(0);
    this.currentMedia$.next(null);
  }

  private startFallbackTimer(): void {
    this.stopFallbackTimer();
    this.fallbackTimer = window.setInterval(() => {
      const current = this.currentMedia$.value;
      if (!current) return;
      const next = this.progressMs$.value + 1000;
      if (next >= current.durationMs) {
        this.progressMs$.next(current.durationMs);
        this.isPlaying$.next(false);
        this.stopFallbackTimer();
      } else {
        this.progressMs$.next(next);
      }
    }, 1000);
  }

  private stopFallbackTimer(): void {
    if (this.fallbackTimer) {
      window.clearInterval(this.fallbackTimer);
      this.fallbackTimer = undefined;
    }
  }
}
