import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DashboardComponent} from './dashboard.component';
import {CommonService, OwnersService} from '../services';
import {SpyHelper} from '../shared/helpers/spy-helper.spec';
import {of} from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let petsServiceSpy: jasmine.SpyObj<OwnersService>;

  /*beforeEach(async(() => {

    }
  ));*/

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      providers: [
        SpyHelper.provideMagicalMock(OwnersService),
        CommonService,
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();

    petsServiceSpy = TestBed.get(OwnersService);

    const stubValue = of([]);
    petsServiceSpy.getOwnersWithPets.and.returnValue(stubValue);
  });

  it('should create dashboard component', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should have title 'pets-app'`, () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Pets App');
  });

  it('should render title in a h2 tag', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Pets App');
  });

  it('should populate pets grouped by gender of owners', () => {

    const stubOwners = of([
      {name: 'Bob', gender: 'Male', age: 23, pets: [{name: 'Garfield', type: 'Cat'}, {name: 'Fido', type: 'Dog'}]},
      {name: 'Bob2', gender: 'Male', age: 23, pets: [{name: 'garfield', type: 'Cat'}, {name: 'fido', type: 'Dog'}]}
    ]);
    petsServiceSpy.getOwnersWithPets.and.returnValue(stubOwners);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.petNamesGroupedByOwnersGender.length).toBe(1, 'cats are grouped by gender');
    expect(component.petNamesGroupedByOwnersGender[0].gender).toBe('Male', 'Same genders people are merged into single entity');
  });

  it('should group gender with case insensitive comparison and takes the first gender found', () => {

    const stubPeopleArray = of([
      {name: 'Bob', gender: 'Male', age: 23, pets: [{name: 'Garfield', type: 'Cat'}, {name: 'Fido', type: 'Dog'}]},
      {name: 'Bob2', gender: 'male', age: 23, pets: [{name: 'garfield', type: 'Cat'}, {name: 'fido', type: 'Dog'}]}
    ]);
    petsServiceSpy.getOwnersWithPets.and.returnValue(stubPeopleArray);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.petNamesGroupedByOwnersGender.length).toBe(1, 'Pets are grouped by gender');
    expect(component.petNamesGroupedByOwnersGender[0].gender).toBe('Male', 'genders merged in case insensitive way');
  });

  it('should take cats and groups them based on owners genders', () => {

    const stubPeopleArray = of([
      {name: 'Bob', gender: 'Male', age: 23, pets: [{name: 'Garfield', type: 'Cat'}, {name: 'Fido', type: 'Dog'}]},
      {name: 'Bob2', gender: 'male', age: 23, pets: [{name: 'garfield', type: 'Cat'}, {name: 'fido', type: 'Dog'}]},
      {name: 'Bob3', gender: 'female', age: 23, pets: [{name: 'tammy', type: 'Cat'}, {name: 'fido', type: 'Dog'}]},
      {name: 'Bob4', gender: 'FEmale', age: 23, pets: [{name: 'TAMMY', type: 'Cat'}, {name: 'fido', type: 'Dog'}]},
    ]);
    petsServiceSpy.getOwnersWithPets.and.returnValue(stubPeopleArray);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.petNamesGroupedByOwnersGender.length).toBe(2, 'Pets are grouped by gender');
    expect(component.petNamesGroupedByOwnersGender[0].pets.length).toBe(2, 'Only cats are grouped by gender');
    expect(component.petNamesGroupedByOwnersGender[1].pets.length).toBe(2, 'Only cats are grouped by gender');
    expect(component.petNamesGroupedByOwnersGender[0].gender).toBe('Male', 'genders merged in case insensitive way');
    expect(component.petNamesGroupedByOwnersGender[1].gender).toBe('female', 'genders merged in case insensitive way');
  });

  it('should take cats and sort them by name with case insensitivity comparison', () => {
    const stubPeopleArray = of([
      {name: 'Bob3', gender: 'male', age: 23, pets: [{name: 'tammy', type: 'Cat'}, {name: 'fido', type: 'Dog'}]},
      {name: 'Bob4', gender: 'male', age: 23, pets: [{name: 'TAMMY', type: 'Cat'}, {name: 'fido', type: 'Dog'}]},
      {name: 'Bob2', gender: 'Male', age: 23, pets: [{name: 'garfield', type: 'Cat'}, {name: 'fido', type: 'Dog'}]},
      {name: 'Bob', gender: 'male', age: 23, pets: [{name: 'Garfield', type: 'Cat'}, {name: 'Fido', type: 'Dog'}]},
    ]);
    petsServiceSpy.getOwnersWithPets.and.returnValue(stubPeopleArray);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.petNamesGroupedByOwnersGender.length).toBe(1, 'Pets are grouped by gender');
    expect(component.petNamesGroupedByOwnersGender[0].pets.length).toBe(4, 'Only cats are grouped by gender');
    expect(component.petNamesGroupedByOwnersGender[0].pets[0].toLowerCase()).toBe('garfield', 'genders merged in case insensitive way');
    expect(component.petNamesGroupedByOwnersGender[0].pets[1].toLowerCase()).toBe('garfield', 'genders merged in case insensitive way');
    expect(component.petNamesGroupedByOwnersGender[0].pets[2].toLowerCase()).toBe('tammy', 'genders merged in case insensitive way');
    expect(component.petNamesGroupedByOwnersGender[0].pets[3].toLowerCase()).toBe('tammy', 'genders merged in case insensitive way');
  });
});
