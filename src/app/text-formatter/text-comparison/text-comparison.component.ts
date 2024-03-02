import { Component } from '@angular/core';
import { DiffMatchPatch } from 'diff-match-patch-ts';
import {prompt_engineering_host} from "../../app-config";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-text-comparison',
  templateUrl: './text-comparison.component.html',
  styleUrls: ['./text-comparison.component.css']
})
export class TextComparisonComponent {
  textA: string = 'Text A';
  textB: string = 'Text B';
  filename: string = '';
  differences: Array<any> = [];
  formatted_result: any = {'raw_text':"", "formatted_text":""};

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
      this.formatted_result = content;
      this.textA =this.formatted_result.raw_text;
      this.textB = this.formatted_result.formatted_text;
      this.compareText()
    });
  }

  compareText() {
    const dmp = new DiffMatchPatch();
    const textALower = this.textA.toLowerCase();
    const textBLower = this.textB.toLowerCase();
    const diffs = dmp.diff_main(textALower, textBLower);
    this.differences = diffs;
  }
}
