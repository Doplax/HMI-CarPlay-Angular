import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { MusicTrack } from '../../types/music.type';

@Component({
  selector: 'music-library-page',
  standalone: false,
  templateUrl: './music-library-page.component.html',
  styleUrls: ['../music-home-page/music-home-page.component.scss'],
})
export class MusicLibraryPageComponent implements OnInit {
  tracks: MusicTrack[] = [];
  loading = true;
  error = false;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.getLibrary().subscribe({
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
