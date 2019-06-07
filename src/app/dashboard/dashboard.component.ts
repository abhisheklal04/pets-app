import {Component, OnInit} from '@angular/core';
import {CommonService, OwnersService} from '../services';
import {Owner, PetsGroupedByOwnersGender, PetType} from '../shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title: string;

  public petNamesGroupedByOwnersGender: Array<PetsGroupedByOwnersGender>;

  constructor(private ownersService: OwnersService,
              private commonService: CommonService,
  ) {
    this.title = 'Pets App';
  }

  ngOnInit() {
    this.populatePetNamesOfGivenTypeGroupedByOwnersGender();
  }

  populatePetNamesOfGivenTypeGroupedByOwnersGender() {
    this.petNamesGroupedByOwnersGender = [];
    this.ownersService.getOwnersWithPets()
      .subscribe((ownersWithPets: Array<Owner>) => {
        this.groupPetsOfGivenTypeWithOwnersGender(ownersWithPets, PetType.Cat);
      });
  }

  groupPetsOfGivenTypeWithOwnersGender(ownersWithPets: Array<Owner>, petType: PetType) {
    const petListGroupedByOwnersGender: Array<PetsGroupedByOwnersGender> = [];
    if (ownersWithPets) {
      ownersWithPets.forEach(owner => {
        const ownersCats = owner && owner.pets ? owner.pets.filter(pet => pet.type.localeCompare(petType) === 0) : [];
        if (ownersCats && ownersCats.length > 0) {
          const existingGenderAndTheirPets = petListGroupedByOwnersGender
            .find(x => this.commonService.compareStringsCaseInSensitive(x.gender, owner.gender) === 0);
          if (existingGenderAndTheirPets) {
            existingGenderAndTheirPets.pets = ownersCats.map(cat => cat.name).reduce((coll, item) => {
              coll.push(item);
              return coll;
            }, existingGenderAndTheirPets.pets);
          } else {
            petListGroupedByOwnersGender.push({
              pets: ownersCats.map(cat => cat.name),
              gender: owner.gender
            });
          }
        }
      });
    }

    this.sortPetsForAllGenders(petListGroupedByOwnersGender);

    this.petNamesGroupedByOwnersGender = petListGroupedByOwnersGender;
  }

  sortPetsForAllGenders(petListGroupedByOwnersGender): void {
    petListGroupedByOwnersGender.forEach(gender => {
      if (gender.pets) {
        this.commonService.stringArraySortCaseInSensitive(gender.pets);
      }
    });
  }
}
