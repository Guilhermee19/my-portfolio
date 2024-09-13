import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoyComponent } from './game-boy.component';

describe('GameBoyComponent', () => {
  let component: GameBoyComponent;
  let fixture: ComponentFixture<GameBoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
