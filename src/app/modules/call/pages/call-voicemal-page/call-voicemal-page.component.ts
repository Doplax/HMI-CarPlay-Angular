import { Component } from '@angular/core';

@Component({
  selector: 'call-voicemal-page',
  templateUrl: './call-voicemal-page.component.html',
  styleUrl: './call-voicemal-page.component.scss',
  standalone: false
})
export class CallVoicemalPageComponent {
  icons = [
    {
      image: 'assets/images/icons/missed-call.svg',
      title: 'Finalizar',
      class: ''
    },
    {
      image: 'assets/images/icons/missed-call.svg',
      title: 'Silencio',
      class: ''
    },
    {
      image: 'assets/images/icons/missed-call.svg',
      title: 'Teclado',
      class: ''
    },
    {
      image: 'assets/images/icons/missed-call.svg',
      title: 'Añadir Llamada',
      class: ''
    },
  ]
}
