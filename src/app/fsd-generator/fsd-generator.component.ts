import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fsd-generator',
  templateUrl: './fsd-generator.component.html',
  styleUrls: ['./fsd-generator.component.css']
})
export class FsdGeneratorComponent {
  functionName = '';
  jiraList = [
    { id: 'JIRA-101', summary: 'User login error on mobile' },
    { id: 'JIRA-102', summary: 'Refactor password validation' },
    { id: 'JIRA-103', summary: 'Add logging to signup flow' }
  ];
  generatedFsd = '';

  constructor(private router: Router) {}

  onFetchJira() {
    // Placeholder: Use functionName to fetch relevant JIRA
    console.log('Fetching JIRA for:', this.functionName);
    // Simulate reload
  }

  removeJira(jiraToRemove: any) {
    this.jiraList = this.jiraList.filter(j => j.id !== jiraToRemove.id);
  }

  generateFsd() {
    this.generatedFsd = `
### Functional Spec for ${this.functionName}

**Related JIRAs**: ${this.jiraList.map(j => j.id).join(', ')}

**Summary**:
This FSD is based on the analysis of selected JIRA tickets. Below are the details...

- ${this.jiraList.map(j => `**${j.id}** - ${j.summary}`).join('\n- ')}

**Implementation Notes**:
- Placeholder for technical requirements.
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
