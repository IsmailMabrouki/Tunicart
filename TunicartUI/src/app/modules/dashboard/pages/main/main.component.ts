import { Component } from '@angular/core';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  
  constructor(
  
    private tokenService : TokenService

  ) {}
  hasRole(role: string): boolean {
    console.log(
      'role:',
      this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase()
    );
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  }
}
