import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NerService {

  constructor() { }

  processNER(text: string): Observable<any> {
    // Here, you would normally send an HTTP POST request to the backend API
    // with the provided 'text' to get the NER results.
    // For this example, we'll return mock data instead.

    const mockData = [
      { label: 'Person', text: 'John Doe' },
      { label: 'Location', text: 'New York' },
      { label: 'Organization', text: 'OpenAI' }
    ];

    return of(mockData);
  }
}
