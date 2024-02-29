// file-content.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { prompt_engineering_host } from '../app-config';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.css']
})
export class FileContentComponent implements OnInit {
  filename: string = '';
  fileContent: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // Get the filename from route parameters
    this.route.params.subscribe(params => {
      this.filename = params['filename'];
      // Fetch file content using the filename
      this.fetchFileContent();
    });
  }

  fetchFileContent() {
    this.http.post(prompt_engineering_host + `/text/format_result/${this.filename}`, {}).subscribe((content) => {
      console.log('File Content:', content);
      this.fileContent = content.toString();
    });
  }
}
