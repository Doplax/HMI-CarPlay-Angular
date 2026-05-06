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
  isLoading = true;
  error = false;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.getLibrary().subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.error = true;
      },
    });
  }
}
