import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTeamHeaderComponent } from './mark-team-header.component';

describe('MarkTeamHeaderComponent', () => {
  let component: MarkTeamHeaderComponent;
  let fixture: ComponentFixture<MarkTeamHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkTeamHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkTeamHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
