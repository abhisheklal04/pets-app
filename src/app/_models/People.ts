import {Pet} from './Pet';

export interface People {
  name: string;
  gender: string;
  age: number;
  pets: Array<Pet>;
}
