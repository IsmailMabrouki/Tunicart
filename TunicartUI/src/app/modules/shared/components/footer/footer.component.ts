import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'] // Fixed typo here
})
export class FooterComponent implements OnInit {
  private footerHeight: number;
  isAuthenticated: boolean = false;
  
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private tokenService: TokenService,
    private el: ElementRef) {
    // Calculate the footer height dynamically
    const footerElement = this.el.nativeElement.querySelector('footer');
    this.footerHeight = footerElement ? footerElement.offsetHeight : 0;
  }
  ngOnInit(): void {
    let auth = this.tokenService.isTokenValid();
     this.isAuthenticated = !auth;
    }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if user has scrolled near the bottom with a small buffer
    if (scrollTop + windowHeight >= documentHeight - this.footerHeight - 10) {
      // Near the bottom
      this.renderer.removeClass(this.el.nativeElement.querySelector('footer'), 'hidden');
    } else {
      // Not at the bottom
      this.renderer.addClass(this.el.nativeElement.querySelector('footer'), 'hidden');
    }
  }

  signup(): void {
    this.router.navigate(['register']);
  }
}