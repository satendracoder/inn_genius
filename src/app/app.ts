import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeDetails } from './employee-details/employee-details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeDetails],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('inn_genius');
}
