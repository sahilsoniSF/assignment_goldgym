import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTeamCardsComponent } from './mark-team-cards.component';

describe('MarkTeamCardsComponent', () => {
  let component: MarkTeamCardsComponent;
  let fixture: ComponentFixture<MarkTeamCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkTeamCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkTeamCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
