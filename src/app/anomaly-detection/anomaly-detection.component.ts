import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {host} from "../app-config";
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
    const apiUrl =  host+'/anomaly-detection/predict'; // Replace with your backend URL
    this.http.post<any>(apiUrl, this.inputData)
      .subscribe(result => {
        console.info(result)
        this.predictionResult = result.predictionResult;
        // Handle the prediction result as needed
      }, error => {
        console.error('Error occurred:', error);
      });
  }
}
