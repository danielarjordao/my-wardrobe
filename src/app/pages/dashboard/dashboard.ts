import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf and currency pipe
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Required for navigation

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})

export class Dashboard {
  // KPI variables
  totalItems: number = 0;
  totalValue: number = 0;
  itemsInLaundry: number = 0;

  // Highlight variable
  mostValue: ClothingItem | null = null;

  // Inject the service and run calculations immediately
  constructor(private wardrobeService: WardrobeService) {
    this.calculateKPIs();
  }

  // Method to calculate all KPIs and set the latest item
  calculateKPIs(): void {
    const items: ClothingItem[] = this.wardrobeService.getAllItems();

    // KPI 1: Total items
    this.totalItems = items.length;

    // KPI 2: Total value (Sum of prices)
    this.totalValue = items.reduce((sum, item) => sum + item.price, 0);

    // KPI 3: Items in laundry
    this.itemsInLaundry = items.filter(item => item.status === 'In Laundry').length;

    // Highlight: Most valuable item (highest price)
    if (items.length > 0) {
      const sortedItems: ClothingItem[] = items.sort((a, b) =>
        b.price - a.price
      );
      this.mostValue = sortedItems[0];
    }
  }
}
