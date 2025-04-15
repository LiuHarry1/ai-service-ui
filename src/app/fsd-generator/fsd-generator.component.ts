import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fsd-generator',
  templateUrl: './fsd-generator.component.html',
  styleUrls: ['./fsd-generator.component.scss']
})
export class FsdGeneratorComponent {
  functionName = '';
  jiraList = [
    { id: 'JIRA-101', summary: 'User login error on mobile' },
    { id: 'JIRA-102', summary: 'Refactor password validation' },
    { id: 'JIRA-103', summary: 'Add logging to signup flow' }
  ];
  generatedFsd = '';
  searchModes = [
    { value: 'keyword', label: 'Keyword', placeholder: 'Enter keywords (e.g., login bug)' },
    { value: 'jql', label: 'JQL', placeholder: 'Enter JQL (e.g., project=ABC AND status="To Do")' }
  ];
  featureName = '';
  selectedSearchMode = this.searchModes[0]; // default to keyword

  constructor(private router: Router) {}

  onFetchJira() {
    const mode = this.selectedSearchMode.value;
    console.log('Searching by:', mode);
    console.log('Query:', this.functionName);
    // Use mode and functionName to fetch JIRA tickets
  }

  removeJira(jiraToRemove: any) {
    this.jiraList = this.jiraList.filter(j => j.id !== jiraToRemove.id);
  }


  generateFsd() {
    const relatedJiraText = this.jiraList.map(j => `**${j.id}** - ${j.summary}`).join('\n- ');
    this.generatedFsd = `
### Functional Spec for ${this.functionName}
**Feature**: ${this.featureName || 'N/A'}

**Related JIRAs**: ${this.jiraList.map(j => j.id).join(', ')}

**Summary**:
This FSD is based on the analysis of selected JIRA tickets:

- ${relatedJiraText}

**Implementation Notes**:
- Add your implementation details here.
`;
  }

  saveAsMarkdown() {
    const blob = new Blob([this.generatedFsd], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.functionName || 'fsd'}.md`;
    a.click();
    window.URL.revokeObjectURL(url);
  }


  goToBrowser() {
    this.router.navigate(['/fsd-browser']);
  }
}
