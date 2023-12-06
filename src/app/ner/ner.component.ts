import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { host } from '../app-config';
@Component({
  selector: 'app-ner-ui',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.css']
})
export class NerComponent implements OnInit {
  text: string = '';
  results: { label: string; text: string }[] = [];

  showResults: boolean = false;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  processNER() {

    this.http.post<any>(host+'/ner',{"text":this.text}, {  responseType: "json"}).subscribe(
      (response) => {
        console.info(response);
        this.results = response;
        console.info('ddd:'+this.results);

      },
      (error) => {
        console.error('An error while retrieving data：', error);
      }

    );

    this.showResults = true;

  }
}
