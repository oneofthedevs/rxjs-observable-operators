import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //* NOTE: I have divided assignment in 3 different task which you can find in components folder, within component folder
  //* Task1:  Create Observable using Constructor Method and Perform Error, Completion, Next on Observer
  //* Task2: Observable vs Subject vs BehaviourSubject
  //* Task3: Map, SwitchMap, Filter, Find, Merge, ForkJoin Operators

  title = 'angular-assignment-one';
  ngOnInit(): void {
    // this.CreateAndUseObservable();
  }

  private CreateAndUseObservable(): void {
    console.log(
      '%c Task1: Observable Create',
      'font-size: 20px; color: #000099'
    );
    const observer = new Observable((x) => {
      x.next(Math.random());
      x.next(Math.random());
      x.next(Math.random());
      x.complete();
    });
    console.log('%c Observable Subscribed', 'font-size: 20px; color: #000099');
    observer.subscribe({
      next: (val) => console.log(val),
      error: (err) => console.error(err),
      complete: () =>
        console.log(
          '%c Observable Completed 🎉',
          'font-size: 20px; color: #000099'
        ),
    });
  }
}
