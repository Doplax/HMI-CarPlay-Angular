import { Component, OnInit } from '@angular/core';
import { CallContactData, CardTypeEnum } from '@src/app/modules/call/types/call.type';
import { CallService } from '../../services/call.service';

@Component({
  selector: 'call-recents-page',
  templateUrl: './call-recents-page.component.html',
  styleUrl: './call-recents-page.component.scss',
  standalone: false
})
export class CallRecentsPageComponent implements OnInit {

  public CardTypeEnum = CardTypeEnum;
  public callData!: CallContactData[];

  constructor(
    public callService:CallService,
  ) { }


  ngOnInit(): void {
    this.callService.getRecentCalls().subscribe((data) => {
      this.callData = data;
    });
  }


}
