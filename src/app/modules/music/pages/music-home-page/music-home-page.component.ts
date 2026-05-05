import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { MusicTrack } from '../../types/music.type';

@Component({
  selector: 'music-home-page',
  standalone: false,
  templateUrl: './music-home-page.component.html',
  styleUrl: './music-home-page.component.scss',
})
export class MusicHomePageComponent implements OnInit {
  tracks: MusicTrack[] = [];
  loading = true;
  error = false;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.getTopPicks().subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }
}
