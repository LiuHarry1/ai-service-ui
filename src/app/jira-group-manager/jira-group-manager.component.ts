import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { similar_jira_finder_host } from '../app-config';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';


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
  selector: 'app-jira-group-manager',
  templateUrl: './jira-group-manager.component.html',
  styleUrls: ['./jira-group-manager.component.css']
})
export class JiraGroupManagerComponent {
  jiraGroups: JiraGroup[] = [];
  newGroupName = '';
  nextGroupId = 3;

  isDialogVisible = false;
  currentGroupName = '';
  groupToEdit: JiraGroup | null = null;

  constructor(private router: Router) {
    this.loadGroups();
  }


  loadGroups() {
    this.jiraGroups = [
      { id: 1, name: 'Frontend Tasks', jiras: [{ jira_id: 'JIRA-101', summary: 'Fix navbar bug' }] },
      { id: 2, name: 'Backend Tasks', jiras: [{ jira_id: 'JIRA-201', summary: 'Refactor API auth' }] }
    ];
  }

  createGroup() {
    if (!this.newGroupName.trim()) return;
    this.jiraGroups.push({ id: this.nextGroupId++, name: this.newGroupName, jiras: [] });
    this.newGroupName = '';
  }

  deleteGroup(groupId: number) {
    this.jiraGroups = this.jiraGroups.filter(g => g.id !== groupId);
  }

  selectGroup(group: JiraGroup) {
    console.log(group);
    this.router.navigate(['/jira-group-detail', group.id]);

  }

  openEditDialog(group: JiraGroup): void {
    this.isDialogVisible = true;
    this.currentGroupName = group.name;
    this.groupToEdit = group;
  }

  closeDialog(): void {
    this.isDialogVisible = false;
    this.groupToEdit = null;
  }

  saveGroupName(): void {
    if (this.groupToEdit && this.currentGroupName.trim()) {
      this.groupToEdit.name = this.currentGroupName;
    }
    this.closeDialog();
  }
}
