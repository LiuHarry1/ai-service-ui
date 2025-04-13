import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-fsd-generator',
  templateUrl: './fsd-generator.component.html',
  styleUrls: ['./fsd-generator.component.css']
})
export class FsdGeneratorComponent {
  functionName = '';
  jiraTickets: { id: string; summary: string }[] = [];
  fsdMarkdown: string = '';
  dummyTickets = [
    { id: 'JIRA-101', summary: 'Add validation for login form' },
    { id: 'JIRA-102', summary: 'Fix logout redirect issue' },
    { id: 'JIRA-103', summary: 'Implement session timeout alert' },
    { id: 'JIRA-104', summary: 'Refactor user auth module' },
    { id: 'JIRA-105', summary: 'Add logging for failed logins' }
  ];

  fetchJiras() {
    this.jiraTickets = [...this.dummyTickets]; // Simulate backend response
    this.fsdMarkdown = ''; // Clear previous output
  }

  removeTicket(index: number) {
    this.jiraTickets.splice(index, 1);
  }

  generateFSD() {
    // Simulate Markdown generation
    const lines = this.jiraTickets.map(ticket => `- **${ticket.id}**: ${ticket.summary}`);
    this.fsdMarkdown = `### Functional Spec for: \`${this.functionName}\`\n\n#### Based on JIRA Tickets:\n\n${lines.join('\n')}`;
  }

  saveAsMarkdown() {
    const blob = new Blob([this.fsdMarkdown], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.functionName || 'fsd'}.md`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
