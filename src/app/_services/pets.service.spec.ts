import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {PetsService} from './pets.service';
import {of} from 'rxjs';

describe('PetsService', () => {

  let petsService: PetsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        PetsService,
        {provide: HttpClient, useValue: spy}
      ]
    });

    // Inject both the service-to-test and its (spy) dependency
    petsService = TestBed.get(PetsService);
    httpClientSpy = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    petsService = new PetsService(httpClientSpy);
    expect(petsService).toBeTruthy();
  });

  it('#getPetsData should return any stubbed value from a httpClient service', () => {

    const stubValue = of({});
    httpClientSpy.get.and.returnValue(stubValue);

    petsService = new PetsService(httpClientSpy);
    expect(petsService.getPetsData()).toBe(stubValue, 'service returned stub value');
  });

  it('#getPetsData should return an observable value from a httpClient service', () => {

    const stubValue = of([
      {name: 'Bob', gender: 'Male', age: 23, pets: [{name: 'Garfield', type: 'Cat'}, {name: 'Fido', type: 'Dog'}]},
      {name: 'Bob2', gender: 'Male', age: 23, pets: [{name: 'garfield', type: 'Cat'}, {name: 'fido', type: 'Dog'}]}
    ]);

    httpClientSpy.get.and.returnValue(stubValue);

    petsService = new PetsService(httpClientSpy);
    expect(petsService.getPetsData()).actual.subscribe(result => {
      expect(result[0].name).toBe('Bob', 'getPetsData returned observable value');
    });
  });
});
