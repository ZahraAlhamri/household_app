import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-t-c',
  templateUrl: './t-c.page.html',
  styleUrls: ['./t-c.page.scss'],
})
export class TCPage implements OnInit {
  public language;

  constructor() { }

  ngOnInit() {
    this.language =localStorage.getItem('language');
  }

}
