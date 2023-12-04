import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host } from '../app-config';
@Component({
  selector: 'app-abnormaly-detection',
  templateUrl: './anomaly-detection.component.html',
  styleUrls: ['./anomaly-detection.component.css']
})
export class AnomalyDetectionComponent {
  inputData: any = {}; // Store your input data here
  predictionResult: any;

  modelName: string = 'rfc'

  modelOptions: any[] = [
    { label: 'IsolationForest', value: 'IsolationForest' },
    { label: 'Local Outlier Factor ', value: 'lof' },
  ]

  data: any= [
    { column1: '1.1', column2: 'A', column3: '1'},
    { column1: '0.3', column2: 'B', column3: '2'},
    { column1: '0.5', column2: 'C', column3: '3'},
    { column1: '-1.5', column2: 'C', column3: '4'},
    { column1: '-3.5', column2: 'C', column3: '5'},
    { column1: '4.5', column2: 'A', column3: '6'},
    { column1: '10.5', column2: 'B', column3: '7'},
    { column1: '25.2', column2: 'C', column3: '19'},
    { column1: '20.5', column2: 'C', column3: '9'},
    { column1: '100', column2: 'C', column3: '4'},

    // Add more examples with categories as needed
  ];

  constructor(private http: HttpClient) { }

  predictAnomaly() {
    const apiUrl = host+'/anomaly-detection/predict'; // Replace with your backend URL
    this.http.post<any>(apiUrl, this.inputData)
      .subscribe(result => {
        console.info(result)
        this.predictionResult = result.predictionResult;
        console.info( result.predictionResult)
        // Handle the prediction result as needed
      }, error => {
        console.error('Error occurred:', error);
      });
  }
}
