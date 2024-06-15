import { Component } from '@angular/core';
import {prompt_engineering_host} from "../app-config";
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-jira-assistant',
  templateUrl: './jira-assistant.component.html',
  styleUrls: ['./jira-assistant.component.css']
})
export class JiraAssistantComponent {
  userInput: string = '';
  summary: string = '';
  description: string = '';
  acceptanceCriteria: string = '';
  submitted: boolean = false;

  isLoading: boolean = false;

  constructor(
    private http: HttpClient
  ) {
  }

  onSubmit() {
    // Here you would call your LLM service
    // For example, assume a function generateDetails(input: string) returns an object with summary, description, and acceptanceCriteria

    this.http.post<any>(prompt_engineering_host+'/generate-jira-message', { user_input: this.userInput}).subscribe(response => {
      console.info(response)
      const data = response.jira_message
      this.summary =  data.summary
      this.description = data.description
      this.acceptanceCriteria = data.acceptanceCriteria
      this.isLoading = false
      this.submitted = true;
    });
  }



  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
}
