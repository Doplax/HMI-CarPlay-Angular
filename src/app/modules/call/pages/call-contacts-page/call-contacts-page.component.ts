import { Component } from '@angular/core';
import { CallService } from '@modules/call/services/call.service';
import { CardType } from '@modules/call/types/call.type';

@Component({
  selector: 'call-contacts-page',
  templateUrl: './call-contacts-page.component.html',
  styleUrl: './call-contacts-page.component.scss',
  standalone: false
})
export class CallContactsPageComponent {
    public CardTypeEnum = CardType;

    callData:any[] = [];

    constructor(
      public callService:CallService,
    ) { }


    ngOnInit(): void {
      this.callService.getRecentCalls().subscribe((data) => {
        this.callData = data;
        console.log(data);
      });
    }
}
