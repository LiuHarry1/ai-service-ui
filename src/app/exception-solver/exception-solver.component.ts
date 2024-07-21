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

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.exceptionForm = this.fb.group({
      exceptionStack: [''],
      problemDescription: ['',Validators.required],
      environmentInformation: [''],
      codeSnippets: this.fb.array([this.createCodeSnippet()])
    });

  }

  get codeSnippets() {
    return this.exceptionForm.get('codeSnippets') as FormArray;
  }

  createCodeSnippet(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  addCodeSnippet() {
    this.codeSnippets.push(this.createCodeSnippet());
  }

  removeCodeSnippet(index: number) {
    this.codeSnippets.removeAt(index);
  }

  onSubmit() {
    if (this.exceptionForm.valid) {
      this.http.post<any>(prompt_engineering_host+'/fix-exception', this.exceptionForm.value)
        .subscribe(response => {
          console.info("response:"+response)
          this.result = response.data;
        });
    }
  }

}
