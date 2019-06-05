import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import {Router} from '@angular/router';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        {provide: Router}
      ]
    });

    // Inject both the service-to-test and its (spy) dependency
    authGuardService = TestBed.get(AuthGuardService);
    routerSpy = TestBed.get(Router);
  });

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });

  it('canActivate should always return true', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service.canActivate({} as any, {} as any)).toBe(true, 'canActivate returns true always');
  });
});
