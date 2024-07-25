import { Component } from '@angular/core';
import {prompt_engineering_host} from "../app-config";
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  developmentRequired: string = 'true'
  submitted: boolean = true;
  isEditingSummary: boolean = false;
  isEditingDescription: boolean = false;
  isEditingAcceptanceCriteria: boolean =false;
  storyPoint: string = '3'
  showFeedback: boolean = true; // Control the display of the feedback section

  isLoading: boolean = false;

  constructor(
    private http: HttpClient
  ) {
  }

  onSubmit() {
    console.info("onSubmit...")

    // Here you would call your LLM service
    // For example, assume a function generateDetails(input: string) returns an object with summary, description, and acceptanceCriteria
    this.isLoading = true
    this.http.post<any>(prompt_engineering_host+'/generate-jira-message', { user_input: this.userInput}).subscribe(response => {
      console.info(response)
      const data = response.jira_message
      this.summary =  data.summary
      this.description = data.description
      this.acceptanceCriteria = data.acceptanceCriteria
      this.developmentRequired = data.developmentRequired
      this.storyPoint = data.storyPoint
      this.isLoading = false
      this.submitted = true;
      console.info("storyPoint," + this.storyPoint + "developmentRequried, "+ this.developmentRequired)
    });
  }

  editSummary() {
    this.isEditingSummary = true;
  }

  toggleEdit(field: string) {
    switch (field) {
      case 'summary':
        this.isEditingSummary = !this.isEditingSummary;
        console.info("toggle Edit" + this.isEditingSummary)
        break;
      case 'description':
        this.isEditingDescription = !this.isEditingDescription;
        break;
      case 'acceptanceCriteria':
        this.isEditingAcceptanceCriteria = !this.isEditingAcceptanceCriteria;
        break;
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  onThumbsUp() {
    // alert('Thank you for your feedback! You liked this as a good practice.');
    this.saveFeedback('good');
  }

  // Handle thumbs-down button click
  onThumbsDown() {
    // alert('Thank you for your feedback! You marked this as a bad practice.');
    this.saveFeedback('bad');
  }

  // Save feedback (this is a placeholder function)
  saveFeedback(feedback: string) {
    this.showFeedback= false
    const data = {
      userInput: this.userInput,
      summary: this.summary,
      description: this.description,
      acceptanceCriteria: this.acceptanceCriteria,
      developmentRequired: this.developmentRequired,
      storyPoint: this.storyPoint,
      feedback: feedback
    };

    // Set the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make a POST request to the Python backend
    this.http
      .post(prompt_engineering_host+'/save-feedback', data, { headers: headers })
      .subscribe(
        (response) => {
          console.log('Feedback saved:', response);
          alert('Thank you for your feedback!');
        },
        (error) => {
          console.error('Error saving feedback:', error);
          alert('Failed to save feedback. Please try again later.');
        }
      );
  }
  closeFeedbackSection() {
    this.showFeedback = false; // Hide the feedback section when closed
    console.log('Feedback Section Closed');
  }

}
