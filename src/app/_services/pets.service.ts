import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  petsDataUrl: string;

  constructor(private http: HttpClient) {
    this.petsDataUrl = environment.dataUrl;
  }

  getPetsData() {
    return this.http.get(this.petsDataUrl);
  }
}
