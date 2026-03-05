import { ClothingItem } from '../models/clothing-item';

export interface FilterCriteria {
  searchTerm?: string;
  category?: string;
  status?: string;
  color?: string;
  sortOption?: string;
}

export class FilterUtils {

  static apply(items: ClothingItem[], criteria: FilterCriteria): ClothingItem[] {
    let result = [...items];

    result = FilterUtils.searchFilter(result, criteria.searchTerm || '');

    if (criteria.category)
        result = FilterUtils.selectedFilter(result, 'category', criteria.category);
    if (criteria.status)
        result = FilterUtils.selectedFilter(result, 'status', criteria.status);
    if (criteria.color)
        result = FilterUtils.selectedFilter(result, 'color', criteria.color);

    if (criteria.sortOption) {
      switch (criteria.sortOption) {
        case 'Newest':
          result = FilterUtils.sortNewest(result);
          break;
        case 'Oldest':
          result = FilterUtils.sortOldest(result);
          break;
        case 'Price: Low to High':
          result = FilterUtils.sortPriceLowToHigh(result);
          break;
        case 'Price: High to Low':
          result = FilterUtils.sortPriceHighToLow(result);
          break;
      }
    }

    return result;
  }

  static searchFilter(items: ClothingItem[], term: string): ClothingItem[] {
	if (!term)
		return items;
	const lowerTerm = term.toLowerCase();
	return items.filter(item =>
	  item.name.toLowerCase().includes(lowerTerm) ||
	  (item.brand && item.brand.toLowerCase().includes(lowerTerm))
	);
  }

  static selectedFilter(items: ClothingItem[], definition: keyof ClothingItem, value: string): ClothingItem[] {
	if (!value) return items;
	return items.filter(item => item[definition] === value);
}

  static sortNewest(items: ClothingItem[]): ClothingItem[] {
	return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static sortOldest(items: ClothingItem[]): ClothingItem[] {
	return items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  static sortPriceLowToHigh(items: ClothingItem[]): ClothingItem[] {
	return items.sort((a, b) => (a.price || 0) - (b.price || 0));
  }

  static sortPriceHighToLow(items: ClothingItem[]): ClothingItem[] {
	return items.sort((a, b) => (b.price || 0) - (a.price || 0));
  }
}
