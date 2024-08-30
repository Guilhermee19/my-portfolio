import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselProjectsComponent } from './carousel-projects.component';

describe('CarouselProjectsComponent', () => {
  let component: CarouselProjectsComponent;
  let fixture: ComponentFixture<CarouselProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
