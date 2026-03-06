import { Injectable } from '@angular/core';
import { ClothingItem } from '../models/clothing-item';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})

export class WardrobeService {
  // Key used to store data in the browser's LocalStorage
  private storageKey: string = 'my_wardrobe_data';

  constructor(private storage: StorageService) {}

  // --- Core CRUD Operations ---

  // Read: Get all items
  getAllItems(): ClothingItem[] {
    return this.storage.getAllItems<ClothingItem>(this.storageKey);
  }

  // Read: Get a single item by ID
  getItemById(id: string): ClothingItem | undefined {
    return this.storage.getItemById<ClothingItem>(id, this.storageKey);
  }

  // Create: Add a new item
  addItem(item: ClothingItem): void {
    let newItem: ClothingItem = { ...item };
    newItem.id = Date.now().toString();
    newItem.createdAt = new Date();
    this.storage.addItem<ClothingItem>(newItem, this.storageKey);
  }

  // Update: Modify an existing item
  updateItem(updatedItem: ClothingItem): void {
    this.storage.updateItem<ClothingItem>(updatedItem, this.storageKey);
  }

  // Delete: Remove an item
  deleteItem(id: string): void {
    this.storage.deleteItem<ClothingItem>(id, this.storageKey);
  }

  // -- Additional Utility Methods for Dashboard KPIs and Highlights --

  // Get total number of items
  getTotalItems(): number {
    return this.getAllItems().length;
  }

  // Get total value of all items
  getTotalValue(): number {
    return this.getAllItems().reduce((sum, item) => sum + item.price, 0);
  }

  // Get count of items in laundry
  getItemsInLaundry(): number {
    return this.getAllItems().filter(item => item.status === 'In Laundry').length;
  }

  // Get the most valuable item
  getMostValuableItem(): ClothingItem | null {
    const sorted = this.getAllItems().sort((a, b) => b.price - a.price);
    return sorted[0] ?? null;
  }

  // Get the most recently added item
  getMostRecentItem(): ClothingItem | null {
    const sorted = this.getAllItems().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return sorted[0] ?? null;
  }

  // Get the oldest item
  getOldestItem(): ClothingItem | null {
    const sorted = this.getAllItems().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return sorted[0] ?? null;
  }

}
