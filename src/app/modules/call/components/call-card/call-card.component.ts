import { Component, Input } from '@angular/core';
import { CallContactData, CardTypeEnum } from '@src/app/modules/call/types/call.type';
import { CallService } from '../../services/call.service';


@Component({
  selector: 'call-card',
  templateUrl: './call-card.component.html',
  styleUrl: './call-card.component.scss',
  standalone: false
})
export class CallCardComponent {
  public CardTypeEnum = CardTypeEnum;

  @Input({required: true}) callData!: CallContactData;
  @Input({required: true}) CardType!: CardTypeEnum;

  constructor(
    public callService:CallService,
  ) {}

  callTo(contact:any){
    this.callService.callTo(contact);
  }

  getInitaials(name: string) {
    const names = name.split(' ');
    let initials = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  }

}
