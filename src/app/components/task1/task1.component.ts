import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss'],
})
export class Task1Component implements OnInit {
  // Observer
  public observer: Observable<any> | null = null;
  constructor() {}

  ngOnInit(): void {
    console.clear();
    console.log('%c Task 1', 'font-size: 20px');
  }

  /**
   * @description Creating and subscribing to observable which gets completed later on
   */
  public createObservable(): void {
    this.observer = new Observable((x) => {
      x.next(Math.random());
      x.next(Math.random());
      x.complete();
    });
    this.observer.pipe(untilDestroyed(this)).subscribe({
      next: (val) => console.log(`%c O1: ${val}`, 'color: #000099'),
      error: (err) => console.log(`Error: ${err}`),
      complete: () =>
        console.log(
          `%c Subscription Completed`,
          'color: #000099; font-size: 16px'
        ),
    });
  }

  /**
   * @description Creating and subscribing to observable which gets gets an error emitted in-between
   */
  public createObservableWithError() {
    this.observer = new Observable((x) => {
      x.next(Math.random());
      x.next(Math.random());
      x.error('Some error');
      x.complete();
    });
    this.observer.subscribe({
      next: (val) => console.log(`%c O2: ${val}`, 'color: #990000'),
      error: (err) => console.log(`Error: ${err}`),
      complete: () =>
        console.log(
          `%c Subscription Completed`,
          'color: #990000; font-size: 16px'
        ),
    });
  }

  public next(): void {}
}
