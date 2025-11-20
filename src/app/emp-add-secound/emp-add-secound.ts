import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-emp-add-secound',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emp-add-secound.html',
  styleUrl: './emp-add-secound.scss',
})
export class EmpAddSecound {
  @Output() secondStepData = new EventEmitter<any>(); // 👈 Parent ko data send karna

  showPassword = false;
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      passCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      enableAppLogin: [true],
      excludedFromPayroll: [false],
      beforeClockIn: [0, [Validators.required]],
      beforeClockOut: [0, [Validators.required]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onNext() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    // 👇 Data Parent Component ko send karenge
    this.secondStepData.emit(this.employeeForm.value);
  }
}
