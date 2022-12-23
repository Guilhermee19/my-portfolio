import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloComponent } from './trello.component';

describe('TrelloComponent', () => {
  let component: TrelloComponent;
  let fixture: ComponentFixture<TrelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrelloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
