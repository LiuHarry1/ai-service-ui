import { Component } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { host } from '../app-config';
@Component({
  selector: 'app-similarity',
  templateUrl: './sentence-similarity.component.html',
  styleUrls: ['./sentence-similarity.component.css'],
})
export class SentenceSimilarityComponent {
  sourceSentence: string = '';
  sentencesToCompare: string[] = [''];

  sentencesToCompare1: string[] = [''];

  isLoading: boolean = false;
  showResults: boolean = false;
  similarityResults: { sentence: string; score: number }[] = [];

  modelName: string = ''

  modelOptions: any[] = [
    { label: 'tf idf', value: 'tf_idf_model' },
    { label: 'word2vector', value: 'word2vector_model' },
   /* { label: 'UniversalSentenceEncoder', value: 'UniversalSentenceEncoder_Model' },*/
    { label: 'HF_MiniM_Model', value: 'HF_MiniM_Model' },

    // Add more models as needed
  ];


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.modelName = params['model'];
    });

  /*  this.modelName = "tf_idf_model"*/

    console.info("modelname:"+this.modelName)

  }

  constructor(private http: HttpClient, private route: ActivatedRoute ) {

  }



  computeSimilarity() {
    this.isLoading = true;
    const data = { sourceSentence: this.sourceSentence, sentencesToCompare: this.sentencesToCompare1, 'model': this.modelName };
    this.http.post<any>(host+'/sentence_similarity',data, {  responseType: "json"}).subscribe(
      (response) => {
        console.info(response);
        this.similarityResults = response;
        console.info('ddd:'+this.similarityResults);
        this.isLoading = false; // Hide the loading indicator when the response is received

      },
      (error) => {
        console.error('data retrieval error：', error);
        this.isLoading = false; // Hide the loading indicator when the response is received
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
