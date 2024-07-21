// exception-form.component.ts
import {Component, ElementRef, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {prompt_engineering_host} from "../app-config";

@Component({
  selector: 'app-exception-solver',
  templateUrl: './exception-solver.component.html',
  styleUrls: ['./exception-solver.component.css']
})
export class ExceptionSolverComponent {
  exceptionForm: FormGroup;
  result: any ;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.exceptionForm = this.fb.group({
      exceptionStack: [''],
      problemDescription: [''],
      environmentInformation: [''],
      codeSnippets: this.fb.array([this.createCodeSnippet()])
    });

  }

  get codeSnippets() {
    return this.exceptionForm.get('codeSnippets') as FormArray;
  }

  createCodeSnippet(): FormGroup {
    return this.fb.group({
      description: [''],
      code: ['']
    });
  }

  addCodeSnippet() {
    this.codeSnippets.push(this.createCodeSnippet());
  }

  removeCodeSnippet(index: number) {
    this.codeSnippets.removeAt(index);
  }

  onSubmit() {
    if (this.exceptionForm.invalid) {
      this.checkValidationErrors(this.exceptionForm);
      return;
    }
    if (this.exceptionForm.valid) {
      this.isLoading=true
      this.http.post<any>(prompt_engineering_host+'/fix-exception', this.exceptionForm.value)
        .subscribe(response => {
          console.info("response:"+response)
          this.result = response.data;
          this.isLoading = false
        }, error => {
          this.isLoading = false
          console.error('Error in calling the endpint of /fix-exception:', error);
      });
    }
  }


  checkValidationErrors(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkValidationErrors(control);
      } else { // @ts-ignore
        if (control.invalid) {
                const field = this.getFieldLabel(key);
                alert(`${field} is required`);
              }
      }
    });
  }

  getFieldLabel(field: string): string {
    switch (field) {
      case 'problemDescription':
        return 'Problem Description';
      case 'environmentInformation':
        return 'Environment Information';
      case 'exceptionStack':
        return 'Exception Stack';
      case 'description':
        return 'Description';
      case 'code':
        return 'Code';
      default:
        return field;
    }
  }

}
