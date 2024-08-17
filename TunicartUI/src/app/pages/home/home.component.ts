import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  hasReloaded : boolean = false;
  isAuthenticated: boolean = false;
  username :string = '';

constructor(
  private tokenService : TokenService
){}

  ngOnInit(): void {
    this.isAuthenticated = this.tokenService.isTokenValid();
    console.log('Is Authenticated:', this.isAuthenticated);
    if (this.isAuthenticated) {
      this.tokenService.userFullName$.subscribe(fullName => {
        this.username = fullName;
      });
      if (localStorage.getItem('hasReloaded') === 'true') {
        // Page has already been reloaded
        this.hasReloaded = true;
      } else {
        // Set the flag and reload the page
        localStorage.setItem('hasReloaded', 'true');
        window.location.reload();
      }
      
    }
     // Alternatively, you can use localStorage to track reload status across sessions
   
  }
  

}
