import { Component } from '@angular/core';
import { CallService } from '@modules/call/services/call.service';
import { CardTypeEnum } from '@modules/call/types/call.type';
@Component({
  selector: 'call-contacts-page',
  templateUrl: './call-contacts-page.component.html',
  styleUrl: './call-contacts-page.component.scss',
  standalone: false
})
export class CallContactsPageComponent {
  public CardTypeEnumEnum = CardTypeEnum;

  callData: any[] = [];
  groupedContacts: { [key: string]: any[] } = {};

  constructor(public callService: CallService) {}

  ngOnInit(): void {
    this.callService.getContactsList().subscribe((data) => {
      this.callData = data;
      this.groupContacts();
      console.log(this.groupedContacts);
    });
  }

  groupContacts(): void {
    this.groupedContacts = {};
    for (const contact of this.callData) {
      const firstLetter = contact.name[0].toUpperCase();
      if (!this.groupedContacts[firstLetter]) {
        this.groupedContacts[firstLetter] = [];

      }
      this.groupedContacts[firstLetter].push(contact);

    }
  }

  getKeys(obj: Object): string[] {
    return Object.keys(obj);
  }
}