import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CallContactData } from '@src/app/modules/call/types/call.type';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(
    private http: HttpClient
  ) { }

  getRecentCalls(): Observable<CallContactData[]> {
    return this.http.get<CallContactData[]>('/assets/api/call/recents.json');
  }

  getContactsList(): Observable<CallContactData[]> {
    return this.http.get<CallContactData[]>('/assets/api/call/contacts.json');
  }

  callTo(contact:any){
    console.log('Calling to', contact);

  }

}
