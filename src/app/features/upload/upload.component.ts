import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, WebcamModule, HttpClientModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | null = null;
  capturedImage: string | null = null;
  
  // Flag to indicate loading status.
  isLoading: boolean = false;
  
  // Stores the analysis result (returned from your API).
  analysisResult: any = null; 

  constructor(private http: HttpClient) {}

  // Handle file selection from gallery/folders.
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Mock function for camera capture.
  onCaptureCameraImage() {
    // Replace with actual camera integration when ready.
    this.capturedImage = 'assets/mock-captured-image.png';
  }

  // Trigger the upload to your Web API.
  onUpload() {
    if (!this.selectedFile && !this.capturedImage) {
      alert('Please select an image or capture a photo first!');
      return;
    }
    
    // Begin the upload - show loading indicator.
    this.isLoading = true;
    this.analysisResult = null; // Clear any old result.

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      this.http.post('https://localhost:7139/api/image/upload', formData)
        .subscribe({
          next: (response: any) => {
            console.log('File uploaded successfully:', response);
            // Assume your API returns an object containing analysis result under a property (e.g., "Analysis").
            // Adjust based on your actual response.
            this.analysisResult = response; 
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error during file upload:', error);
            this.isLoading = false;
          }
        });
    } else if (this.capturedImage) {
      // Fetch the captured image as a Blob then upload it.
      fetch(this.capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const formData = new FormData();
          formData.append('file', blob, 'captured-image.png');

          this.http.post('https://localhost:7139/api/image/upload', formData)
            .subscribe({
              next: (response: any) => {
                console.log('Captured image uploaded successfully:', response);
                this.analysisResult = response;
                this.isLoading = false;
              },
              error: (error) => {
                console.error('Error uploading captured image:', error);
                this.isLoading = false;
              }
            });
        })
        .catch(error => {
          console.error('Error converting captured image to Blob:', error);
          this.isLoading = false;
        });
    }
  }
}