import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Required for navigation
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // Import RouterLink to use routerLink="" in HTML
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class Navbar {
  private authService = inject(AuthService);

  get currentUsername(): string {
    return this.authService.getCurrentUser()?.username || 'Guest';
  }
}
