import { Component, Input } from '@angular/core';
import { MessageData } from '../../types/message.type';

@Component({
  selector: 'message-card',
  standalone: false,
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss'
})
export class MessageCardComponent {

  @Input() message!: MessageData;
  showBodyMessage: boolean = false;


  getInitaials(name: string) {
    const names = name.split(' ');
    let initials = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  }
}
