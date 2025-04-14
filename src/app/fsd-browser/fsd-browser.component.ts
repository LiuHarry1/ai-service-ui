import { Component } from '@angular/core';

@Component({
  selector: 'app-fsd-browser',
  templateUrl: './fsd-browser.component.html',
  styleUrls: ['./fsd-browser.component.css']
})
export class FsdBrowserComponent {
  fsdList = [
    {
      functionName: 'generateReport',
      updatedAt: '2025-04-13',
      jiraIds: ['JIRA-101', 'JIRA-102'],
      markdown: '# generateReport\n\nThis function creates a report based on user inputs.'
    },
    {
      functionName: 'createUserFlow',
      updatedAt: '2025-04-11',
      jiraIds: ['JIRA-103'],
      markdown: '# createUserFlow\n\nHandles the new user onboarding flow.'
    }
  ];

  selectedFsd: any = null;

  selectFsd(fsd: any) {
    this.selectedFsd = fsd;
  }
}
