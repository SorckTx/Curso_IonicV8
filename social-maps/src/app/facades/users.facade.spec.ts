import { TestBed } from '@angular/core/testing';

import { UsersFacade } from './users.facade';

describe('UsersFacade', () => {
  let service: UsersFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
