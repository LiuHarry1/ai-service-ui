import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {host} from "../app-config";

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {
  inputText = '';
  result = '';

  examples = [
    { text: "that's another issue", result: "c'est une autre affaire" },
    { text: "that wasn't my question", result: "ce n'était pas ma question" },
    { text: "we need an answer" , result: "il nous faut une réponse" },
    { text: 'they must be fake ' , result: "ils doivent être faux" },
    // Add more examples as needed
  ];

  constructor(private http: HttpClient) {}

  translate() {
    this.http.post(host+'/translate', { text: this.inputText })
      .subscribe((response: any) => {
        this.result = response.result;
      });
  }

}
