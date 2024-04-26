import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RssFeedService } from '../rss-feed.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-filter',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css'],
  standalone: true, // Add standalone flag
  imports: [FormsModule,CommonModule]
})
export class FilterComponent {
  searchTerm: string = '';

  @Output() filteredItems = new EventEmitter<any[]>();

  constructor(private rssFeedService: RssFeedService) {}

  
  filterItems(): void {
    let firstEmissionSent = false;
    this.rssFeedService.fetchAllFeeds()
      .subscribe(items => {
        if (!firstEmissionSent) {
          const filteredItems = items.filter(item => item.content.toLowerCase().includes(this.searchTerm.toLowerCase()));
          console.log(filteredItems);
          this.filteredItems.emit(filteredItems);
          firstEmissionSent = true;
        }
      });
  }
}
