import { Injectable, inject } from '@angular/core';
import { Outfit } from '../models/outfit';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class OutfitService {
  private storage = inject(StorageService);

  private outfitsStorageKey = 'my_outfits_data';

  /** Inserted by Angular inject() migration for backwards compatibility */
  /*
  constructor(...args: unknown[]);

  constructor() {}
  */

  // --- Outfit Crud Operations ---

  // Read: Get all outfits
  getAllOutfits(): Outfit[] {
    return this.storage.getAllItems<Outfit>(this.outfitsStorageKey);
  }

  // Create: Add a new outfit
  addOutfit(outfitData: { name: string; trip: string; itemIds: string[] }): void {
    const newOutfit: Outfit = {
      id: Date.now().toString(),
      name: outfitData.name,
      trip: outfitData.trip,
      itemIds: outfitData.itemIds,
    };
    this.storage.addItem<Outfit>(newOutfit, this.outfitsStorageKey);
  }

  // Update: Edit an existing outfit
  updateOutfit(updatedOutfit: Outfit): void {
    this.storage.updateItem<Outfit>(updatedOutfit, this.outfitsStorageKey);
  }

  // Delete: Remove an outfit
  deleteOutfit(id: string): void {
    this.storage.deleteItem<Outfit>(id, this.outfitsStorageKey);
  }
}
