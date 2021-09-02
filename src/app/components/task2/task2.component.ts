import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
})
export class Task2Component implements OnInit {
  // Observers
  // Observer for Observables
  public obsObserver: Observable<any> | undefined;
  // Observer for Subject
  public subjectObserver: Subject<any> | undefined;
  // Observer for BehaviorSubject
  public behaviorSubject: BehaviorSubject<any> | undefined;

  // Subscriber variables
  // For Observable
  public subObservable1: Number | undefined;
  public subObservable2: Number | undefined;
  // For Subject
  public subSubject1: Number | undefined;
  public subSubject2: Number | undefined;
  // For BehaviourSubject
  public subBehaviourSubject1: Number | undefined;
  public subBehaviourSubject2: Number | undefined;

  constructor() {}

  ngOnInit(): void {
    this.initializeObservable();
    this.initializeSubject();
    this.initializeBehaviorSubject();
    this.subscribeToObservable();
    this.subscribeToSubject();
    this.subscribeToBehaviorSubject();
  }

  /**
   * @description To initialize to observable
   */
  private initializeObservable(): void {
    this.obsObserver = new Observable((x) => {
      x.next(Math.random());
      x.next(Math.random());
      x.next(Math.random());
      x.complete();
    });
  }

  /**
   * @description To initialize to subject
   */
  private initializeSubject(): void {
    // Subject does not have a initial value, it any observer subscribes to the subject it won't get any value until next() is called
    this.subjectObserver = new Subject();
  }

  /**
   * @description To initialize to subject
   */
  private initializeBehaviorSubject(): void {
    /**
     * Behavior Subject requires a initial value, so here as taking Math.random() for initial value of BehaviorSubject. if an observer subscribes to a BehaviorSubject
     * it will get the last cached value
     */
    this.behaviorSubject = new BehaviorSubject(Math.random());
  }

  /**
   * @description Subscribing to observable
   */
  private subscribeToObservable(): void {
    this.obsObserver?.subscribe({
      next: (val) => {
        console.log(`Observable Subscription 1: ${val}`);
        this.subObservable1 = val;
      },
      error: (err) => {
        console.log(`%c ${err}`, 'color: #aa00000');
      },
      complete: () => {},
    });
    this.obsObserver?.subscribe({
      next: (val) => {
        console.log(`Observable Subscription 2: ${val}`);
        this.subObservable2 = val;
      },
      error: (err) => {
        console.log(`%c ${err}`, 'color: #aa00000');
      },
      complete: () => {},
    });
  }

  /**
   * @description Subscribing to subject
   */
  private subscribeToSubject(): void {
    this.subjectObserver?.subscribe({
      next: (val) => {
        console.log(`Subject Subscription 1: ${val}`);
        this.subSubject1 = val;
      },
      error: (err) => {
        console.log(`%c ${err}`, 'color: #aa00000');
      },
      complete: () => {},
    });
    this.subjectObserver?.subscribe({
      next: (val) => {
        console.log(`Subject Subscription 2: ${val}`);
        this.subSubject2 = val;
      },
      error: (err) => {
        console.log(`%c ${err}`, 'color: #aa00000');
      },
      complete: () => {},
    });
  }

  /**
   * @description Subscribing to behaviorSubject
   */
  private subscribeToBehaviorSubject(): void {
    this.behaviorSubject?.subscribe({
      next: (val) => {
        console.log(`BehaviorSubject Subscription 1: ${val}`);
        this.subBehaviourSubject1 = val;
      },
      complete: () => {},
      error: (err) => {
        console.log(`%c ${err}`, 'color: #aa00000');
      },
    });
    this.behaviorSubject?.subscribe({
      next: (val) => {
        console.log(`BehaviorSubject Subscription 2: ${val}`);
        this.subBehaviourSubject2 = val;
      },
      complete: () => {},
      error: (err) => {
        console.log(`%c ${err}`, 'color: #aa00000');
      },
    });
  }

  /**
   * @description call next method for Subject
   */
  public nextSubject(): void {
    this.subjectObserver?.next(Math.random());
  }

  /**
   * @description call next method for BehaviourSubject
   */
  public nextBehaviourSubject(): void {
    this.behaviorSubject?.next(Math.random());
  }
}
