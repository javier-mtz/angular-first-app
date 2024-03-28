import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsDialogComponent } from './conditions-dialog.component';

describe('ConditionsDialogComponent', () => {
  let component: ConditionsDialogComponent;
  let fixture: ComponentFixture<ConditionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConditionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
