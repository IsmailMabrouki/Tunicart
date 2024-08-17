import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {RegistrationRequest} from '../../services/models/registration-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {
    email: '', firstname: '', lastname: '', password: '', role: '', dateOfBirth: ''
  };  // role: ''
  errorMsg: String[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    console.log("Before Submit:", this.registerRequest);
    // Your registration logic
    this.authService.register({
      body: this.registerRequest
    })
    .subscribe({
      next: () => {
        console.log("After Submit:", this.registerRequest);
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        console.log("Error login @Ismail :", err);
        const errorMessage = err.error?.businessErrorDescription || err.error?.error?.message || err.error?.errorMsg || 'An unexpected error occurred.';
        this.errorMsg.push(errorMessage);
      }
    });
  }
  
}
