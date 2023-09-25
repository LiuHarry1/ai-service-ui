import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  selectedFile: File | null = null;
  successMessage: string = '';

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.http.post('http://localhost:2020/admin/upload', formData).subscribe(
        (response) => {
          console.log('File uploaded successfully', response);
          this.successMessage = 'File uploaded successfully';
        },
        (error) => {
          console.error('Upload error', error);
        }
      );
    }
  }

  downloadFile() {
    this.http.get('http://localhost:2020/admin/download', { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'knowledge_base.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
