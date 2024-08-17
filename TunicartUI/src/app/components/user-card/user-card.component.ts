import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../services/models';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {

  @Input() user: User | undefined;
  userID: number  = -1 ;

  profileImageUrl: any;
  private baseUrl = 'http://localhost:8088/api/v1/image/user/get/';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ){}

  ngOnInit(): void {
    if (this.user) {
      this.userID = this.user.id ?? -1;  // Use the nullish coalescing operator to provide a default value
      if (this.userID !== -1) {
        this.getImage(this.userID);
      }
    }
  }
  getImage(userId: number): void {
    this.getImageByIdUser({ idUser: userId }).subscribe({
      next: (data: Blob) => {
        // Create a URL for the Blob and assign it to profileImageUrl
        this.profileImageUrl = URL.createObjectURL(data);
      },
      error: (err: any) => {
        console.error('Error fetching image:', err);
      }
    });
  }

  getImageByIdUser(params: { idUser: number }): Observable<Blob> {
    return this.http.get(`${this.baseUrl}${params.idUser}`, { responseType: 'blob' });
  }

  viewDetails() {
    this.router.navigate(['profile', this.userID]);
    console.log( this.route.snapshot.paramMap.get('id'))
  }
}
