import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicService } from '../../services/music.service';
import { MediaPlayerService } from '@shared/services/media-player.service';
import { MediaItem } from '@shared/types/media.type';

@Component({
  selector: 'music-player-page',
  standalone: false,
  templateUrl: './music-player-page.component.html',
  styleUrl: './music-player-page.component.scss',
})
export class MusicPlayerPageComponent implements OnInit, OnDestroy {
  media: MediaItem | null = null;
  isPlaying = false;
  progressMs = 0;

  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicService: MusicService,
    private mediaPlayer: MediaPlayerService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/music', 'home']);
      return;
    }

    this.subscriptions.add(
      this.mediaPlayer.getCurrentMedia().subscribe((media) => (this.media = media)),
    );
    this.subscriptions.add(
      this.mediaPlayer.getIsPlaying().subscribe((playing) => (this.isPlaying = playing)),
    );
    this.subscriptions.add(
      this.mediaPlayer.getProgress().subscribe((ms) => (this.progressMs = ms)),
    );

    if (this.mediaPlayer.currentMediaValue?.id === id) return;

    const cached = this.musicService.getTrackById(id);
    if (cached) {
      this.musicService.playTrack(cached);
      return;
    }

    this.musicService.getTopPicks().subscribe(() => {
      const track = this.musicService.getTrackById(id);
      if (!track) {
        this.router.navigate(['/music', 'home']);
        return;
      }
      this.musicService.playTrack(track);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  togglePlay(): void {
    this.mediaPlayer.toggle();
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
    if (!this.media) return '0:00';
    const remaining = Math.max(0, this.media.durationMs - this.progressMs);
    return `-${this.formatTime(remaining)}`;
  }

  progressPercent(): number {
    if (!this.media || !this.media.durationMs) return 0;
    return Math.min(100, (this.progressMs / this.media.durationMs) * 100);
  }
}
