// search.service.ts
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
      const terms = searchTerm
        .toLowerCase()
        .split(',')
        .map((term) => term.trim());
      filtered = filtered.filter((item) =>
        fields.some((field) =>
          terms.some((term) => item[field]?.toLowerCase().includes(term))
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
