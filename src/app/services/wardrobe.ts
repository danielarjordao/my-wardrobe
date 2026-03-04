// src/app/services/wardrobe.ts
import { Injectable } from '@angular/core';
import { ClothingItem } from '../models/clothing-item';
import { Outfit } from '../models/outfit';

@Injectable({
  providedIn: 'root'
})

export class WardrobeService {
  // Key used to store data in the browser's LocalStorage
  private storageKey: string = 'my_wardrobe_data';

  // Dynamic lists for the form dropdowns and UI filters
  availableCategories: string[] = ['Tops', 'Bottoms', 'Outerwear', 'One-Pieces', 'Shoes', 'Accessories'];
  availableStatuses: string[] = ['Available', 'In Laundry', 'Packed'];
  availableColors: string[] = ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Purple', 'Pink', 'Brown', 'Gray', 'Multicolor', 'Other'];
  sortOptions: string[] = ['Newest', 'Oldest', 'Price: Low to High', 'Price: High to Low'];

  // On service initialization, ensure there's at least one item in storage for the dashboard to display
  constructor() {
    if (typeof localStorage === 'undefined') {
      return;
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

  // --- LÓGICA DOS OUTFITS / LOOKS ---

  private outfitsStorageKey = 'my_outfits_data';

  // Ler: Obter todos os looks
  getOutfits(): Outfit[] {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(this.outfitsStorageKey);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  // Criar: Guardar um look novo
  addOutfit(name: string, itemIds: string[]): void {
    const outfits: Outfit[] = this.getOutfits();
    const newOutfit: Outfit = {
      id: Date.now().toString(),
      name: name,
      itemIds: itemIds,
    };

    outfits.push(newOutfit);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.outfitsStorageKey, JSON.stringify(outfits));
    }
  }

  // Apagar: Remover um look
  deleteOutfit(id: string): void {
    const outfits: Outfit[] = this.getOutfits().filter((o: any) => o.id !== id);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.outfitsStorageKey, JSON.stringify(outfits));
    }
  }

}
