import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { forkJoin, from, interval, Observable, of, pipe } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {
  debounce,
  debounceTime,
  filter,
  find,
  map,
  merge,
  switchMap,
  take,
  throttle,
  throttleTime,
} from 'rxjs/operators';
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
  intervalObs: any[] = [];

  constructor(private _apiService: ApiServiceService) {}

  ngOnInit(): void {
    // We're using Promise to wait for forkjoin's data to return and then that data will be used in rest functions
    this.getForkJoinData().then(() => {
      this.findDarthVader();
      this.findTallCharacters();
      this.mergeAPIData();
    });
  }

  // Using FORKJOIN to get all API Data
  // Here I'm returning formJoin as Observable which can be subscribed
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
  /**
   ** ForkJoin - Getting the forkJoinData by subscribing to it
   * ForkJoin returns the last emitted of each observable passed. So here value will be emitted when final value of all 3 APIs is received
   */
  private getForkJoinData(): Promise<void> {
    return new Promise((resolve, reject) =>
      this.getAllApiData()
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res) => {
            console.log('%c ForkJoin', 'font-size: 16px');
            console.log(res);
            this.apiData = res;
            resolve();
          },
          error: () => reject(),
        })
    );
  }

  //* Merge - Using Merge to merge API Data
  private mergeAPIData(): void {
    // This will emit a value at every 2.5 seconds
    const firstInterval = interval(2500);
    // This will emit a value at every 1 second
    const secondInterval = interval(1000);

    // Both streams of data will be merged and output will be like
    // Output: 0,1,0,2...
    firstInterval
      .pipe(merge(secondInterval), take(6), untilDestroyed(this))
      .subscribe((val) => {
        this.intervalObs.push(val);
        console.log(`Interval: ${val}`);
      });
  }

  /**
   ** Find and SwitchMap - Finding Darth Vader from list characters using Find
   * Tries to find the value according to condition and returns the first result if found, in case of value not found it will return undefined
   */
  private findDarthVader(): void {
    of(this.apiData.multipleStarWarsChars)
      .pipe(
        switchMap((val: any) => from(val.results)),
        find((val: any) => val.name === 'Darth Vader'),
        untilDestroyed(this)
      )
      .subscribe((res) => {
        console.log('%c Find', 'font-size: 16px');
        console.log(res);
        this.darthVaderData = res;
      });
  }

  /**
   **Filter, Map and SwitchMap - Filtering out tall characters names with their height from list using Filter and Map
   * Filter - Filters an array of observable based on condition
   * Map - Manipulate value or object and return the output
   */
  private findTallCharacters(): void {
    of(this.apiData.multipleStarWarsChars)
      .pipe(
        switchMap((val: any) => from(val.results)),
        filter((val: any) => +val.height > 170),
        map((val) => ({ name: val.name, height: val.height })),
        untilDestroyed(this)
      )
      .subscribe((val) => {
        console.log('%c Filter and Map', 'font-size: 16px');
        console.log(val);
        this.tallCharacters.push(val);
      });
  }
}
