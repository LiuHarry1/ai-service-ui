import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  query: string = '';
  searchResults: any[] = [];
  topFaqs: any[] = [];

  constructor(private http: HttpClient) {
    this.getTopFAQs();
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
}
