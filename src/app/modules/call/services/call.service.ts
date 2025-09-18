import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CallCardData } from '@src/app/modules/call/types/call.type';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(
    private http: HttpClient
  ) { }

  getRecentCalls(): Observable<CallCardData[]> {
    return this.http.get<CallCardData[]>('/assets/api/call/recents.json');
  }

  getContactsList(): Observable<any[]> {
    return this.http.get<any[]>('/assets/api/call/contacts.json');
  }

  callTo(contact:any){
    console.log('Calling to', contact);

  }

}
