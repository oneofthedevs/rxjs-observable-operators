import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { forkJoin, from, Observable, of } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { filter, find, map, switchMap } from 'rxjs/operators';
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

  //* ForkJoin - Getting the forkJoinData by subscribing to it
  // ForkJoin returns the last emitted of each observable passed. So here value will be emitted when final value of all 3 APIs is received
  private getForkJoinData(): void {
    this.getAllApiData()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        console.log('%c ForkJoin', 'font-size: 20px');
        console.log(res);
        this.apiData = res;
      });
  }

  //* Find and SwitchMap- Finding Darth Vader from list characters using Find
  // Tries to find the value according to condition and returns the first result if found, in case of value not found it will return undefined
  private findDarthVader(): void {
    this._apiService
      .getMultipleStarWarsCharacters()
      .pipe(
        map((val: any) => val.results),
        switchMap((val: any) => from(val)),
        find((val: any) => val.name === 'Darth Vader'),
        untilDestroyed(this)
      )
      .subscribe((res) => {
        console.log('%c Find', 'font-size: 20px');
        console.log(res);
        this.darthVaderData = res;
      });
  }

  //* Filter, Map and SwitchMap- Filtering out tall characters names with their height from list using Filter and Map
  // Filter - Filters an array of observable based on condition
  // Map - Manipulate value or object and return the output
  private findTallCharacters(): void {
    this._apiService
      .getMultipleStarWarsCharacters()
      .pipe(
        switchMap((val: any) => from(val.results)),
        filter((val: any) => +val.height > 170),
        map((val) => ({ name: val.name, height: val.height })),
        untilDestroyed(this)
      )
      .subscribe((val) => {
        console.log('%c Filter and Map', 'font-size: 20px');
        console.log(val);
        this.tallCharacters.push(val);
      });
  }
}
