import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private baseStarWarsUrl: string = 'https://swapi.dev/api/';
  private CNJoke: string = 'http://api.icndb.com/jokes/random';

  constructor(private _http: HttpClient) {}

  public getMultipleStarWarsCharacters(): Observable<any> {
    return this._http.get(`${this.baseStarWarsUrl}people/`);
  }

  public getObiWanKenobi(): Observable<any> {
    return this._http.get(`${this.baseStarWarsUrl}people/10`);
  }

  public getCNJoke(): Observable<any> {
    return this._http.get(this.CNJoke);
  }
}
