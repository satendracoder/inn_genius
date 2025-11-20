import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFillDetails } from './emp-fill-details';

describe('EmpFillDetails', () => {
  let component: EmpFillDetails;
  let fixture: ComponentFixture<EmpFillDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpFillDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpFillDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
