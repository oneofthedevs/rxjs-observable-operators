import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Task1Component } from './components/task1/task1.component';
import { Task2Component } from './components/task2/task2.component';

const routes: Routes = [
  {
    path: 'task-one',
    component: Task1Component,
  },
  {
    path: 'task-two',
    component: Task2Component,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/task-one',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
