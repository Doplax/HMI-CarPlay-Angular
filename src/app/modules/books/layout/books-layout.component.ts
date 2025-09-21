import { Component } from '@angular/core';
import { I18nService } from '@src/app/shared/services/i18n.service';

@Component({
  selector: 'books-layout',
  standalone: false,
  templateUrl: './books-layout.component.html',
  styleUrl: './books-layout.component.scss'
})
export class BooksLayoutComponent {
  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('books', this.i18n.currentLang);
    console.log('Loaded BooksModule');
  }
}
