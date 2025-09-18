import { Component } from '@angular/core';
import { CardTypeEnum, CallContactData } from '@modules/call/types/call.type';
import { CallService } from '@modules/call/services/call.service';

@Component({
  selector: 'call-favorites-page',
  templateUrl: './call-favorites-page.component.html',
  styleUrl: './call-favorites-page.component.scss',
  standalone: false
})
export class CallFavoritesPageComponent {

    public CardTypeEnum = CardTypeEnum;
    public favContactsList!: CallContactData[];

    constructor(
      public callService:CallService,
    ) { }


    ngOnInit(): void {
      this.callService.getContactsList().subscribe((data) => {
        this.favContactsList = data.filter(contact => contact.isFavorite === true);
        console.log(this.favContactsList);
      });
    }
}
