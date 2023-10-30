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

  suggestions: string[] = [];
  allSuggestions: string[] = [];
  showSuggestions = false;
  selectedSuggestionIndex: number = -1;

  selectedItem: string = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,  private route: ActivatedRoute) {
    this.getTopFAQs();

    this.http.get<string[]>(host+'/faq/all-suggestions')
      .subscribe(data => {
        this.allSuggestions = data
      });
  }


  ngOnInit() {
    this.sanitizeMessages();

    this.route.queryParams.subscribe(params => {
      this.modelName = params['model'];
    });

    console.info("modelname:"+this.modelName)


  }
  onQueryChange() {
    this.showSuggestions = true;
    this.suggestions = this.getTop5SimilarSuggestions(this.allSuggestions, this.query);

  }

  onKeyDown(event: KeyboardEvent) {
    // console.info("....."+event.key)
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedSuggestionIndex =
        (this.selectedSuggestionIndex + 1) % this.suggestions.length;
      this.query = this.suggestions[this.selectedSuggestionIndex];
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedSuggestionIndex =
        (this.selectedSuggestionIndex - 1 + this.suggestions.length) % this.suggestions.length;
      this.query = this.suggestions[this.selectedSuggestionIndex];

    }

  }

  onSuggestionClick(suggestion: string) {
    this.query = suggestion;
    this.showSuggestions = false;
  }





  search(): void {

    console.info("ss" + this.selectedItem)
    this.query = this.selectedItem
    if (this.query.trim() === '') {
      this.searchResults = [];
      return;
    }
    this.http.get<any[]>(host+`/search?query=${this.query}&model=${this.modelName}`).subscribe((data) => {
        console.info("invoking search method", data)
        this.searchResults = data;
        this.suggestions = []
      });
  }

  search_new(): void {

    if (this.selectedItem.trim() === '') {
      this.searchResults = [];
      return;
    }
    this.http.get<any[]>(host+`/search?query=${this.selectedItem}&model=${this.modelName}`).subscribe((data) => {
      console.info("invoking search method", data)
      this.searchResults = data;
      this.suggestions = []
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



  getTop5SimilarSuggestions(suggestions: string[], query: string): string[] {
    return suggestions
      .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => this.calculateSimilarity(a, query) - this.calculateSimilarity(b, query))
      .slice(0, 5);
  }

  calculateSimilarity(suggestion: string, query: string): number {
    // You can use Levenshtein distance or any other similarity metric here
    // Example: Using Levenshtein distance
    if (suggestion === query) return 0;
    const matrix = [];
    const len1 = suggestion.length;
    const len2 = query.length;

    for (let i = 0; i <= len2; i++) {
      matrix[i] = [i];
    }

    for (let i = 0; i <= len1; i++) {
      matrix[0][i] = i;
    }

    for (let i = 1; i <= len2; i++) {
      for (let j = 1; j <= len1; j++) {
        const cost = suggestion[j - 1] === query[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[len2][len1];
  }



}
