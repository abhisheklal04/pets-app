import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  petsDataUrl: string;

  constructor(private http: HttpClient) {
    this.petsDataUrl = environment.dataUrl;
  }

  getPetsData(): Observable<any> {
    return this.http.get(this.petsDataUrl);
  }
}
