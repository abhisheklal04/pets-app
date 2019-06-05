import {Component, OnInit} from '@angular/core';
import {CommonService, PetsService} from '../_services';
import {People, PetsByGender, PetType} from '../_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title: string;
  petsByGender: Array<PetsByGender>;

  constructor(private petsService: PetsService,
              private commonService: CommonService,
  ) {
    this.title = 'Pets App';
  }

  getSampleData() {
    return [
      {'name': 'Bob', 'gender': 'Male', 'age': 23, 'pets': [{'name': 'Garfield', 'type': 'Cat'}, {'name': 'Fido', 'type': 'Dog'}]},
      {'name': 'Bob2', 'gender': 'Male', age: 23, 'pets': [{'name': 'garfield', 'type': 'Cat'}, {'name': 'fido', 'type': 'Dog'}]}
    ];
  }

  ngOnInit() {
    this.getPetsData();
  }

  getPetsData() {
    this.petsService.getPetsData()
      .subscribe((peoples: Array<People>) => {
        this.populatePetsByGender(peoples);
      });
    // this.populatePetsByGender(this.getSampleData());
  }

  populatePetsByGender(peoples: Array<People>) {
    this.petsByGender = [];
    if (peoples) {
      peoples.forEach(people => {
        const cats = people && people.pets ? people.pets.filter(pet => pet.type == PetType.Cat) : [];
        const existingGender = this.petsByGender
          .find(x => this.commonService.compareStringsCaseInSensitive(x.gender, people.gender) === 0);
        if (existingGender) {
          existingGender.pets = cats.map(cat => cat.name).reduce((coll, item) => {
            coll.push(item);
            return coll;
          }, existingGender.pets);
        } else {
          this.petsByGender.push({
            pets: cats.map(cat => cat.name),
            gender: people.gender
          });
        }
      });
    }

    this.sortPetsByNameForAllGenders();
  }

  sortPetsByNameForAllGenders() {
    this.petsByGender.forEach(gender => {
      if (gender.pets) {
        this.commonService.stringArraySortCaseInSensitive(gender.pets);
      }
    });
  }
}
