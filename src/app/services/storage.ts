import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  // Utility method to check if the localStorage API is available
  private get isBrowser(): boolean {
    return typeof localStorage !== 'undefined';
  }

  // Save the array back to LocalStorage securely
  private saveToStorage<T>(items: T[], storageKey: string): void {
    if (this.isBrowser) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }

  // Read: Get all items from a specific storage key
  getAllItems<T>(storageKey: string): T[] {
    if (this.isBrowser) {
      const data: string | null = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  // Read: Get a single item by ID from a specific storage key
  // Note: extending T with { id: string } ensures that the item has an 'id' property for lookup
  getItemById<T extends { id: string }>(id: string, storageKey: string): T | undefined {
    return this.getAllItems<T>(storageKey).find(item => item.id === id);
  }

  // Create: Add a new item to a specific storage key
  addItem<T>(item: T, storageKey: string): void {
    const items = this.getAllItems<T>(storageKey);
    items.unshift(item); // Add new item to the beginning of the array
    this.saveToStorage<T>(items, storageKey);
  }

  // Update: Modify an existing item in a specific storage key
  updateItem<T extends { id: string }>(updatedItem: T, storageKey: string): void {
    const items = this.getAllItems<T>(storageKey);
    const index: number = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      this.saveToStorage<T>(items, storageKey);
    }
  }

  // Delete: Remove an item from a specific storage key
  deleteItem<T extends { id: string }>(id: string, storageKey: string): void {
    const items = this.getAllItems<T>(storageKey).filter(item => item.id !== id);
    this.saveToStorage<T>(items, storageKey);
  }
}
