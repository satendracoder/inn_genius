import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-emp-add-secound',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emp-add-secound.html',
  styleUrl: './emp-add-secound.scss',
})
export class EmpAddSecound {
  showPassword = false;
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      passCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      enableAppLogin: [true],
      excludedFromPayroll: [false],
      beforeClockIn: [0],
      beforeClockOut: [0],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  next() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    console.log(this.employeeForm.value);
  }

  back() {
    console.log('Back clicked');
  }
}
