import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../../services/token/token.service';
import { Image, Item, User } from '../../../../services/models';
import { ImageService, ProfileService, PublicService, SellerService } from '../../../../services/services';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  authId: string | null = "";
  userId: string | undefined;
  loading: boolean | undefined;
  user: User | undefined | null;
  profileImageUrl: any;
  image : Image | undefined;
  private baseUrl = 'http://localhost:8088/api/v1/image/user/get/';

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private ProfileService: ProfileService,
    private ImageService : ImageService,
    private sellerService: SellerService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authId = localStorage.getItem('id') ;
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id === null ? undefined : id;
    console.log('userId', this.userId);
    if (this.userId) {
      const numericUserId = parseInt(this.userId, 10); // Convertir la chaîne de caractères en nombre base 10

      this.getProfile(numericUserId);
      
      this.getImage(numericUserId);
    
    }
  }
  
  isUserProfile(): boolean {
    if (this.authId === this.userId) {
      return true;
      } else
      return false;
  }

  hasRole(role: string): boolean {
    console.log(
      'role:',
      this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase()
    );
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  }

  getRole(): string {
    console.log(
      'role:',
      this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase()
    );
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase(); // Replace with your logic to get user role
  }

  navigateToUpdateProfile() {
    this.router.navigate(['update-profile'])
    }

  
    getImage(userId: number): void {
      this.getImageByIdUser({ idUser: userId }).subscribe({
        next: (data: Blob) => {
          // Create a URL for the Blob and assign it to profileImageUrl
          this.profileImageUrl = URL.createObjectURL(data);
        },
        error: (err) => {
          console.error('Error fetching image:', err);
        }
      });
    }

    getImageByIdUser(params: { idUser: number }): Observable<Blob> {
      return this.http.get(`${this.baseUrl}${params.idUser}`, { responseType: 'blob' });
    }
    
    // private convertBase64ToBlobUrl(base64: string): string {
    //   // Extract the MIME type and Base64 string
    //   const [header, base64String] = base64.split(',');
    //   const mime = header.split(':')[1].split(';')[0];
  
    //   // Decode Base64 string
    //   const binaryString = window.atob(base64String);
    //   const arrayBuffer = new ArrayBuffer(binaryString.length);
    //   const uint8Array = new Uint8Array(arrayBuffer);
    //   for (let i = 0; i < binaryString.length; i++) {
    //     uint8Array[i] = binaryString.charCodeAt(i);
    //   }
  
    //   // Create Blob and URL
    //   const blob = new Blob([uint8Array], { type: mime });
    //   return URL.createObjectURL(blob);
    // }
    

  getProfile(userId: number): void {
    this.ProfileService.getProfile({ userId })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user details:', error);
          this.loading = false;
          return of(null); // Return a fallback value or an empty observable
        })
      )
      .subscribe({
        next: (profile) => {
          this.user = profile?.data; // Extract the user details from the response
          this.loading = false;
          console.log('user profile: ', this.user);
        },
      });
  }



}
