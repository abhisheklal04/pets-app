import {Pet} from './pet';

export interface Owner {
  name: string;
  gender: string;
  age: number;
  pets: Array<Pet>;
}
