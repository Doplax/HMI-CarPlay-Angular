import { Component, Input } from '@angular/core';
import { CallCardData, CardType } from '@src/app/modules/call/types/call.type';
import { CallService } from '../../services/call.service';


@Component({
  selector: 'call-card',
  templateUrl: './call-card.component.html',
  styleUrl: './call-card.component.scss',
  standalone: false
})
export class CallCardComponent {
  public CardTypeEnum = CardType;

  @Input() callData: CallCardData = { name: '', time: '', deviceType: 'desktop'};
  @Input() CardType: CardType = this.CardTypeEnum.favorites;

  constructor(
    public callService:CallService,
  ) {}

  callTo(contact:any){
    this.callService.callTo(contact);
  }

}
