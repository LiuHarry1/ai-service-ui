// email-categorization.component.ts

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-email-categorization',
  templateUrl: './email-categorization.component.html',
  styleUrls: ['./email-categorization.component.css']
})
export class EmailCategorizationComponent {
  sender = '';
  subject = '';
  content = '';
  emailPriority: string | null = null;

  constructor(private http: HttpClient) {}

  categorizeEmail(): void {

    const data = {
      sender: this.sender,
      subject: this.subject,
      content: this.content
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set JSON content type headers

    console.info(data)
    this.http
        .post('http://localhost:2020/categorize-email', data, { headers })
      .subscribe(
        (response: any) => {
          this.emailPriority = response.priority;
        },
        (error) => {
          console.error('Error categorizing email:', error);
        }
      );
  }
}
