import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DashboardComponent} from './dashboard.component';
import {CommonService, PetsService} from '../_services';
import {SpyHelper} from '../helpers/spy-helper';
import {of} from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let petsServiceSpy: jasmine.SpyObj<PetsService>;
  let commonServiceSpy: jasmine.SpyObj<CommonService>;

  /*beforeEach(async(() => {

    }
  ));*/

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      providers: [
        SpyHelper.provideMagicalMock(PetsService),
        SpyHelper.provideMagicalMock(CommonService),
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();

    petsServiceSpy = TestBed.get(PetsService);
    commonServiceSpy = TestBed.get(CommonService);

    const stubValue = of([]);
    petsServiceSpy.getPetsData.and.returnValue(stubValue);
    commonServiceSpy.compareStringsCaseInSensitive.and.returnValue(0);
    commonServiceSpy.stringArraySortCaseInSensitive.and.returnValue([]);
  });

  it('should create', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should have as title 'pets-app'`, () => {
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
});
