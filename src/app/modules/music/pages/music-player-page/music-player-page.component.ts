import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { MusicTrack } from '../../types/music.type';

@Component({
  selector: 'music-player-page',
  standalone: false,
  templateUrl: './music-player-page.component.html',
  styleUrl: './music-player-page.component.scss',
})
export class MusicPlayerPageComponent implements OnInit, OnDestroy {
  track: MusicTrack | null = null;
  isPlaying = true;
  progressMs = 1000;
  private audio?: HTMLAudioElement;
  private timer?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicService: MusicService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/music', 'home']);
      return;
    }
    const cached = this.musicService.getTrackById(id);
    if (cached) {
      this.track = cached;
      this.startPreview();
    } else {
      this.musicService.getTopPicks().subscribe({
        next: () => {
          this.track = this.musicService.getTrackById(id) ?? null;
          if (!this.track) {
            this.router.navigate(['/music', 'home']);
            return;
          }
          this.startPreview();
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.stopPreview();
  }

  togglePlay(): void {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(() => {});
    }
    this.isPlaying = !this.isPlaying;
  }

  back(): void {
    this.router.navigate(['/music', 'home']);
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  formatRemaining(): string {
    if (!this.track) return '0:00';
    const remaining = Math.max(0, this.track.durationMs - this.progressMs);
    return `-${this.formatTime(remaining)}`;
  }

  progressPercent(): number {
    if (!this.track || !this.track.durationMs) return 0;
    return Math.min(100, (this.progressMs / this.track.durationMs) * 100);
  }

  private startPreview(): void {
    if (!this.track?.previewUrl) {
      this.startTimer();
      return;
    }
    this.audio = new Audio(this.track.previewUrl);
    this.audio.play().catch(() => {
      this.isPlaying = false;
    });
    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) this.progressMs = this.audio.currentTime * 1000;
    });
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }

  private startTimer(): void {
    this.timer = window.setInterval(() => {
      if (!this.isPlaying || !this.track) return;
      this.progressMs += 1000;
      if (this.progressMs >= this.track.durationMs) {
        this.progressMs = this.track.durationMs;
        this.isPlaying = false;
      }
    }, 1000);
  }

  private stopPreview(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = undefined;
    }
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
