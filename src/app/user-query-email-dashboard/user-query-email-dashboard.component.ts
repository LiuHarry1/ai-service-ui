import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {host} from "../app-config";

@Component({
  selector: 'app-user-query-email-dashboard',
  templateUrl: './user-query-email-dashboard.component.html',
  styleUrls: ['./user-query-email-dashboard.component.css']
})
export class UserQueryEmailDashboardComponent implements OnInit {
  userQueryData: any[] = [];
  detailsData: any[] = [];
  selectedRow: any;
  showDetails: boolean = false; // Flag to control details table visibility

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.post<any>(host+'/get_weekly_user_query_emails', {}).subscribe((result) => {
      this.userQueryData = result;
    });
  }

  rowClick(row: any) {
    console.info("clicked row:"+ row)
    this.selectedRow = row;
    this.showDetails = true; // Show details table
    this.http.post<any>(host+'/get_weekly_emails_by_category', { category_name: row.category_name }).subscribe((details) => {
      this.detailsData = details;
    });
  }
}
