import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageData } from '@modules/messages/types/message.type';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  getMessagesList(): Observable<MessageData[]> {
      return this.http.get<MessageData[]>('/assets/api/messages/messages.json');
  }
}
