import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAddSecound } from './emp-add-secound';

describe('EmpAddSecound', () => {
  let component: EmpAddSecound;
  let fixture: ComponentFixture<EmpAddSecound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpAddSecound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpAddSecound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
