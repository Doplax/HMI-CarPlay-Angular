import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaPlayerService } from '@shared/services/media-player.service';
import { MediaItem } from '@shared/types/media.type';

@Component({
  selector: 'app-split-view-page',
  standalone: false,
  templateUrl: './split-view-page.component.html',
  styleUrl: './split-view-page.component.scss'
})
export class SplitViewPageComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar?: ElementRef<HTMLDivElement>;

  media: MediaItem | null = null;
  isPlaying = false;
  progressMs = 0;
  isDragging = false;

  private subscriptions = new Subscription();
  private pointerMoveListener?: (event: PointerEvent) => void;
  private pointerUpListener?: (event: PointerEvent) => void;

  constructor(
    private mediaPlayer: MediaPlayerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.mediaPlayer.getCurrentMedia().subscribe((media) => (this.media = media)),
    );
    this.subscriptions.add(
      this.mediaPlayer.getIsPlaying().subscribe((playing) => (this.isPlaying = playing)),
    );
    this.subscriptions.add(
      this.mediaPlayer.getProgress().subscribe((ms) => {
        if (!this.isDragging) this.progressMs = ms;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.removeWindowListeners();
  }

  togglePlay(): void {
    if (!this.media) return;
    this.mediaPlayer.toggle();
  }

  goToMusic(): void {
    this.router.navigate(['/music']);
  }

  progressPercent(): number {
    if (!this.media || !this.media.durationMs) return 0;
    return Math.min(100, (this.progressMs / this.media.durationMs) * 100);
  }

  onScrubStart(event: PointerEvent): void {
    if (!this.media) return;
    event.preventDefault();
    this.isDragging = true;
    this.updateFromPointer(event);

    this.pointerMoveListener = (e) => this.updateFromPointer(e);
    this.pointerUpListener = () => this.endScrub();
    window.addEventListener('pointermove', this.pointerMoveListener);
    window.addEventListener('pointerup', this.pointerUpListener);
    window.addEventListener('pointercancel', this.pointerUpListener);
  }

  private endScrub(): void {
    if (!this.isDragging) return;
    this.mediaPlayer.seek(this.progressMs);
    this.isDragging = false;
    this.removeWindowListeners();
  }

  private updateFromPointer(event: PointerEvent): void {
    if (!this.media || !this.progressBar) return;
    const rect = this.progressBar.nativeElement.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    this.progressMs = ratio * this.media.durationMs;
  }

  private removeWindowListeners(): void {
    if (this.pointerMoveListener) {
      window.removeEventListener('pointermove', this.pointerMoveListener);
      this.pointerMoveListener = undefined;
    }
    if (this.pointerUpListener) {
      window.removeEventListener('pointerup', this.pointerUpListener);
      window.removeEventListener('pointercancel', this.pointerUpListener);
      this.pointerUpListener = undefined;
    }
  }
}
