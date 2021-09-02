import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { forkJoin, Observable } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { filter, find, map } from 'rxjs/operators';
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
})
export class Task3Component implements OnInit {
  apiData: any;
  darthVaderData: any;
  tallCharacters: any[] = [];
  characterNames: any[] = [];

  constructor(private _apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.getForkJoinData();
    this.findDarthVader();
    this.findTallCharacters();
  }

  // Using FORKJOIN to get all API Data
  private getAllApiData(): Observable<any> {
    const multipleStarWarsChars =
      this._apiService.getMultipleStarWarsCharacters();
    const obiWanData = this._apiService.getObiWanKenobi();
    const dadJoke = this._apiService.getCNJoke();

    return forkJoin({
      multipleStarWarsChars: multipleStarWarsChars,
      obiWanData: obiWanData,
      dadJoke: dadJoke,
    });
  }

  //* Getting the forkJoinData by subscribing to it
  private getForkJoinData(): void {
    this.getAllApiData()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        console.log('%c ForkJoin', 'font-size: 20px');
        console.log(res);
        this.apiData = res;
      });
  }

  //* Finding Darth Vader from list characters using Find
  private findDarthVader(): void {
    this._apiService
      .getMultipleStarWarsCharacters()
      .pipe(
        map((val) => val.results),
        find((val) => val.name === 'Darth Vader'),
        untilDestroyed(this)
      )
      .subscribe((res) => {
        console.log(res);
        this.darthVaderData = res;
      });
  }

  //* Filtering out tall characters from list using Filter
  private findTallCharacters(): void {
    this._apiService
      .getMultipleStarWarsCharacters()
      .pipe(
        map((val) => val.results),
        filter((val) => +val.height > 170),
        untilDestroyed(this)
      )
      .subscribe((val) => {
        console.log(val);
        this.tallCharacters = val;
      });
  }

  //* Getting only character names using Map
  private gettingNameOfCharacters(): void {
    this._apiService
      .getMultipleStarWarsCharacters()
      .pipe(
        map((val) => val.results),
        map((val) => val.name),
        untilDestroyed(this)
      )
      .subscribe((val) => {
        console.log(val);
        this.characterNames = val;
      });
  }
}
