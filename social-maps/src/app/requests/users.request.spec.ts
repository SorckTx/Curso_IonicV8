import { TestBed } from '@angular/core/testing';

import { UsersRequest } from './users.request';

describe('UsersRequest', () => {
  let service: UsersRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
