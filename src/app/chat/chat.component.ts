import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {host} from "../app-config";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked, OnInit {
  @ViewChild('chatArea') private chatArea!: ElementRef;
  userMessage: string = '';
  chatMessages: any[] = [];

  suggestions: string[] = [];
  allSuggestions: string[] = [];
  showSuggestions = false;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.http.get<string[]>(host+'/faq/all-suggestions')
      .subscribe(data => {
        this.allSuggestions = data
      });

  }

  ngOnInit() {
    this.sanitizeMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  sendMessage() {
    if (this.userMessage.trim() === '') {
      return;
    }

    this.showSuggestions=false

    this.chatMessages.push({ text: this.userMessage, type: 'user' });

    this.http.post<any>('http://localhost:2020/api/chat', { user_message: this.userMessage }).subscribe(response => {
      this.chatMessages.push({ text: response.bot_response, type: 'bot' });
      this.userMessage = '';
    });
  }

  scrollToBottom() {
    try {
      this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
    } catch (err) {}
  }

  // Sanitize messages with HTML content
  sanitizeMessages() {
    for (let message of this.chatMessages) {
      if (message.type === 'bot') {
        message.text = this.sanitizer.bypassSecurityTrustHtml(message.text);
      }
    }
  }

  onQueryChange() {
    this.showSuggestions = true;
    this.suggestions = this.getTop5SimilarSuggestions(this.allSuggestions, this.userMessage);

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
