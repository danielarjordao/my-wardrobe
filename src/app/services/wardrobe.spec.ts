import { TestBed } from '@angular/core/testing';

import { Wardrobe } from './wardrobe';

describe('Wardrobe', () => {
  let service: Wardrobe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wardrobe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
