import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MusicTrack } from '../../types/music.type';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'music-card',
  standalone: false,
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.scss',
})
export class MusicCardComponent {
  @Input({ required: true }) track!: MusicTrack;

  constructor(
    private musicService: MusicService,
    private router: Router,
  ) {}

  play(): void {
    this.musicService.playTrack(this.track);
    this.router.navigate(['/music', 'player', this.track.id]);
  }

  formatDuration(ms: number): string {
    if (!ms) return '';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
