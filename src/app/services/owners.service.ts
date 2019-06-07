import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Owner, PetsGroupedByOwnersGender, PetType} from '../shared/models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  ownersAndTheirPetsListUrl: string;

  constructor(private http: HttpClient) {
    this.ownersAndTheirPetsListUrl = environment.ownersAndPetsListUrl;
  }

  getOwnersWithPets(): Observable<any> {
    return this.http.get(this.ownersAndTheirPetsListUrl);
  }

  /*groupPetsOfGivenTypeWithOwnersGender(ownersWithPets: Array<Owner>, petType: PetType) {
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
      return petListGroupedByOwnersGender;
    }
    this.sortPetsForAllGenders(petListGroupedByOwnersGender);
  }

  sortPetsForAllGenders(petListGroupedByOwnersGender): void {
    petListGroupedByOwnersGender.forEach(gender => {
      if (gender.pets) {
        this.commonService.stringArraySortCaseInSensitive(gender.pets);
      }
    });
  }*/
}
