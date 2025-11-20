import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmpDetails } from '../core/service/emp-details';

interface Property {
  id: number;
  name: string;
  departmentList: string[];
}
@Component({
  selector: 'app-emp-fill-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emp-fill-details.html',
  styleUrl: './emp-fill-details.scss',
})
export class EmpFillDetails {
  employeeForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  properties: Property[] = [
    {
      id: 1,
      name: 'Hampton Inn',
      departmentList: ['Front Desk', 'Housekeeping', 'Management'],
    },
    {
      id: 2,
      name: 'Holiday Inn Express',
      departmentList: ['Front Desk', 'Maintenance', 'Sales'],
    },
    { id: 3, name: 'SleepInn', departmentList: ['Front Desk', 'Housekeeping'] },
    {
      id: 4,
      name: 'Comfort Inn Downtown Charleston',
      departmentList: ['Front Desk', 'Housekeeping', 'Operations'],
    },
  ];

  constructor(private fb: FormBuilder, private empDetails: EmpDetails) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group(
      {
        employeeId: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: ['', Validators.required],
        gender: ['', Validators.required],

        // ⭐ PROPERTY ACCESS
        propertyAccess: this.fb.array(
          this.properties.map((prop) => this.createPropertyGroup(prop))
        ),
      },
      {
        validators: [this.atLeastOnePropertySelected(), this.exactlyOneDefaultSelected()],
      }
    );
  }

  createPropertyGroup(prop: Property): FormGroup {
    return this.fb.group({
      id: [prop.id],
      name: [prop.name],
      selected: [false],
      department: [{ value: '', disabled: true }, Validators.required],
      isDefault: [{ value: false, disabled: true }],
    });
  }

  get propertyAccessArray(): FormArray {
    return this.employeeForm.get('propertyAccess') as FormArray;
  }

  // ⭐ At least one property must be selected
  atLeastOnePropertySelected(): ValidatorFn {
    return (form: AbstractControl) => {
      const arr = form.get('propertyAccess') as FormArray;
      const selected = arr.controls.some((c) => c.get('selected')?.value === true);
      return selected ? null : { noPropertySelected: true };
    };
  }

  // ⭐ Exactly one default among selected
  exactlyOneDefaultSelected(): ValidatorFn {
    return (form: AbstractControl) => {
      const arr = form.get('propertyAccess') as FormArray;

      const selectedProps = arr.controls.filter((c) => c.get('selected')?.value);

      if (selectedProps.length === 0) return null;

      const defaultCount = selectedProps.filter((c) => c.get('isDefault')?.value === true).length;

      return defaultCount === 1 ? null : { defaultNotExactlyOne: true };
    };
  }

  // ⭐ CHANGE WHEN SELECTED = TRUE → CLEAR DEFAULT & DEPARTMENT
  onChangeSelected(propertyGroup: AbstractControl) {
    const group = propertyGroup as FormGroup;
    const selected = group.get('selected')?.value;

    if (!selected) {
      group.get('department')?.reset('');
      group.get('isDefault')?.setValue(false);

      group.get('department')?.disable();
      group.get('isDefault')?.disable();
    } else {
      group.get('department')?.enable();
      group.get('isDefault')?.enable();
    }

    group.updateValueAndValidity();
  }

  // ⭐ ONLY ONE DEFAULT AMONG SELECTED
  onSelectDefault(propertyGroup: AbstractControl) {
    const selectedGroup = propertyGroup as FormGroup;

    this.propertyAccessArray.controls.forEach((ctrl) => {
      const group = ctrl as FormGroup;

      // Selected group => this one becomes true
      if (group === selectedGroup) {
        group.get('isDefault')?.setValue(true);
      } else {
        group.get('isDefault')?.setValue(false);
      }
    });
  }

  // ⭐ FINAL SUBMIT
  onSubmit() {
    debugger;
    if (this.employeeForm.invalid) return;
    console.log('Child sending data...');
    this.formSubmit.emit(this.employeeForm.value);
  }

  submitFormToParent() {
    debugger;
    this.employeeForm.updateValueAndValidity();
    console.log('FORM ERRORS:', this.employeeForm.errors);
    console.log(
      'PROPERTY ERRORS:',
      this.propertyAccessArray.controls.map((c) => c.errors)
    );
    console.log('VALUES:', this.employeeForm.value);

    if (this.employeeForm.invalid || this.employeeForm.errors?.['noPropertySelected']) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.onSubmit();
  }

  currentStep = 2;
  next() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prev() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
