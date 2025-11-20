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

  roles = [
    'Administrator',
    'Front Desk',
    'Maintenance',
    'Manager',
    'Controller',
    'Invoice Creator',
  ];

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      roles: this.fb.array([]),
    });
  }

  get rolesArray() {
    return this.form.get('roles') as FormArray;
  }

  /** Checkbox Toggle */
  onRoleChange(role: string, checked: boolean) {
    if (checked) {
      this.rolesArray.push(this.fb.control(role));
    } else {
      const index = this.rolesArray.controls.findIndex((x) => x.value === role);
      this.rolesArray.removeAt(index);
    }

    // 👇 Auto close dropdown after select
    this.isOpen = true;
  }

  /** Select All */
  onSelectAll(checked: boolean) {
    this.rolesArray.clear();

    if (checked) {
      this.roles.forEach((r) => this.rolesArray.push(this.fb.control(r)));
    }

    // 👇 Auto close dropdown
    this.isOpen = true;
  }

  /** Check if one role is selected */
  isSelected(role: string): boolean {
    return this.rolesArray.value.includes(role);
  }

  /** Check all selected */
  isAllSelected(): boolean {
    return this.rolesArray.length === this.roles.length;
  }

  /** Header Text Logic */
  getSelectedText() {
    const selected = this.rolesArray.value;

    if (selected.length === 0) return 'Select Role';
    if (selected.length === 1) return selected[0]; // show single role name

    return selected.join(', '); // multiple → comma separated list
  }
}
