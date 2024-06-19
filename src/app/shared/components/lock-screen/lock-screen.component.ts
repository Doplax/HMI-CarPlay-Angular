import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {

  public currentTime:any
  public currentDate:any



  ngOnInit(): void {
    this.updateTime()

    setInterval(() => {
      this.updateTime()
    }, 1000);
  }

  updateTime() {
    const date = new Date()
    this.currentTime = date.toLocaleTimeString();
    this.currentDate = date.toLocaleDateString();
  }


}
