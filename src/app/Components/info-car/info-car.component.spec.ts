import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCarComponent } from './info-car.component';

describe('InfoCarComponent', () => {
  let component: InfoCarComponent;
  let fixture: ComponentFixture<InfoCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
