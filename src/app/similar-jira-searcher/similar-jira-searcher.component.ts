import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { similar_jira_finder_host } from '../app-config';
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-email-searcher',
  templateUrl: './similar-jira-searcher.component.html',
  styleUrls: ['./similar-jira-searcher.component.css']
})
export class SimilarJiraSearcherComponent {

  query: string = '';
  isLoading: boolean = false;
  isQueried = false
  queryTypes: any[] = [
    { label: 'Jira ID', value: 'Jira-ID' },
    { label: 'Summary/Description', value: 'Summary/Description' },
  ];
  queryType: string = 'Jira-ID';

  similarJIRAs: any[] = []

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,  private route: ActivatedRoute,
              public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  navigateToJIRAWeb(similarJIRA: any): void {
    const  jira_id = `${similarJIRA['pk_jira_data_id']}`
    console.info("jira_id" + jira_id)
  }

  search(): void {
    if (this.query.trim() === '') {
      this.similarJIRAs = []
      return;
    }
    this.isQueried=true
    this.similarJIRAs = []
    this.isLoading = true;

    this.http.get<any[]>(similar_jira_finder_host + `/search_jira?query=${this.query}&query_type=${this.queryType}`).subscribe((data:any) => {
      console.info("invoking search method", data);

      this.isLoading = false;
      this.similarJIRAs = data["similarJiras"]


    }, error => {
      console.error('Error occurred:', error);
      this.isLoading = false;
    });
  }

  truncateQuery(query: string, maxLength: number): string {

    if (query.length > maxLength) {
      return query.substring(0, maxLength) + '...';
    } else {
      return query;
    }
  }


}
