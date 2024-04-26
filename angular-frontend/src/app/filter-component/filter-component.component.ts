import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RssFeedService } from '../rss-feed.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class FilterComponent {
  searchTerm: string = '';
  loading: boolean = false; // Declare the loading variable

  @Output() filteredItems = new EventEmitter<any[]>();

  constructor(private rssFeedService: RssFeedService) {}

  filterItems(): void {
    this.loading = true; // Set loading to true when the filtering starts
    this.rssFeedService.fetchAllFeeds().subscribe((items) => {
      const filteredItems = items.filter((item) =>
        item.content.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredItems.emit(filteredItems);
      this.loading = false; // Set loading to false once the data is filtered and emitted
    });
  }
}
