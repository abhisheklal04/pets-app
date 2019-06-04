import {Component, OnInit} from '@angular/core';
import {PetsService} from '../_services';
import {People, PetsByGender, PetType} from '../_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  genderCats: Array<PetsByGender>;

  constructor(private petsService: PetsService) {
    this.genderCats = [
      {
        gender: 'Male',
        pets: ['molly', 'tom'],
      },
      {
        gender: 'Female',
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
        this.populateGenderCats(peoples);
      });
  }

  populateGenderCats(peoples: Array<People>) {
    this.genderCats = [];
    if (peoples) {
      peoples.forEach(people => {
        const cats = people.pets.filter(pet => pet.type == PetType.Cat);
        const existingGender = this.genderCats.find(x => x.gender == people.gender);
        if (existingGender) {
          existingGender.pets = cats.reduce((coll, item) => {
            coll.push(item as any);
            return coll;
          }, existingGender.pets);
        } else {
          this.genderCats.push({
            pets: cats,
            gender: people.gender
          } as any);
        }
      });
    }
  }
}
