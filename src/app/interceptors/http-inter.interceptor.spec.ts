import { TestBed } from '@angular/core/testing';

import { HttpInterInterceptor } from './http-inter.interceptor';

describe('HttpInterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpInterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterInterceptor = TestBed.inject(HttpInterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
