import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent {
  textInput: string = "";
  sentimentResult: string = "";

  constructor(private http: HttpClient) {}

  analyze() {
    // Implement the sentiment analysis logic here
    // You can use a third-party sentiment analysis library or create your own algorithm

    this.http.get('http://localhost:2020/sentiment_analysis?text='+this.textInput, { responseType: 'text'}).subscribe(
      (response) => {
        if (typeof response === "string") {
          this.sentimentResult = response;
        }
      },
      (error) => {
        console.error('获取数据时出错：', error);
      }

    );

    // For this example, assume we have obtained the sentiment result
    // this.sentimentResult = 'Positive';
    // this.sentimentResult = result;
  }
}
