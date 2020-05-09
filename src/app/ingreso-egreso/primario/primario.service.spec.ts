import { TestBed } from '@angular/core/testing';

import { PrimarioService } from './primario.service';

describe('PrimarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrimarioService = TestBed.get(PrimarioService);
    expect(service).toBeTruthy();
  });
});
