import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


interface Jira {
  jira_id: string;
  summary: string;
}

interface JiraGroup {
  id: number;
  name: string;
  description: string;
  jiras: Jira[];
}

@Component({
  selector: 'app-jira-group-detail',
  templateUrl: './jira-group-detail.component.html',
  styleUrls: ['./jira-group-detail.component.css']
})
export class JiraGroupDetailComponent {
  group: JiraGroup | null = null;
  newJiraId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const groupId = Number(this.route.snapshot.paramMap.get('id'));
    // Dummy data simulating fetch by ID
    const dummyGroups: JiraGroup[] = [
      { id: 1, name: 'Frontend Tasks', description: 'UI related work', jiras: [{ jira_id: 'JIRA-101', summary: 'Fix navbar bug' }] },
      { id: 2, name: 'Backend Tasks', description: 'API related tasks', jiras: [{ jira_id: 'JIRA-201', summary: 'Refactor API auth' }] },
    ];
    this.group = dummyGroups.find(g => g.id === groupId) || null;
  }

  addJira(): void {
    if (!this.group || !this.newJiraId.trim()) return;
    this.group.jiras.push({ jira_id: this.newJiraId, summary: 'New Jira Summary' });
    this.newJiraId = '';
  }

  removeJira(jiraId: string): void {
    if (!this.group) return;
    this.group.jiras = this.group.jiras.filter(j => j.jira_id !== jiraId);
  }
}
