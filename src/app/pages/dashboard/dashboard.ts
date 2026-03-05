import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { ItemCard } from '../../components/item-card/item-card';
import { KpiCard } from '../../components/kpi-card/kpi-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ItemCard, KpiCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard {
  // KPI variables
  totalItems: number = 0;
  totalValue: number = 0;
  itemsInLaundry: number = 0;

  // Highlight variable
  mostValue: ClothingItem | null = null;
  mostRecent: ClothingItem | null = null;
  Oldest: ClothingItem | null = null;

  // Inject the service and run calculations immediately
  constructor(private wardrobeService: WardrobeService) {
    this.calculateKPIs();
  }

  // Method to calculate all KPIs and set the latest item
  calculateKPIs(): void {
    const items: ClothingItem[] = this.wardrobeService.getAllItems();

    // KPI 1: Total items
    this.totalItems = this.wardrobeService.getTotalItems();

    // KPI 2: Total value
    this.totalValue = this.wardrobeService.getTotalValue();

    // KPI 3: Items in laundry
    this.itemsInLaundry = this.wardrobeService.getItemsInLaundry();

    // Highlight: Most valuable item
    this.mostValue = this.wardrobeService.getMostValuableItem();

    // Highlight: Most recent item
    this.mostRecent = this.wardrobeService.getMostRecentItem();

    // Highlight: Oldest item
    this.Oldest = this.wardrobeService.getOldestItem();
  }
}
