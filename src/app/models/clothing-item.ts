// Define the strict structure of a single wardrobe item
export interface ClothingItem {
  id: string;
  createdAt: Date;
  name: string;
  category: string;
  color: string;
  brand: string;
  price: number;
  imageUrl: string;
  status: string;
  notes?: string;
}
