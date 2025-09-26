import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Component({
    selector: 'app-books-page',
    templateUrl: './books-page.component.html',
    styleUrls: ['./books-page.component.scss'],
    standalone: false
})
export class BooksPageComponent {

  constructor(
    public i18n: I18nService
  ){}

}
