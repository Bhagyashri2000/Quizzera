import { TestBed } from '@angular/core/testing';

import { StudentloginService } from './studentlogin.service';

describe('StudentloginService', () => {
  let service: StudentloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
