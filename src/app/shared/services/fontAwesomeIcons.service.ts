
import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee, faUser, faPhone, } from '@fortawesome/free-solid-svg-icons';

const icons = [faCoffee, faUser, faPhone]; // Aqui registraremos todos los iconos

@Injectable({
  providedIn: 'root'
})
export class FontAwesomeIconsService {


  constructor(library: FaIconLibrary) {
    library.addIcons(...icons);
  }
}
