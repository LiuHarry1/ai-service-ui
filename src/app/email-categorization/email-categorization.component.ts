// email-categorization.component.ts

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { host } from '../app-config';
import {ActivatedRoute} from "@angular/router";

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

  isLoading: boolean = false;

  modelName: string = 'rfc'
  modelOptions: any[] = [
    { label: 'Random Forest Classifier', value: 'rfc' },
    { label: 'Deep Ml ', value: 'deep_model' },
    ]

  constructor(private http: HttpClient , private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.modelName = params['model'];
    });

    console.info("modelname:"+this.modelName)

  }

  categorizeEmail(): void {

    const data = {
      sender: this.sender,
      subject: this.subject,
      content: this.content,
      model: this.modelName
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set JSON content type headers
    console.info(data)
    this.isLoading = true;
    this.http
      .post(host+'/categorize-email', data, { headers })
      .subscribe(
        (response: any) => {
          this.emailPriority = response.priority;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error categorizing email:', error);
          this.isLoading = false;
        }
      );
  }
}
