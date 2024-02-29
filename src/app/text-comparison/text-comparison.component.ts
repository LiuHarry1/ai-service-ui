import { Component } from '@angular/core';
import { DiffMatchPatch } from 'diff-match-patch-ts';


@Component({
  selector: 'app-text-comparison',
  templateUrl: './text-comparison.component.html',
  styleUrls: ['./text-comparison.component.css']
})
export class TextComparisonComponent {
  textA: string = 'Text A';
  textB: string = 'Text B';
  differences: Array<any> = [];

  constructor() {}

  compareText() {
    const dmp = new DiffMatchPatch();
    const textALower = this.textA.toLowerCase();
    const textBLower = this.textB.toLowerCase();
    const diffs = dmp.diff_main(textALower, textBLower);
    this.differences = diffs;
  }
}
