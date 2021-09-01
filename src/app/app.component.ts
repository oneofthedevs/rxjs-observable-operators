import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
