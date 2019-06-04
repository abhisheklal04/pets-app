import {Component, OnInit} from '@angular/core';
import {PetsService} from '../_services';
import {People} from '../_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  peoples: Array<People>;

  genderCats: Array<{ gender: string, pets: Array<string> }>;

  constructor(private petsService: PetsService) {
    this.genderCats = [
      {
        gender: 'Male',
        pets: ['molly', 'tom'],
      },
      {
        gender: 'FeMale',
        pets: ['Tammy', 'Zelda'],
      }
    ];
  }

  sampleData() {
    return [
      {
        gender: 'Male',
        pets: ['molly', 'tom'],
      },
      {
        gender: 'FeMale',
        pets: ['Tammy', 'Zelda'],
      }
    ];
  }

  ngOnInit() {
    this.getPetsData();
  }

  getPetsData() {
    this.genderCats = null;
    this.petsService.getPetsData()
      .subscribe((peoples: Array<People>) => {
        this.peoples = peoples;
        this.genderCats = this.sampleData();
      });
  }

  populateGenderCats() {

  }
}
