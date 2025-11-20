import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-emp-login-type',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emp-login-type.html',
  styleUrl: './emp-login-type.scss',
})
export class EmpLoginType {
  employeeForm!: FormGroup;
  isOpen = false;

  rolesList: string[] = [
    'Administrator',
    'Front Desk',
    'Maintenance',
    'Manager',
    'Controller',
    'Invoice Creator',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      roles: this.fb.array([], Validators.required),
      loginType: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  // Getter for roles form array
  get rolesFormArray() {
    return this.employeeForm.get('roles') as FormArray;
  }

  // Checkbox select/deselect role
  toggleRole(role: string, event: any) {
    if (event.target.checked) {
      this.rolesFormArray.push(this.fb.control(role));
    } else {
      const index = this.rolesFormArray.controls.findIndex((x) => x.value === role);
      this.rolesFormArray.removeAt(index);
    }
  }

  // Select All
  selectAll(event: any) {
    this.rolesFormArray.clear();

    if (event.target.checked) {
      this.rolesList.forEach((role) => {
        this.rolesFormArray.push(this.fb.control(role));
      });
    }
  }

  // Submit Form
  submitForm() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    console.log('Form Successfully Submitted!');
    console.log(this.employeeForm.value);
  }
}
