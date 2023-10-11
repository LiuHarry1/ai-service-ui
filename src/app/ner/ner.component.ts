import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { host } from '../app-config';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  query: string = '';
  searchResults: any[] = [];
  topFaqs: any[] = [];

  modelName: string = ''

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,  private route: ActivatedRoute) {
    this.getTopFAQs();
  }


  ngOnInit() {
    this.sanitizeMessages();

    this.route.queryParams.subscribe(params => {
      this.modelName = params['model'];
    });

    console.info("modelname:"+this.modelName)

  }


  search(): void {
    if (this.query.trim() === '') {
      this.searchResults = [];
      return;
    }
    this.http
      .get<any[]>(host+`/search?query=${this.query}&model=${this.modelName}`)
      .subscribe((data) => {
        console.info("invoking search method", data)
        this.searchResults = data;
      });
  }

  getTopFAQs(): void {
    this.http
      .get<any[]>(host+`/top-faqs`)
      .subscribe((data) => {
        this.topFaqs = data;
      });
  }

  // Sanitize messages with HTML content
  sanitizeMessages() {
    for (let result of this.searchResults) {
      result = this.sanitizer.bypassSecurityTrustHtml(result);

    }
  }
}
