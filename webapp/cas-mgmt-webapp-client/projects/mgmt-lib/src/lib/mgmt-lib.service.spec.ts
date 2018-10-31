import { TestBed } from '@angular/core/testing';

import { MgmtLibService } from './mgmt-lib.service';

describe('MgmtLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MgmtLibService = TestBed.get(MgmtLibService);
    expect(service).toBeTruthy();
  });
});
