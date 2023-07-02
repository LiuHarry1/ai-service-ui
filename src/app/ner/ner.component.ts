import { Component, OnInit } from '@angular/core';
import { NerService } from '../ner/ner.service';

@Component({
  selector: 'app-ner-ui',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.css']
})
export class NerComponent implements OnInit {
  text: string = '';
  results: any[] = [];

  constructor(private nerService: NerService) { }

  ngOnInit(): void {
  }

  processNER() {
    this.nerService.processNER(this.text)
      .subscribe((response: any) => {
        this.results = response;
      });
  }
}
