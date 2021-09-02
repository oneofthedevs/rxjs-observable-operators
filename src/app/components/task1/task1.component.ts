import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

// To unsubscribe observables automatically
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

  ngOnInit(): void {}

  /**
   * @description To create normal observable with next and complete
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
   * @description To create observable with next, error and complete
   */
  public createObservableWithError(): void {
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
}
