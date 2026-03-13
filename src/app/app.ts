import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Import the navbar component
import { Navbar } from './resources/navbar/navbar';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  // Add NavbarComponent to the imports array
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'My Wardrobe';

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    const response = await fetch(environment.apiUrl + '/users');
    const users = await response.json();

    console.log(users);
  }

}

