import { TestBed } from '@angular/core/testing';

import { VatService } from './pages/vat.service';

describe('VatService', () => {
  let service: VatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
