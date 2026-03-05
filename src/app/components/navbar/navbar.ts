import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Required for navigation

@Component({
  selector: 'app-navbar',
  standalone: true,
  // Import RouterLink to use routerLink="" in HTML
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class Navbar {
}
