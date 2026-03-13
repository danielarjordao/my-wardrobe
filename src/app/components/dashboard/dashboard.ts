import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WardrobeService } from '../../services/wardrobe';
import { ClothingItem } from '../../models/clothing-item';
import { ItemCard } from '../../resources/item-card/item-card';
import { KpiCard } from '../../resources/kpi-card/kpi-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ItemCard, KpiCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private wardrobeService = inject(WardrobeService);

  // KPI variables
  totalItems = 0;
  totalValue = 0;
  itemsInLaundry = 0;

  // Highlight variable
  mostValue: ClothingItem | null = null;
  mostRecent: ClothingItem | null = null;
  oldest: ClothingItem | null = null;

  /* Inserted by Angular inject() migration for backwards compatibility */
  /*
  constructor(...args: unknown[]);

  // Inject the service and run calculations immediately
  constructor() {
    this.calculateKPIs();
  }
  */

  ngOnInit(): void {
    this.calculateKPIs();
  }

  // Method to calculate all KPIs and set the latest item
  calculateKPIs(): void {
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
    this.oldest = this.wardrobeService.getOldestItem();
  }
}
