import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {

  public currentTime:any


  ngOnInit(): void {
    this.updateTime()

    setInterval(() => {
      this.updateTime()
    }, 1000);
  }

  updateTime() {
    this.currentTime = new Date().toLocaleTimeString();
  }


}
