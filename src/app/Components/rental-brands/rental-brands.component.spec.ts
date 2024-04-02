import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalBrandsComponent } from './rental-brands.component';

describe('RentalBrandsComponent', () => {
  let component: RentalBrandsComponent;
  let fixture: ComponentFixture<RentalBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalBrandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
