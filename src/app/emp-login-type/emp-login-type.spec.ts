import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLoginType } from './emp-login-type';

describe('EmpLoginType', () => {
  let component: EmpLoginType;
  let fixture: ComponentFixture<EmpLoginType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpLoginType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpLoginType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
