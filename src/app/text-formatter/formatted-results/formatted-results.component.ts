// formatted-results.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { prompt_engineering_host } from '../../app-config';

@Component({
  selector: 'app-formatted-results',
  templateUrl: './formatted-results.component.html',
  styleUrls: ['./formatted-results.component.css']
})
export class FormattedResultsComponent implements OnInit {
  formattedResults: any[] = [];
  selectedFileName: string = '';
  fileContent: string = '';

  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  ngOnInit() {
    this.refreshResults();
  }

  refreshResults() {
    this.http.post<any[]>(prompt_engineering_host+'/text/formatted_results', {}).subscribe(results => {
      this.formattedResults = results;
    });
  }

  openFileContent(filename: string) {
    this.selectedFileName = filename
    this.router.navigate(['/text-formatter/text-comparison', filename]);

  }
}
