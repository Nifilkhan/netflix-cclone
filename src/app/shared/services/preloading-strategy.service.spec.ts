import { TestBed } from '@angular/core/testing';

import { PreloadingStrategyService } from './preloading-strategy.service';

describe('PreloadingStrategyService', () => {
  let service: PreloadingStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloadingStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
