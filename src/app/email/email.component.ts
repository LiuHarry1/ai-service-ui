// email.component.ts

import { MatDialog } from '@angular/material/dialog';
import { EmailPopupComponent } from '../email-popup/email-popup.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  searchQuery: string = '';
  searchResults: any[] = []; // Simulated search results
  selectedEmail: any;

  constructor(public dialog: MatDialog) {}

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


  search() {
    // Simulated data for search results
    this.searchResults = [
      {
        id: 1,
        subject: 'Example Subject 1',
        date: '2023-12-31',
        content: 'This is a sample email content. It might be long.'
      },
      {
        id: 2,
        subject: 'Example Subject 2',
        date: '2023-12-30',
        content: 'Another email content for demonstration purposes.'
      },
      // Add more simulated data as needed
    ];
  }

  showEmailDetails(emailId: number) {
    // Simulated data for the selected email details
    this.selectedEmail = this.searchResults.find(email => email.id === emailId);
  }

  closeDetails() {
    this.selectedEmail = null;
  }
}
