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

  ngOnInit() {
    this.getPetsData();
  }

  getPetsData() {
    this.petsByGender = [];
    this.petsService.getPetsData()
      .subscribe((peoples: Array<People>) => {
        this.populatePetsByGender(peoples);
      });
  }

  populatePetsByGender(peoples: Array<People>) {
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
