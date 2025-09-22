import { Component, OnInit } from '@angular/core';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '@modules/messages/services/message-service.service';
import { MessageData } from '../../types/message.type';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
  standalone: false,
})
export class MessagesPageComponent implements OnInit {
  messages!: MessageData[];

  constructor(public messagesSerice: MessageService) {}

  ngOnInit(): void {
    this.messagesSerice.getMessagesList().subscribe((data) => {
      this.messages = data;
      console.log(data);
    });
  }
}
