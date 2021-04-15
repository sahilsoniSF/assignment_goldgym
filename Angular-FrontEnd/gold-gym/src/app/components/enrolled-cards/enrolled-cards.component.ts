import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enrolled-cards',
  templateUrl: './enrolled-cards.component.html',
  styleUrls: ['./enrolled-cards.component.css']
})
export class EnrolledCardsComponent implements OnInit {

  card:any;
  constructor() { }

  ngOnInit(): void {
  }

}
