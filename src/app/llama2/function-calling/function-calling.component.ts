import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpClient and HttpErrorResponse
import { catchError } from 'rxjs/operators'; // Import catchError
import { throwError } from 'rxjs'; // Import throwError
import {prompt_engineering_host} from "../../app-config";

@Component({
  selector: 'app-chatbot',
  templateUrl: './function-calling.component.html',
  styleUrls: ['./function-calling.component.css']
})
export class FunctionCallingComponent {
  functionDefinition: string = '';
  selectedModel: string = 'llama3'; // Default selection
  response: any;

  constructor(private http: HttpClient) {} // Inject HttpClient

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  submitFunctionDefinition() {
    try {
      const jsonData = JSON.parse(this.functionDefinition);

      // Prepare request data
      const requestData = {
        model: this.selectedModel,
        data: jsonData,
      };

      // Use HttpClient to send the request
      this.http
        .post('http://localhost:5000/llama/call', requestData)
        .pipe(catchError(this.handleError)) // Catch errors
        .subscribe(
          (res) => {
            this.response = res;
          },
          (error) => {
            this.response = { error: error };
          }
        );
    } catch (error) {
      this.response = { error: 'Invalid JSON format or server error.' };
    }
  }


}

