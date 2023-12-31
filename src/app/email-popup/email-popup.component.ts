import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrls: ['./email-popup.component.css']
})
export class EmailPopupComponent {
  sanitizedContent: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<EmailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public email: any,
    private sanitizer: DomSanitizer
  ) {
    console.info("sanitizedContent:"+ email['whole_email_chain'])
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(email['whole_email_chain']);
  }

  getSafeContent(): SafeHtml {

    return this.sanitizedContent;
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
