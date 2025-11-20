import { TestBed } from '@angular/core/testing';

import { EmpDetails } from './emp-details';

describe('EmpDetails', () => {
  let service: EmpDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
