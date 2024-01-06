import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {host} from "../app-config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrls: ['./email-popup.component.css']
})
export class EmailPopupComponent {
  sanitizedContent: SafeHtml;
  emailData :any
  isLoading: boolean = false;

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
    console.info(host+'/email_searcher/download?email_id='+this.emailData['pk_email_id'])
    this.isLoading = true
    this.http.get(host+'/email_searcher/download?email_id='+this.emailData['pk_email_id'], { responseType: 'blob' }).subscribe(response => {

      const blob = new Blob([response], );
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'knowledge_base.msg';
      a.click();
      window.URL.revokeObjectURL(url);
      this.isLoading = false
    }, error => {
      console.error('Error occurred:', error);
      this.isLoading = false;
    });
  }
}
