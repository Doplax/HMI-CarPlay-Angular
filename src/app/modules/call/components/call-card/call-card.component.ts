import { Component, Input } from '@angular/core';
import { CallCardData, CardType } from '@src/app/modules/call/types/call.type';


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


}
