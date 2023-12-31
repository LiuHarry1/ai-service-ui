import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { host } from '../app-config';
import {MatDialog} from "@angular/material/dialog";
import {EmailPopupComponent} from "../email-popup/email-popup.component";

@Component({
  selector: 'app-ps-issue-email-searcher',
  templateUrl: './ps-issue-email-searcher.component.html',
  styleUrls: ['./ps-issue-email-searcher.component.css']
})
export class PsIssueEmailSearcherComponent {

  query: string = '';
  searchResults: any[] = [];
  modelName: string = ''
  selectedEmail: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,  private route: ActivatedRoute, public dialog: MatDialog) {

  }


  openEmailPopup(email: any): void {
    const dialogRef = this.dialog.open(EmailPopupComponent, {
      width: '600px',
      data: email
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The email popup was closed');
      // Add logic here if needed after closing the popup
    });
  }



  search(): void {

    if (this.query.trim() === '') {
      this.searchResults = [];
      return;
    }
    this.http.get<any[]>(host+`/email_search?query=${this.query}`).subscribe((data) => {
      console.info("invoking search method", data)
      this.searchResults = data;
    });
  }








}
