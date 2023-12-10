import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-labeling',
  templateUrl: './email-labeling.component.html',
  styleUrls: ['./email-labeling.component.css']
})
export class EmailLabelingComponent implements OnInit {
  emails: any[] = []; // Assuming the email data has fields: subject, from, content, priority

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetching dummy data for demonstration purposes
    this.emails = [
      { subject: 'Example Subject 1', from: 'sender@example.com', content: 'Content of email 1', priority: 'low' },
      { subject: 'Example Subject 2', from: 'another@example.com', content: 'Content of email 2', priority: 'medium' },
      { subject: 'Example Subject 3', from: 'third@example.com', content: 'Content of email 3', priority: 'high' }
      // Add more dummy emails here...
    ];
  }

  saveLabels(): void {
    // Simulating saving labeled data to a backend (replace this with actual API call)
    console.log('Labeled emails:', this.emails);
    // Perform HTTP POST request to your backend API to save labeled data
    // ...
  }
}
