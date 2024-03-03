// text-format.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { prompt_engineering_host } from '../../app-config';

@Component({
  selector: 'app-text-format',
  templateUrl: './text-format.component.html',
  styleUrls: ['./text-format.component.css']
})
export class TextFormatComponent {
  text: string = '';
  fileName: string = '';
  formattedText: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  submitText(){
    this.async_format_text()
  }

  submitText_old() {

    const words = this.text.trim().split(/\s+/);

    // Checking if the length of words is more than 100
    if (words.length > 100) {
      console.info("the length of words is more than 100, "+ words.length)
       const fileName = prompt('Please provide a file name:');

      if (fileName !== null && fileName.trim() !== '') {
        this.fileName = fileName
        // User provided a file name, you can proceed with further actions

        this.async_format_text()
      } else {
        // User canceled or provided an empty file name
        // You can handle this case accordingly
        console. info("filename is null")
      }
    } else {
      this.sync_format_text()
      // Length of words is not more than 100, do nothing
      console.info(this.formattedText)
    }

  }

  async_format_text(){
    this.http.post(prompt_engineering_host+'/text/format', { text: this.text, name: this.fileName }).subscribe(() => {
      console.info("success...")
      this.router.navigate(['/text-formatter/formatted-results']);
    }, error => {
      console.error('Error occurred:', error);
    });
  }
  sync_format_text(){
    this.http.post(prompt_engineering_host+'/text/sync_format', { text: this.text}).subscribe((content) => {
      console.info("success...")
      this.formattedText = content.toString()
    }, error => {
      console.error('Error occurred:', error);
    });
  }
}
