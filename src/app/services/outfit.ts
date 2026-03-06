import { Injectable } from '@angular/core';
import { Outfit } from '../models/outfit';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})

export class OutfitService {
  private outfitsStorageKey = 'my_outfits_data';

  constructor(private storage: StorageService) {}

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
      itemIds: outfitData.itemIds
  };
    this.storage.addItem<Outfit>(newOutfit, this.outfitsStorageKey);
  }

  // Delete: Remove an outfit
  deleteOutfit(id: string): void {
    this.storage.deleteItem<Outfit>(id, this.outfitsStorageKey);
  }

}
