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
  faPowerOff,
  faMinus,
  faLocationArrow,
  faTriangleExclamation,
  faArrowsUpDownLeftRight,
  faLanguage,
  faLocationDot,
  faCircleHalfStroke,
  faImages,
  faChevronRight,
  faChevronLeft,
  faStepBackward,
  faPlay,
  faPause,
  faStepForward,
  faBed,
  faMap,
  faCheckCircle,
  faLayerGroup,
  faCheck,
  faHouse,
  faCompactDisc,
  faTowerBroadcast,
  faRecordVinyl,
  faStar,
  faClock,
  faAddressBook,
  faTableCellsLarge,
  faVoicemail,
  faMusic,
  faTemperatureHalf,
} from '@fortawesome/free-solid-svg-icons';

//?HTML Exapmle
//<fa-icon [icon]="['fas','microphone-slash']"/>

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
  faPowerOff,
  faMinus,
  faLocationArrow,
  faTriangleExclamation,
  faArrowsUpDownLeftRight,
  faLanguage,
  faLocationDot,
  faCircleHalfStroke,
  faImages,
  faChevronRight,
  faChevronLeft,
  faStepBackward,
  faPlay,
  faPause,
  faStepForward,
  faBed,
  faMap,
  faCheckCircle,
  faLayerGroup,
  faCheck,
  faHouse,
  faCompactDisc,
  faTowerBroadcast,
  faRecordVinyl,
  faStar,
  faClock,
  faAddressBook,
  faTableCellsLarge,
  faVoicemail,
  faMusic,
  faTemperatureHalf,
];

@Injectable({
  providedIn: 'root',
})
export class FontAwesomeIconsService {
  constructor(library: FaIconLibrary) {
    library.addIcons(...icons);
  }
}


