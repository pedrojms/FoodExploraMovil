import { TestBed } from '@angular/core/testing';

import { ApiDjangoServiceService } from './api-django-service.service';

describe('ApiDjangoServiceService', () => {
  let service: ApiDjangoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDjangoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
