import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Import the navbar component
import { Navbar } from './resources/navbar/navbar';
import { Modal } from './resources/modal/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  // Add NavbarComponent to the imports array
  imports: [RouterOutlet, Navbar, Modal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'My Wardrobe';
}

const variavelInutil = 'Isto vai falhar o CI';
