import { TestBed, inject } from '@angular/core/testing';

import { LoginClientService } from './login-client.service';

describe('LoginClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginClientService]
    });
  });

  it('should be created', inject([LoginClientService], (service: LoginClientService) => {
    expect(service).toBeTruthy();
  }));
});
