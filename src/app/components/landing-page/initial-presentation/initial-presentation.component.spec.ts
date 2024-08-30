import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPresentationComponent } from './initial-presentation.component';

describe('InitialPresentationComponent', () => {
  let component: InitialPresentationComponent;
  let fixture: ComponentFixture<InitialPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialPresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
