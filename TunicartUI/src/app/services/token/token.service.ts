import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private jwtHelper = new JwtHelperService();
  private userFullNameSubject = new BehaviorSubject<string>(this.userFullName);

  set accessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') as string;
  }

  set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') as string;
  }

  clearAccessTokens() {
    this.accessToken = '';
    localStorage.removeItem('accessToken');
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('hasReloaded');
  }

  isTokenValid(): boolean {
    const token = this.accessToken;
    if (!token) {
      console.log('No token found.');
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);
    console.log('Token:', token);
    console.log('Is Expired:', isExpired);
    return !isExpired;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  get userRoles(): string[] {
    const token = this.accessToken;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.authorities || [];
    }
    return [];
  }

  get userFullName$() {
    return this.userFullNameSubject.asObservable();
  }

  get userFullName(): string {
    const token = this.accessToken;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.fullName || '';
    }
    return '';
  }

  get userEmail(): string {
    const token = this.accessToken;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.sub || '';
    }
    return '';
  }
}
