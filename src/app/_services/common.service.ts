import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }

  public compareStringsCaseInSensitive(a: string, b: string): number {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }

  public stringArraySortCaseInSensitive(array) {
    array.sort(this.compareStringsCaseInSensitive);
  }
}
