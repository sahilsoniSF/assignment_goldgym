import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.css']
})
export class AdminCardsComponent implements OnInit {

  @Input()
  card;
  constructor() { }

  ngOnInit(): void {
  }

  update()
  {

  }
  delete(){
    
  }
}
