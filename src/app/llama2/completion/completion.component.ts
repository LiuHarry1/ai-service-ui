import { Component } from '@angular/core';
import {prompt_engineering_host} from "../../app-config";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.css']
})
export class CompletionComponent {

  text: string = '';

  completion: string = '';
  showCompletion: boolean = false;
  isLoading: boolean = false;

  constructor(private http: HttpClient) { }


  submitText(){
    this.isLoading = true;
    this.http.post(prompt_engineering_host+'/llama/completion', { prompt: this.text}).subscribe((response: any) => {
      console.info("Success...", response);
      if (response && response.completion) {
        this.completion = response.completion;
        this.showCompletion = true;

      }
      this.isLoading = false;
    }, error => {
      console.error('Error occurred:', error);
      this.isLoading = false;
    });
  }

}
