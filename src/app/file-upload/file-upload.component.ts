// src/app/file-upload/file-upload.component.ts
import { Component } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFiles?: FileList;
  message = '';

  constructor(private http: HttpClient) {}

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      const formData1: FormData = new FormData();
      let sourceSystemId = "11"

      formData1.append('sourceSystemId', sourceSystemId);
      formData1.append('file[]', "file1");

      this.http.post("http://localhost:8088/aspen/gateway/eureka-client/test2", formData1).subscribe(
        (response: any) => {
          console.info("response" + response)
          this.message = response;
        },
        (error) => {
          console.log(error);
          this.message = 'Could not upload the files!';
        }
      );


      const formData: FormData = new FormData();

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('file[]', this.selectedFiles[i], this.selectedFiles[i].name);

      }

      // formData.append('sourceSystemId', sourceSystemId);
      // this.http.post("http://localhost:8088/aspen/gateway/eureka-client/upload2", formData).subscribe(
      //   (response: any) => {
      //     console.info("response" + response)
      //     this.message = response;
      //   },
      //   (error) => {
      //     console.log(error);
      //     this.message = 'Could not upload the files!';
      //   }
      // );
    }
  }
}
