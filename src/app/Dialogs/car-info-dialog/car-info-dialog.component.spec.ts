import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInfoDialogComponent } from './car-info-dialog.component';

describe('CarInfoDialogComponent', () => {
  let component: CarInfoDialogComponent;
  let fixture: ComponentFixture<CarInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
