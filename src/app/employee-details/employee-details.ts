import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { EmpFillDetails } from '../emp-fill-details/emp-fill-details';
import { EmpAddSecound } from '../emp-add-secound/emp-add-secound';
import { EmpLoginType } from '../emp-login-type/emp-login-type';
import { EmpFinal } from '../emp-final/emp-final';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule, EmpFillDetails, EmpAddSecound, EmpLoginType, EmpFinal],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.scss',
})
export class EmployeeDetails {
  currentStep = 0;

  @ViewChild(EmpFillDetails) childForm!: EmpFillDetails;

  receivedFormData: any;

  receiveData(data: any) {
    this.receivedFormData = data;
    console.log('Parent received:', data);

    // Only after valid data → NEXT
    this.currentStep++;
  }

  stepTitles = ['Basic Details', 'Address Information', 'Salary & Payroll', 'Finish'];
  goNext() {
    debugger;
    if (this.currentStep === 0) {
      this.childForm.submitFormToParent();
      return;
    }
    // Step 1,2,3 → Normal next
    this.currentStep++;
  }

  goBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  save() {
    console.log('Form Saved!');
  }

  onClose() {
    console.log('Closed!');
  }
}
