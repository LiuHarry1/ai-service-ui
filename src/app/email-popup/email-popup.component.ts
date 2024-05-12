import {Component, ElementRef, ViewChild, AfterViewChecked, OnInit, Inject, AfterContentInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {ai_similar_email_finder_host} from "../app-config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrls: ['./email-popup.component.css']
})
export class EmailPopupComponent implements AfterViewChecked{
  sanitizedContent: SafeHtml;
  emailData :any
  isLoading: boolean = false;
  @ViewChild("emailDetails") emailDetailsElem: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<EmailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public email: any,
    private sanitizer: DomSanitizer, private http: HttpClient
  ) {
    this.emailData  = email
    console.info("sanitizedContent:"+ email['whole_email_chain'])
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(email['whole_email_chain']);

  }



  getSafeContent(): SafeHtml {
    return this.sanitizedContent;
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  downloadFile() {
    console.info(ai_similar_email_finder_host+'/email_searcher/download?email_id='+this.emailData['pk_email_id'])

    const data = {"email_id":this.emailData['pk_email_id']}

    this.isLoading = true
    this.downloadFileUrl(ai_similar_email_finder_host+'/email_searcher/download?email_id='+this.emailData['pk_email_id'])
    this.isLoading = false
  }

  downloadFile_old() {
    console.info(ai_similar_email_finder_host+'/email_searcher/download?email_id='+this.emailData['pk_email_id'])

    const data = {"email_id":this.emailData['pk_email_id']}

    this.isLoading = true
    this.http.post(ai_similar_email_finder_host+'/email_searcher_post/download', data, { responseType: 'blob' }).subscribe(response => {

      const blob = new Blob([response], {type:'application/vnd.ms-outlook'});

      this.downloadFile1(blob)
      // this.downloadFile2(blob)
      this.isLoading = false


    }, error => {
      console.error('Error occurred:', error);
      this.isLoading = false;
    });
  }

  downloadFile_old1() {
    console.info(ai_similar_email_finder_host+'/email_searcher/download?email_id='+this.emailData['pk_email_id'])

    const data = {"email_id":this.emailData['pk_email_id']}

    this.isLoading = true
    this.http.get(ai_similar_email_finder_host+'/email_searcher/download?email_id='+this.emailData['pk_email_id'], { responseType: 'blob' }).subscribe(response => {

      const blob = new Blob([response], {type:'application/vnd.ms-outlook'});

      this.downloadFile1(blob)
      // this.downloadFile2(blob)
      this.isLoading = false


    }, error => {
      console.error('Error occurred:', error);
      this.isLoading = false;
    });
  }


  private downloadFileUrl(url: string) {
    const link = document.createElement('a');
    link.href = url
    link.download = 'email.msg';  // Set the desired file name

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger a click event on the link to start the download
    link.click();

    // Remove the link from the body after the download
    document.body.removeChild(link);
  }

  private downloadFile1(blob: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'email.msg';  // Set the desired file name

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger a click event on the link to start the download
    link.click();

    // Remove the link from the body after the download
    document.body.removeChild(link);
  }

  private downloadFile2(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.emailData['pk_email_id']+'.msg';
    a.click();
    window.URL.revokeObjectURL(url);
  }





  ngAfterViewChecked(): void {
    this.emailDetailsElem.nativeElement.scrollTop=0
  }


}
