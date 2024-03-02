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
  name: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  submitText() {

    this.http.post(prompt_engineering_host+'/text/format', { text: this.text, name: this.name }).subscribe(() => {
      console.info("success...")
      this.router.navigate(['/text-formatter/formatted-results']);
    }, error => {
      console.error('Error occurred:', error);

    });
  }
}
