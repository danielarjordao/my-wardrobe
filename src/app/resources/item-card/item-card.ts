import { Component, Input } from '@angular/core';
import { ClothingItem } from '../../models/clothing-item';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  // This selector is used to embed this component in other templates.
  // For example, <app-item-card [item]="someItem"></app-item-card>
  selector: 'app-item-card',
  // standalone: true allows this component to be used without being declared in an NgModule.
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})

export class ItemCard {

  // O @Input() allows this component to receive data from its parent component.
  // In this case, it expects a ClothingItem object to display its details.
  @Input({ required: true }) item!: ClothingItem;

  // This method returns a CSS class based on the status of the clothing item.
  getStatusClass(status: string): string {
    switch(status) {
      case 'Available':
        return 'status-green';
      case 'In Laundry':
        return 'status-yellow';
      case 'Packed':
        return 'status-blue';
      case 'Repair':
        return 'status-pink';
      default:
        return 'status-gray';
    }
  }
}
