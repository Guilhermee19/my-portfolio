import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasterEggComponent } from './easter-egg.component';

describe('EasterEggComponent', () => {
  let component: EasterEggComponent;
  let fixture: ComponentFixture<EasterEggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EasterEggComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EasterEggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
