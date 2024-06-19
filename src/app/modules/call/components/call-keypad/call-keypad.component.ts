import { Component } from '@angular/core';

@Component({
  selector: 'app-call-keypad',
  templateUrl: './call-keypad.component.html',
  styleUrls: ['./call-keypad.component.scss']
})
export class CallKeypadComponent {
  keys = [
    { number: '1', letters: '', highlighted: true },
    { number: '2', letters: 'ABC', highlighted: false },
    { number: '3', letters: 'DEF', highlighted: false },
    { number: '4', letters: 'GHI', highlighted: false },
    { number: '5', letters: 'JKL', highlighted: false },
    { number: '6', letters: 'MNO', highlighted: false },
    { number: '7', letters: 'PQRS', highlighted: false },
    { number: '8', letters: 'TUV', highlighted: false },
    { number: '9', letters: 'WXYZ', highlighted: false },
    { number: '*', letters: '', highlighted: false },
    { number: '0', letters: '+', highlighted: false },
    { number: '#', letters: '', highlighted: false },
  ];
}
