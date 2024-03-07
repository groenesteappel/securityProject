import { TestBed } from '@angular/core/testing';

import { PiholeService } from './pihole.service';

describe('PiholeService', () => {
  let service: PiholeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiholeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
