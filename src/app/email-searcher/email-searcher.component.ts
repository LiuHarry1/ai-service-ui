import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ai_similar_email_finder_host } from '../app-config';
import {MatDialog} from "@angular/material/dialog";
import {EmailPopupComponent} from "../email-popup/email-popup.component";

@Component({
  selector: 'app-email-searcher',
  templateUrl: './email-searcher.component.html',
  styleUrls: ['./email-searcher.component.css']
})
export class EmailSearcherComponent {

  query: string = '';
  inputData: any = {};
  isLoading: boolean = false;
  recentQueries: string[] = [];
  emailTimeRange: any = {};
  isQueried = false
  queryTypes: any[] = [
    { label: 'Subject', value: 'email_subject' },
    { label: 'Body', value: 'email_content' },
    /* { label: 'UniversalSentenceEncoder', value: 'UniversalSentenceEncoder_Model' },*/
    { label: 'Both', value: 'both' },
  ];
  queryType: string = 'email_content';
  additionalOptionsVisible: boolean = false;
  ComponentNames: string[] = ['Announcement', 'EP', 'Alert', 'EC','Payment', 'Settlement','UI', 'Feeds', 'Env', 'Reengineering']; // Replace with your list of button names
  selectedComponents: string[] = [];
  keyWords: any[] = []
  selectedKeyWords: string[] = []
  aiDraftEmail: any;
  enableAi: boolean = false;
  highlySimilarEmails: any[] = [];
  lowSimilarEmails: any[] = []

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,  private route: ActivatedRoute,
              public dialog: MatDialog) {

  }

  handleKeyWordClick(keyword: string, index: number) {
    console.log(`Button "${keyword}" clicked`);
    // Add your logic here for button click event
    const isSelected = this.isKeyWordSelected(keyword);
    if (isSelected) {
      // If the button is already selected, deselect it
      this.selectedKeyWords = this.selectedKeyWords.filter(buttonIndex => buttonIndex !== keyword);
    } else {
      // If the button is not selected, select it
      this.selectedKeyWords.push(keyword);
    }
    console.log("selected key words:"+ this.selectedKeyWords);

    this.advanced_search()
  }

  isKeyWordHighlighted(keyword: string): boolean {
    return this.selectedKeyWords.includes(keyword);
  }

  isKeyWordSelected(keyword: string): boolean {
    return this.isKeyWordHighlighted(keyword);
  }


  handleComponentButtonClick(component: string, index: number) {
    console.log(`Button "${component}" clicked`);
    // Add your logic here for button click event
    const isSelected = this.isComponentSelected(component);
    if (isSelected) {
      // If the button is already selected, deselect it
      this.selectedComponents = this.selectedComponents.filter(buttonIndex => buttonIndex !== component);
    } else {
      // If the button is not selected, select it
      this.selectedComponents.push(component);
    }

    console.log("selected components:"+ this.selectedComponents);
    this.advanced_search()

  }

  advanced_search(){
    if (this.query.trim() === '') {
      this.highlySimilarEmails = [];
      this.lowSimilarEmails = []
      return;
    }
    this.isQueried=true
    this.highlySimilarEmails = [];
    this.lowSimilarEmails = []
    this.isLoading = true;
    this.http.get<any[]>(ai_similar_email_finder_host + `/email_search?query=${this.query}&query_type=email_subject&keyWords=${this.selectedKeyWords}&components=${this.selectedComponents}`).subscribe((data: any) => {
      console.info("invoking search method", data);
      this.highlySimilarEmails= data["highly_similar_emails"]
      this.lowSimilarEmails = data["low_similar_emails"]
      this.isLoading = false;

    }, error => {
      console.error('Error occurred:', error);
      this.isLoading = false;
    });

  }

  isComponnentHighlighted(component: string): boolean {
    return this.selectedComponents.includes(component);
  }

  isComponentSelected(component: string): boolean {
    return this.isComponnentHighlighted(component);
  }


  toggleAdditionalOptions() {
    this.additionalOptionsVisible = !this.additionalOptionsVisible;
    // extract key words for current user query
    this.http.get<any[]>(ai_similar_email_finder_host + `/get_key_words?text=${this.query}`).subscribe((data) => {
      console.info("invoking get_key_words method", data);
      this.keyWords = data;
      this.selectedKeyWords = []
    }, error => {
      console.error('Error occurred in getting key word:', error);
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.enableAi = params['enable_ai'] === 'true';
    });

    this.getRecentQueries();
    this.getEmailTimeRange()

  }


  openEmailPopup(email: any): void {

    this.inputData['pk_email_id'] = `${email['pk_email_id']}`
    console.info("inputdata", this.inputData)
    this.isLoading = true;
    // this.http.post<any>(host+`/get_email`, this.inputData)
    this.http.post<any>(ai_similar_email_finder_host+`/get_html_email_v2`, this.inputData)
      .subscribe(data => {
        console.info("invoking search method", data)
        email['whole_email_chain']= data.wholeEmailchain;
        console.info("invoking search method", email)
        // Handle the prediction result as needed
        this.isLoading = false;
        const dialogRef = this.dialog.open(EmailPopupComponent, {
          width: '90%',
          height: '90%',
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
      this.highlySimilarEmails = [];
      this.lowSimilarEmails = []
      return;
    }
    this.isQueried=true
    this.highlySimilarEmails = []
    this.lowSimilarEmails = []
    this.isLoading = true;
    this.selectedComponents = []
    this.selectedKeyWords = []
    this.http.get<any[]>(ai_similar_email_finder_host + `/email_search_v2?query=${this.query}&query_type=${this.queryType}`).subscribe((data:any) => {
      console.info("invoking search method", data);

      this.isLoading = false;
      this.highlySimilarEmails= data["highly_similar_emails"]
      this.lowSimilarEmails = data["low_similar_emails"]

      const searchedEmails = [];
      for (let i = 0; i < this.highlySimilarEmails.length; i++) {
        searchedEmails.push({
          pk_email_id: this.highlySimilarEmails[i].pk_email_id,
          score: this.highlySimilarEmails[i].score
        });
      }

      this.ai_generated_draft_email(searchedEmails);

    }, error => {
      console.error('Error occurred:', error);
      this.isLoading = false;
    });

  }

  ai_generated_draft_email(searchedEmails: any){
    if (!this.enableAi){
      return ;
    }
    if (searchedEmails.length ==0){
      return ;
    }
    this.aiDraftEmail = {'message':'AI is trying to generate draft email for you.....'}
    this.http.post<any>(ai_similar_email_finder_host+`/ai_generated_draft_email`, {'searchedEmails':searchedEmails, 'user_query':this.query})
      .subscribe(data => {
        console.info("invoking ai_generating_draft_email", data)
        this.aiDraftEmail = data;

      }, error => {
        this.aiDraftEmail = null
        console.error('Error occurred:', error);
      });
  }


  getRecentQueries(): void {
    this.http.get<string[]>(ai_similar_email_finder_host + '/get_recent_queries').subscribe(
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
    this.http.get<string[]>(ai_similar_email_finder_host + '/get_email_range').subscribe(
      result => {
        this.emailTimeRange = result;

      },
      error => {
        console.error('Error fetching recent queries:', error);
      }
    );
  }

  truncateQuery(query: string, maxLength: number): string {


    if (query.length > maxLength) {
      return query.substring(0, maxLength) + '...';
    } else {
      return query;
    }
  }


}
