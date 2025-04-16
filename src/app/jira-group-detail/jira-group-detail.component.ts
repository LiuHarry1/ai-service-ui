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
  queryInput: string = '';
  searchType: 'jira_id' | 'jql' = 'jira_id';
  fetchedJiras: Jira[] = [];
  selectedFetchedJiras: Jira[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.group = {
      id: groupId,
      name: `Group ${groupId}`,
      description: 'Sample description for Group ' + groupId,
      jiras: [
        { jira_id: 'JIRA-101', summary: 'Fix navbar bug' },
        { jira_id: 'JIRA-102', summary: 'Update login flow' }
      ]
    };
  }

  fetchJira(): void {
    this.fetchedJiras = [
      { jira_id: 'JIRA-201', summary: 'Optimize DB queries' },
      { jira_id: 'JIRA-202', summary: 'Add new UI component' },
      { jira_id: 'JIRA-203', summary: 'Enhance auth system' }
    ];
    this.selectedFetchedJiras = [];
  }

  addSelectedJiras(): void {
    if (!this.group) return;
    this.selectedFetchedJiras.forEach(jira => {
      if (!this.group!.jiras.find(g => g.jira_id === jira.jira_id)) {
        this.group!.jiras.push(jira);
      }
    });
    this.selectedFetchedJiras = [];
  }

  removeJira(jiraId: string): void {
    if (!this.group) return;
    this.group.jiras = this.group.jiras.filter(j => j.jira_id !== jiraId);
  }

  hasUnsavedChanges(): boolean {
    if (!this.group) return false;
    return this.group.jiras.length > 2; // Adjust the logic if needed
  }

  saveGroupJiras(): void {
    if (!this.group) return;

    // You can replace this with real API call
    console.log('Saving jiras to group:', this.group);
    alert('Jiras saved to the group successfully!');
  }
}
