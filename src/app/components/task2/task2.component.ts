import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
})
export class Task2Component implements OnInit {
  public observer: Observable<any> | undefined;
  public subjectObserver: Subject<any> | undefined;
  public behaviorSubject: BehaviorSubject<any> | undefined;

  constructor() {}

  ngOnInit(): void {
    this.initializeObservable();
    this.initializeSubject();
    this.initializeSubject();
  }

  private initializeObservable(): void {
    this.observer = new Observable((x) => {
      x.next(Math.random());
      x.next(Math.random());
      x.next(Math.random());
      x.complete();
    });
  }
  private initializeSubject(): void {
    this.subjectObserver = new Subject();
  }

  private initializeBehaviorSubject(): void {
    // Behavior Subject requires a initial value, so here as taking 0 as initial value of BehaviorSubject
    this.behaviorSubject = new BehaviorSubject(0);
  }

  public nextSubject(): void {
    this.subjectObserver?.next(Math.random());
  }

  public nextBehaviourSubject(): void {
    this.behaviorSubject?.next(Math.random());
  }
}
