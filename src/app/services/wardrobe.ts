// src/app/services/wardrobe.ts
import { Injectable } from '@angular/core';
import { ClothingItem } from '../models/clothing-item';

@Injectable({
  providedIn: 'root'
})

export class WardrobeService {
  // Key used to store data in the browser's LocalStorage
  private storageKey: string = 'my_wardrobe_data';

  // Dynamic lists for the form dropdowns and UI filters
  availableCategories: string[] = ['Tops', 'Bottoms', 'Jackets', 'Shoes', 'Accessories'];
  availableStatuses: string[] = ['Available', 'In Laundry', 'Packed'];
  availableColors: string[] = ['Black', 'White', 'Blue', 'Red', 'Multicolor'];
  availableBrands: string[] = ['Nike', 'Adidas', 'Zara'];

  // On service initialization, ensure there's at least one item in storage for the dashboard to display
  constructor() {
    if (typeof localStorage === 'undefined') {
      return;
    }
    // If no items exist, seed with a default item
    if (!this.getAllItems().length) {
      this.seedInitialData();
    }
  }

  // --- Core CRUD Operations ---

  // Read: Get all items
  getAllItems(): ClothingItem[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const data: string | null = localStorage.getItem(this.storageKey);
    // If data exists, parse it; otherwise, return an empty array
    return data ? JSON.parse(data) : [];
  }

  // Read: Get a single item by ID
  getItemById(id: string): ClothingItem | undefined {
    // Find and return the item with the matching ID, or undefined if not found
    return this.getAllItems().find(item => item.id === id);
  }

  // Create: Add a new item
  addItem(item: ClothingItem): void {
    const items: ClothingItem[] = this.getAllItems();
    // Generate a simple unique ID and set the creation date
    item.id = Date.now().toString();
    item.createdAt = new Date();
    items.push(item);
    this.saveToStorage(items);
  }

  // Update: Modify an existing item
  updateItem(updatedItem: ClothingItem): void {
    const items: ClothingItem[] = this.getAllItems();
    // Find the index of the item to update and replace it with the updated version
    const index: number = items.findIndex(item => item.id === updatedItem.id);
   // If the item exists, update it; otherwise, do nothing
    if (index !== -1) {
      items[index] = updatedItem;
      this.saveToStorage(items);
    }
  }

  // Delete: Remove an item
  deleteItem(id: string): void {
    // Filter out the item with the specified ID and save the updated list back to storage
    const items: ClothingItem[] = this.getAllItems().filter(item => item.id !== id);
    this.saveToStorage(items);
  }

  // --- Helper Methods ---

  // Save the array back to LocalStorage securely
  private saveToStorage(items: ClothingItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  // Inject 1 test item just so the dashboard isn't completely empty at first
  private seedInitialData(): void {
    const dummyItem: ClothingItem = {
      id: '123456789',
      createdAt: new Date(),
      name: 'Blazer with pattern',
      category: 'Jackets',
      color: 'Multicolor',
      brand: 'Zara',
      price: 85.00,
      imageUrl: 'https://static.zara.net/assets/public/1bc5/9290/f55f4a25bb72/4d1556db3a02/02036641031-e1/02036641031-e1.jpg?ts=1770912338700&w=579',
      status: 'Available',
      notes: 'It has a stain on the left sleeve, take to the laundry.'
    };
    this.saveToStorage([dummyItem]);
  }
}
