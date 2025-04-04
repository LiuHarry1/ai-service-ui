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
  description: string;
  jiras: Jira[];
}


@Component({
  selector: 'app-jira-group-manager',
  templateUrl: './jira-group-manager.component.html',
  styleUrls: ['./jira-group-manager.component.css']
})
export class JiraGroupManagerComponent {
  jiraGroups: JiraGroup[] = [];
  nextGroupId = 7;

  isDialogVisible = false;
  currentGroupName = '';
  currentGroupDescription = '';
  groupToEdit: JiraGroup | null = null;
  dialogMode: 'create' | 'edit' = 'create';
  globalFilter: string = '';  // This is used for global search

  constructor(private router: Router) {
    this.loadGroups();
  }

  loadGroups() {
    this.jiraGroups = [
      { id: 1, name: 'Frontend Tasks', description: 'Jira items for sprint 1', jiras: [{ jira_id: 'JIRA-101', summary: 'Fix navbar bug' }] },
      { id: 2, name: 'Backend Tasks', description: 'Jira items for sprint 1', jiras: [{ jira_id: 'JIRA-201', summary: 'Refactor API auth' }] },
      { id: 3, name: 'Frontend Tasks', description: 'Jira items for sprint 1', jiras: [{ jira_id: 'JIRA-101', summary: 'Fix navbar bug' }] },
      { id: 4, name: 'Backend Tasks', description: 'Jira items for sprint 1', jiras: [{ jira_id: 'JIRA-201', summary: 'Refactor API auth' }] },
      { id: 5, name: 'Frontend Tasks', description: 'Jira items for sprint 1', jiras: [{ jira_id: 'JIRA-101', summary: 'Fix navbar bug' }] },
      { id: 6, name: 'Backend Tasks', description: 'Jira items for sprint 1', jiras: [{ jira_id: 'JIRA-201', summary: 'Refactor API auth' }] },
    ];
  }

  openCreateDialog(): void {
    this.dialogMode = 'create';
    this.currentGroupName = '';
    this.currentGroupDescription = '';
    this.groupToEdit = null;
    this.isDialogVisible = true;
  }

  openEditDialog(group: JiraGroup): void {
    this.dialogMode = 'edit';
    this.currentGroupName = group.name;
    this.currentGroupDescription = group.description || '';
    this.groupToEdit = group;
    this.isDialogVisible = true;
  }

  closeDialog(): void {
    this.isDialogVisible = false;
    this.groupToEdit = null;
  }

  saveGroup(): void {
    const name = this.currentGroupName.trim();
    const description = this.currentGroupDescription.trim();

    if (!name) return;

    if (this.dialogMode === 'edit' && this.groupToEdit) {
      this.groupToEdit.name = name;
      this.groupToEdit.description = description;
    } else if (this.dialogMode === 'create') {
      this.jiraGroups.push({
        id: this.nextGroupId++,
        name,
        description,
        jiras: []
      });
    }

    this.closeDialog();
  }

  deleteGroup(groupId: number) {
    this.jiraGroups = this.jiraGroups.filter(g => g.id !== groupId);
  }

  selectGroup(group: JiraGroup) {
    this.router.navigate(['/jira-group-detail', group.id]);
  }
}
