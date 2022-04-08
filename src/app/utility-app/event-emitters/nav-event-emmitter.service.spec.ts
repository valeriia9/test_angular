import { TestBed } from '@angular/core/testing';

import { NavEventEmmitterService } from './nav-event-emmitter.service';

describe('NavEventEmmitterService', () => {
  let service: NavEventEmmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavEventEmmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
