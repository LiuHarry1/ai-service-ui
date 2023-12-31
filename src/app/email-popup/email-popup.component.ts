// email-popup.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrls: ['./email-popup.component.css']
})
export class EmailPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<EmailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public email: any
  ) {}

  closePopup(): void {
    this.dialogRef.close();
  }
}
