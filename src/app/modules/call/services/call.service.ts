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

}
