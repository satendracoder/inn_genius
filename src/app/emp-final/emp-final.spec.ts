import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFinal } from './emp-final';

describe('EmpFinal', () => {
  let component: EmpFinal;
  let fixture: ComponentFixture<EmpFinal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpFinal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpFinal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
