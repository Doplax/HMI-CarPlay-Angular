import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { MediaPlayerService } from '@shared/services/media-player.service';
import { MediaItem } from '@shared/types/media.type';
import { SettingsService } from '@modules/settings/services/settings-service.service';
import { MapProviderService } from '@modules/settings/services/map-provider.service';

@Component({
  selector: 'app-split-view-page',
  standalone: false,
  templateUrl: './split-view-page.component.html',
  styleUrl: './split-view-page.component.scss'
})
export class SplitViewPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('progressBar') progressBar?: ElementRef<HTMLDivElement>;
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  media: MediaItem | null = null;
  isPlaying = false;
  progressMs = 0;
  isDragging = false;

  private map?: L.Map;
  private locationMarker?: L.Marker;
  private geoWatchId?: number;
  private currentHeading = 0;
  private readonly defaultZoom = 16;

  private subscriptions = new Subscription();
  private pointerMoveListener?: (event: PointerEvent) => void;
  private pointerUpListener?: (event: PointerEvent) => void;

  constructor(
    private mediaPlayer: MediaPlayerService,
    private router: Router,
    private settingsService: SettingsService,
    private mapProviderService: MapProviderService,
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

  async ngAfterViewInit(): Promise<void> {
    await this.settingsService.updateCurrentLocation();
    const { lat, lng } = this.settingsService.getCoordinates();
    this.initializeMap(lat, lng);
    this.startTrackingLocation();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.removeWindowListeners();
    if (this.geoWatchId !== undefined) {
      navigator.geolocation.clearWatch(this.geoWatchId);
    }
    this.map?.remove();
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

  private initializeMap(lat: number, lng: number): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      zoomControl: false,
      attributionControl: false,
    }).setView([lat, lng], this.defaultZoom);

    const style = this.mapProviderService.getStyle();
    const tileUrl =
      style.provider === 'leaflet' && style.tileUrl
        ? style.tileUrl
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      attribution: style.attribution,
      maxZoom: 19,
    }).addTo(this.map);

    this.locationMarker = L.marker([lat, lng], {
      icon: this.buildNavigationIcon(this.currentHeading),
      interactive: false,
      keyboard: false,
    }).addTo(this.map);
  }

  private startTrackingLocation(): void {
    if (!('geolocation' in navigator)) return;

    this.geoWatchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading } = position.coords;
        if (typeof heading === 'number' && !Number.isNaN(heading)) {
          this.currentHeading = heading;
        }
        this.settingsService.setCoordinates(latitude, longitude);
        this.updateLocationMarker(latitude, longitude);
      },
      undefined,
      { enableHighAccuracy: true, maximumAge: 1000 },
    );
  }

  private updateLocationMarker(lat: number, lng: number): void {
    if (!this.map || !this.locationMarker) return;
    const latLng = L.latLng(lat, lng);
    this.locationMarker.setLatLng(latLng);
    this.locationMarker.setIcon(this.buildNavigationIcon(this.currentHeading));
    this.map.panTo(latLng, { animate: true });
  }

  private buildNavigationIcon(heading: number): L.DivIcon {
    const html = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
           style="width:100%;height:100%;transform:rotate(${heading}deg);filter:drop-shadow(0 2px 4px rgba(0,0,0,0.45));">
        <path d="M12 2 L20 22 L12 17 L4 22 Z"
              fill="#1a73e8"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-linejoin="round"/>
      </svg>
    `;
    return L.divIcon({
      html,
      className: 'navigation-marker-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }
}
