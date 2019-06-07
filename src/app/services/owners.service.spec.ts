import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {OwnersService} from './owners.service';
import {of} from 'rxjs';

describe('OwnersService', () => {

  let petsService: OwnersService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        OwnersService,
        {provide: HttpClient, useValue: spy}
      ]
    });

    // Inject both the service-to-test and its (spy) dependency
    petsService = TestBed.get(OwnersService);
    httpClientSpy = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    petsService = new OwnersService(httpClientSpy);
    expect(petsService).toBeTruthy();
  });

  it('#getPetsData1 should return any stubbed value from a httpClient service', () => {

    const stubValue = of({});
    petsService = new OwnersService(httpClientSpy);
    petsService.getOwnersWithPets();
    // expect(petsService.getOwnersWithPets()).toBe(stubValue, 'service returned stub value');
  });

  it('#getOwnersWithPets should return any stubbed value from a httpClient service', () => {

    const stubValue = of({});
    httpClientSpy.get.and.returnValue(stubValue);

    petsService = new OwnersService(httpClientSpy);
    expect(petsService.getOwnersWithPets()).toBe(stubValue, 'service returned stub value');
  });

  it('#getOwnersWithPets should return an observable value from a httpClient service', () => {

    const stubValue = of([
      {name: 'Bob', gender: 'Male', age: 23, pets: [{name: 'Garfield', type: 'Cat'}, {name: 'Fido', type: 'Dog'}]},
      {name: 'Bob2', gender: 'Male', age: 23, pets: [{name: 'garfield', type: 'Cat'}, {name: 'fido', type: 'Dog'}]}
    ]);

    httpClientSpy.get.and.returnValue(stubValue);

    petsService = new OwnersService(httpClientSpy);
    expect(petsService.getOwnersWithPets()).actual.subscribe(result => {
      expect(result[0].name).toBe('Bob', 'getOwnersWithPets returned observable value');
    });
  });
});
