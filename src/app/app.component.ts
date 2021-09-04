import { Component } from '@angular/core';

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

  ngOnInit(): void {}
}
