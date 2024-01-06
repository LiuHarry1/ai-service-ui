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
  @ViewChild('searchResultsElement') searchResultsElement!: ElementRef;


  constructor(private http: HttpClient, private sanitizer: DomSanitizer,  private route: ActivatedRoute,
              public dialog: MatDialog) {

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
    this.searchResults = []
    this.isLoading = true;
    this.http.get<any[]>(host + `/email_search?query=${this.query}`).subscribe((data) => {
      console.info("invoking search method", data);
      this.searchResults = data;
      this.isLoading = false;

    }, error => {
      console.error('Error occurred:', error);
      this.isLoading = false;
    });



}


}
