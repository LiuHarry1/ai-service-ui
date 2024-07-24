import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {prompt_engineering_host} from "../app-config";
import { trigger, state, style, transition, animate } from '@angular/animations';

interface UserCase {
  userInput: string;
  summary: string;
  description: string;
  acceptanceCriteria: string;
  developmentRequired: string;
  storyPoint: string;
  feedback: string;
  expanded?: boolean; // Add this property to track row expansion
}
@Component({
  selector: 'app-jira-usercase',
  templateUrl: './jira-usercase.component.html',
  styleUrls: ['./jira-usercase.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({
          height: '0px',
          minHeight: '0',
          display: 'none'
        })
      ),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class JiraUsercaseComponent {
  userCases: UserCase[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchUserCases();
  }

  // Fetch user cases from the backend
  fetchUserCases() {
    this.http.get<UserCase[]>(prompt_engineering_host+'/jira/user-cases').subscribe(
      (data) => {
        this.userCases = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching user cases:', error);
        this.loading = false;
      }
    );
  }

  // Filter user cases by feedback type
  getGoodUserCases() {
    return this.userCases.filter((caseItem) => caseItem.feedback === 'good');
  }

  getBadUserCases() {
    return this.userCases.filter((caseItem) => caseItem.feedback === 'bad');
  }

  // Toggle row expansion
  toggleRow(caseItem: UserCase) {
    caseItem.expanded = !caseItem.expanded;
  }
}
