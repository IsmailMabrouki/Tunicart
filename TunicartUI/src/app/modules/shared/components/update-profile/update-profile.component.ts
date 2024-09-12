import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService, ProfileService } from '../../../../services/services';
import { Router } from '@angular/router';
import { ProfileUpdateRequest, User } from '../../../../services/models';
import { catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  userForm!: FormGroup;
  imageUploadForm: FormGroup | undefined;
  userId: string | undefined;
  loading: boolean | undefined;
  selectedFile: File | null = null;
  user: any | undefined | null;
  private apiUrl = 'http://localhost:8088/api/v1/image/user/upload';
  profileImageUrl: string | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private imageService: ImageService,
    private http: HttpClient
  ) {
    // Initialize imageUploadForm for image upload
 
 
    
  }

  ngOnInit(): void {
    const id = localStorage.getItem('id') as string;
    this.userId = id === null ? undefined : id;
    console.log('userId', this.userId);
    if (this.userId) {
      const numericUserId = parseInt(this.userId, 10); // Convertir la chaîne de caractères en nombre base 10

      this.getProfile(numericUserId);
    }
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    } else {
      this.selectedFile = null;
    }
  }


  
  uploadProfileImage(): void {
    console.log('clicked upload method');
    if (this.selectedFile && this.userId) {
      const formData = new FormData();
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
      const httpOptions = {
        headers: new HttpHeaders({        
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data' 
        })
      };
  
      this.http.post(`${this.apiUrl}/${this.userId}`, formData, httpOptions).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully', response);
          alert('Image uploaded successfully');
          window.location.reload();

          
        },
        error: (err) => {
          console.error('Error uploading image:', err);
        }
      });
    } else {
      console.error('No file selected or user ID is missing');
    }
  }
  
  
  
  
  


 
  cancelUpdate(): void {
    const userId = this.user?.id;
    this.router.navigate(['/profile', userId]);
  }

  initializeForm(user: any): void {
    const userData = user.data || {}; // Handle cases where data might be undefined
  
    this.userForm = this.fb.group({
      firstName: [userData.firstName || '', Validators.required],
      lastName: [userData.lastName || '', Validators.required],
      dateOfBirth: [userData.dateOfBirth || '', Validators.required],
      email: [userData.email || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  
    console.log('Form Initialized:', this.userForm.value); // Debug log
    console.log(this.userForm.status); // Should be 'VALID' or 'INVALID'
    console.log('User in form init :', userData); // Debug log
  }
  
  
  getProfile(userId: number): void {
    this.profileService.getProfile({ userId })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user details:', error);
          this.loading = false;
          return of(null); // Return a fallback value or an empty observable
        })
      )
      .subscribe({
        next: (profile) => {
          this.user = profile; // Extract the user details from the response
          this.loading = false;
          if (this.user) {
            this.initializeForm(this.user);
            
            
          }
          console.log('user profile: ', this.user);
        },
      });
  }

 
  

  updateProfile(): void {
    console.log('clicked update method');
    if (this.userForm && this.userForm.valid) {
      console.log(this.userForm.status); // Should be 'VALID' or 'INVALID'
      
      // Log form values for debugging
      console.log('Form Values:', this.userForm.value);
  
      const updatedUser: ProfileUpdateRequest = this.userForm.value;
      console.log('updated user request', updatedUser);
      const userId = this.user.data.id; // Ensure userId is a number
      console.log('userId : update', userId);
  
      if (userId !== undefined) {
        this.profileService.updateProfile$Response({ userId, body: updatedUser }).subscribe({
          next: (response) => {
            // Handle successful update
            console.log('Profile updated successfully', response.body);
            alert('Profile updated successfully');
            this.router.navigate(['/profile', userId]); // Redirect or take other actions
          },
          error: (err) => {
            console.error('Error updating profile', err);
            // Handle error
          }
        });
      }
    } else {
      console.error('Form is invalid');
      
      // Log errors for debugging
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        if (control) {
          console.log(`${key} errors:`, control.errors);
        }
      });
    }
  }
  
}
