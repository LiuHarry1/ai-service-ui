import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-abnormaly-detection',
  templateUrl: './anomaly-detection.component.html',
  styleUrls: ['./anomaly-detection.component.css']
})
export class AnomalyDetectionComponent {
  inputData: any = {}; // Store your input data here
  predictionResult: any;

  constructor(private http: HttpClient) { }

  predictAnomaly() {
    const apiUrl = 'http://localhost:5000/predict'; // Replace with your backend URL
    this.http.post<any>(apiUrl, this.inputData)
      .subscribe(result => {
        this.predictionResult = result;
        // Handle the prediction result as needed
      }, error => {
        console.error('Error occurred:', error);
      });
  }
}
