import { Component } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-similarity',
  templateUrl: './sentence-similarity.component.html',
  styleUrls: ['./sentence-similarity.component.css'],
})
export class SentenceSimilarityComponent {
  sourceSentence: string = '';
  sentencesToCompare: string[] = [''];

  sentencesToCompare1: string[] = [''];

  showResults: boolean = false;
  similarityResults: { sentence: string; score: number }[] = [];

  constructor(private http: HttpClient) {}



  computeSimilarity() {

    const data = { sourceSentence: this.sourceSentence, sentencesToCompare: this.sentencesToCompare1 };

    this.http.post<any>('http://localhost:2020/sentence_similarity',data, {  responseType: "json"}).subscribe(
      (response) => {
        console.info(response);
        this.similarityResults = response;
        console.info('ddd:'+this.similarityResults);

      },
      (error) => {
        console.error('获取数据时出错：', error);
      }

    );

    // this.similarityResults = [{ 'sentence':'sene1',  score: 0.9 }]

    // this.similarityResults = this.sentencesToCompare.map(sentence => {
    //   return {
    //     sentence,
    //     score: this.calculateSimilarity(this.sourceSentence, sentence),
    //   };
    // });

    this.showResults = true;
  }

  addSentence() {
    // Add the new sentence to the list of sentences to compare
    this.sentencesToCompare.push('');
    this.sentencesToCompare1.push('');
  }
  onSentenceInput(event: any, ind : number) {
    const inputValue = event.target.value;
    // Assuming you have a unique identifier (index) for each sentence, you can use it to update the corresponding sentence in the array.
    const index =ind
    console.info('inputvalue :',inputValue, 'index:', ind)
    // this.sentencesToCompare[index] = inputValue;
    this.sentencesToCompare1[index] = inputValue
  }


}
