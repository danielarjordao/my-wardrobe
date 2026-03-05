import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Outfit } from '../../models/outfit';
import { ClothingItem } from '../../models/clothing-item';

@Component({
  selector: 'app-outfit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outfit-card.html',
  styleUrl: './outfit-card.css',
})
export class OutfitCard {
  @Input({ required: true }) outfit!: Outfit;
  @Input({ required: true }) allItems: ClothingItem[] = [];
  @Output() deleteClick = new EventEmitter<string>();

  // Filtra as peças de roupa para este cartão específico
  get outfitItems(): ClothingItem[] {
    return this.allItems.filter(item => this.outfit.itemIds.includes(item.id));
  }

  // Emite o evento para o Pai apagar o look
  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteClick.emit(this.outfit.id);
  }
}
