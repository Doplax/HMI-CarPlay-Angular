import { Component } from '@angular/core';

@Component({
    selector: 'call-keypad',
    templateUrl: './call-keypad-page.component.html',
    styleUrl: './call-keypad-page.component.scss',
    standalone: false
})
export class CallKeypadPageComponent {

  public dialedNumber:string = ''

  keys = [
    { number: '1', letters: ''},
    { number: '2', letters: 'ABC'},
    { number: '3', letters: 'DEF'},
    { number: '4', letters: 'GHI'},
    { number: '5', letters: 'JKL'},
    { number: '6', letters: 'MNO'},
    { number: '7', letters: 'PQRS'},
    { number: '8', letters: 'TUV'},
    { number: '9', letters: 'WXYZ'},
    { number: '*', letters: ''},
    { number: '0', letters: '+'},
    { number: '#', letters: ''},
  ];


  public clearDialedNumber() {
    this.dialedNumber = ''
  }

  public addDigit(digit: string) {
    this.dialedNumber += digit;
  }
}
