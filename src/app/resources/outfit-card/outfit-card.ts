import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Outfit } from '../../models/outfit';
import { ClothingItem } from '../../models/clothing-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-outfit-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './outfit-card.html',
  styleUrl: './outfit-card.css',
})
export class OutfitCard {
  @Input({ required: true }) outfit!: Outfit;
  @Input({ required: true }) allItems: ClothingItem[] = [];
  @Output() deleteClick = new EventEmitter<string>();
  @Output() cardClick = new EventEmitter<Outfit>();

  // Filter the clothing items to get only those that are part of the outfit
  get outfitItems(): ClothingItem[] {
    return this.allItems.filter(item => this.outfit.itemIds.includes(item.id));
  }

  onCardClick(): void {
    this.cardClick.emit(this.outfit);
  }

  // Emit the delete event when the delete button is clicked
  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteClick.emit(this.outfit.id);
  }
}
