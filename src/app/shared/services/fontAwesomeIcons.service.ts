import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCoffee,
  faUser,
  faPhone,
  faMicrophoneSlash,
  faPlus,
  faVolumeHigh,
  faVolumeDown,
  faHome,
  faEnvelope,
  faPowerOff
} from '@fortawesome/free-solid-svg-icons';

const icons = [
  faCoffee,
  faUser,
  faPhone,
  faMicrophoneSlash,
  faPlus,
  faVolumeHigh,
  faVolumeDown,
  faHome,
  faEnvelope,
  faPowerOff
];

@Injectable({
  providedIn: 'root',
})
export class FontAwesomeIconsService {
  constructor(library: FaIconLibrary) {
    library.addIcons(...icons);
  }
}

//?HTML Exapmle
//<fa-icon [icon]="['fas','microphone-slash']"/>
