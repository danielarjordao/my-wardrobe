import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);

  // Show as a Guest while is checking
  currentUsername = 'Guest';

  async ngOnInit() {
    // Subscribe to auth state changes to update the username in the navbar
    this.authService.authState$.subscribe((name) => {
      this.currentUsername = name;
    });
    // Check the initial auth state when the navbar loads
    await this.authService.notifyAuthState();
  }
}
