import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { host } from '../app-config';
import {MatDialog} from "@angular/material/dialog";
import {EmailPopupComponent} from "../email-popup/email-popup.component";

@Component({
  selector: 'app-email-searcher',
  templateUrl: './email-searcher.component.html',
  styleUrls: ['./email-searcher.component.css']
})
export class EmailSearcherComponent {

  query: string = '';
  searchResults: any[] = [];
  inputData: any = {};
  isLoading: boolean = false;
  recentQueries: string[] = [];
  emailTimeRange: any = {};
  isQueried = false
  queryTypes: any[] = [
    { label: 'Email Subject', value: 'email_subject' },
    { label: 'Email Content', value: 'email_content' },
   /* { label: 'UniversalSentenceEncoder', value: 'UniversalSentenceEncoder_Model' },*/
    { label: 'Both', value: 'both' },
  ];
  queryType: string = 'email_content'


  constructor(private http: HttpClient, private sanitizer: DomSanitizer,  private route: ActivatedRoute,
              public dialog: MatDialog) {

  }
  ngOnInit() {
    this.getRecentQueries();
    this.getEmailTimeRange()
  }


  openEmailPopup(email: any): void {

    this.inputData['pk_email_id'] = `${email['pk_email_id']}`
    console.info("inputdata", this.inputData)
    this.isLoading = true;
    this.http.post<any>(host+`/get_email`, this.inputData)
      .subscribe(data => {
        console.info("invoking search method", data)
        email['whole_email_chain']= data.wholeEmailchain;
        console.info("invoking search method", email)
        // Handle the prediction result as needed
        this.isLoading = false;
        const dialogRef = this.dialog.open(EmailPopupComponent, {
          width: '600px',
          data: email
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The email popup was closed');
          // Add logic here if needed after closing the popup
        });

      }, error => {
        console.error('Error occurred:', error);
        this.isLoading = false;
      });


  }

  search(): void {
    if (this.query.trim() === '') {
      this.searchResults = [];
      return;
    }
    this.isQueried=true
    this.searchResults = []
    this.isLoading = true;
    this.http.get<any[]>(host + `/email_search?query=${this.query}&query_type=email_subject`).subscribe((data) => {
      console.info("invoking search method", data);
      this.searchResults = data;
      this.isLoading = false;

    }, error => {
      console.error('Error occurred:', error);
      this.isLoading = false;
    });

    // this.getRecentQueries();
  }
  getRecentQueries(): void {
    this.http.get<string[]>(host + '/get_recent_queries').subscribe(
      queries => {
        this.recentQueries = queries;
      },
      error => {
        console.error('Error fetching recent queries:', error);
      }
    );
  }
  searchByQuery(recentQuery :string) : void {
    this.query = recentQuery
    this.search()
  }

  getEmailTimeRange(): void {
    this.http.get<string[]>(host + '/get_email_range').subscribe(
      result => {
        this.emailTimeRange = result;

      },
      error => {
        console.error('Error fetching recent queries:', error);
      }
    );
  }



}
