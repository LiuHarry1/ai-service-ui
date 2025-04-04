import {Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Jira {
  jira_id: string;
  summary: string;
}

interface JiraGroup {
  id: number;
  name: string;
  jiras: Jira[];
}


@Component({
  selector: 'app-jira-group-detail',
  templateUrl: './jira-group-detail.component.html',
  styleUrls: ['./jira-group-detail.component.css']
})
export class JiraGroupDetailComponent {

  group: JiraGroup | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const groupId = +this.route.snapshot.paramMap.get('id')!;
    this.loadGroup(groupId);
  }

  loadGroup(groupId: number) {
    // Mocked data. Replace with actual API call if needed.
    const groups: JiraGroup[] = [
      { id: 1, name: 'Frontend Tasks', jiras: [{ jira_id: 'JIRA-101', summary: 'Fix navbar bug' }] },
      { id: 2, name: 'Backend Tasks', jiras: [{ jira_id: 'JIRA-201', summary: 'Refactor API auth' }] }
    ];
    this.group = groups.find(g => g.id === groupId) || null;
  }

  addJira(jiraId: string) {
    if (this.group && jiraId.trim()) {
      this.group.jiras.push({ jira_id: jiraId, summary: 'Mock summary' });
    }
  }

  removeJira(jiraId: string) {
    if (this.group) {
      this.group.jiras = this.group.jiras.filter(jira => jira.jira_id !== jiraId);
    }
  }
}
