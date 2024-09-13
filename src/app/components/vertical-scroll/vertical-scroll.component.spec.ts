import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalScrollComponent } from './vertical-scroll.component';

describe('VerticalScrollComponent', () => {
  let component: VerticalScrollComponent;
  let fixture: ComponentFixture<VerticalScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalScrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
