import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-ner-ui',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.css']
})
export class NerComponent implements OnInit {
  text: string = '';
  results: { label: string; text: string }[] = [];

  showResults: boolean = false;


  constructor( private http: HttpClient) { }

  ngOnInit(): void {
  }

  processNER() {


    this.http.post<any>('http://localhost:2020/ner',{"text":this.text}, {  responseType: "json"}).subscribe(
      (response) => {
        console.info(response);
        this.results = response;
        console.info('ddd:'+this.results);

      },
      (error) => {
        console.error('获取数据时出错：', error);
      }

    );

    this.showResults = true;

  }
}
