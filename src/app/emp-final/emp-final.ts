import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-emp-final',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emp-final.html',
  styleUrl: './emp-final.scss',
})
export class EmpFinal {
  isCompTypeOpen = false;
  isFrequencyOpen = false;

  compensationTypes = ['Salary', 'Hourly', 'Commission', 'Bonus'];
  frequencies = ['Monthly', 'Weekly', 'Bi-Weekly', 'Yearly'];

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      compensationType: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      payFrequency: ['', Validators.required],
    });
  }
  get f() {
    return this.employeeForm.controls;
  }

  // Rotate arrow on click
  toggleCompType() {
    this.isCompTypeOpen = !this.isCompTypeOpen;
  }

  toggleFrequency() {
    this.isFrequencyOpen = !this.isFrequencyOpen;
  }

  onSave() {
    if (this.employeeForm.invalid) return;

    console.log('Form Data:', this.employeeForm.value);
    alert('Saved Successfully!');
  }
}
