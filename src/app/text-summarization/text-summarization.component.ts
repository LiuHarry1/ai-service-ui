import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-text-summarization',
  templateUrl: './text-summarization.component.html',
  styleUrls: ['./text-summarization.component.css']
})
export class TextSummarizationComponent {
  inputText = '';
  summary = '';

  constructor(private http: HttpClient) {}

  summarizeText() {
    this.http.post('http://localhost:2020/summarize', { text: this.inputText })
      .subscribe((response: any) => {
        this.summary = response.summary;
      });
  }

}
