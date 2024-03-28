import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mailtokenGuard } from './mailtoken.guard';

describe('mailtokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mailtokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
