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

  prompts = [{'title': "", "prompt":"11"}];

  llmNames: any[] = [
    { label: 'llama2', value: 'llama2' },
    { label: 'llama3', value: 'llama3' },
  ];
  llmName: string = "llama2"
  temperature: number = 0;
  top_p: number = 0.5;
  top_k: number = 5;
  n_predict: number = 300;
    prompt: any;
  presence_penalty: number = 0;
  frequency_penalty: number = 0;

  constructor(private http: HttpClient) {


    this.http.get(prompt_engineering_host+"/text/prompt_templates", ).subscribe((response: any) => {
      console.info("Success...", response);
      if (response) {
        this.prompts = response;

      }
    }, error => {
      console.error('Error occurred:', error);
    });

  }


  submitText(){
    this.isLoading = true;
    this.http.post(prompt_engineering_host+'/llama/completion', { prompt: this.text, llm_name: this.llmName, temp: this.temperature, 
          topP: this.top_p, topK: this.top_k, nPredict: this.n_predict,
      frequency_penalty: this.frequency_penalty, presence_penalty: this.presence_penalty}).subscribe((response: any) => {
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

  getPrompt(promptContent : any ) {
    this.text = promptContent.prompt
  }

}
