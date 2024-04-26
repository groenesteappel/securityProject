import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  filterItems(
    items: any[],
    searchTerm: string,
    fields: string[],
    startDate: Date | null = null,
    endDate: Date | null = null
  ): { results: any[]; isEmpty: boolean } {
    let filtered = items;

    // Text search
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        fields.some(
          (field) =>
            item[field] &&
            item[field].toLowerCase().includes(lowerCaseSearchTerm)
        )
      );
    }

    // Date range filter
    if (startDate || endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.pubDate);
        return (
          (!startDate || itemDate >= startDate) &&
          (!endDate || itemDate <= endDate)
        );
      });
    }

    return { results: filtered, isEmpty: filtered.length === 0 };
  }
}
