import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  query: string = '';
  searchResults: any[] = [];
  topFaqs: any[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.getTopFAQs();
  }

  ngOnInit() {
    this.sanitizeMessages();
  }


  search(): void {
    if (this.query.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.http
      .get<any[]>(`http://localhost:2020/search?query=${this.query}`)
      .subscribe((data) => {
        this.searchResults = data;
      });
  }

  getTopFAQs(): void {
    this.http
      .get<any[]>(`http://localhost:2020/top-faqs`)
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
