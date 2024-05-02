import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../rss-feed.service'; // Adjust the path as necessary
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { SearchService } from '../search.service';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-feed-manager',
  templateUrl: './feed-manager.component.html',
  styleUrls: ['./feed-manager.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ProgressSpinnerModule,
    TableModule,
    AccordionModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    CardModule,
    InputSwitchModule,
  ],
})
export class FeedManagerComponent implements OnInit {
  feedUrls: { url: string; enabled: boolean }[] = [];
  newUrl = '';
  searchTerm: string = '';
  fetchedFeed: any = null;
  filteredItems: any[] = [];
  noResultsFound: boolean | undefined;
  loading = false;
  selectedUrl: string | null = null;

  constructor(
    private rssFeedService: RssFeedService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.loadFeedUrls();
  }

  toggleFeed(url: string, newState: boolean): void {
    const feed = this.feedUrls.find((f) => f.url === url);
    if (feed) {
      feed.enabled = newState; // Manually update the model here
      this.rssFeedService.toggleFeedState(url, newState).subscribe({
        next: () => {
          console.log(`State updated successfully for ${url}`);
        },
        error: (err) => console.error(`Failed to toggle state for ${url}`, err),
      });
    }
  }

  loadFeedUrls() {
    this.rssFeedService.listFeedUrls().subscribe({
      next: (feeds) => {
        console.log('Received feeds:', feeds);
        this.feedUrls = feeds;
      },
      error: (error) => console.error('Failed to load feed URLs', error),
    });
  }

  addUrl() {
    if (!this.newUrl) return;
    this.rssFeedService.addFeedUrl('namePlaceholder', this.newUrl).subscribe({
      next: () => {
        this.loadFeedUrls(); // Reload the list after adding
        this.newUrl = ''; // Reset input
      },
      error: (error) => console.error('Failed to add feed URL', error),
    });
  }

  removeUrl(url: string) {
    this.rssFeedService.removeFeedUrl(url).subscribe({
      next: () => this.loadFeedUrls(), // Reload the list after removing
      error: (error) => console.error('Failed to remove feed URL', error),
    });
  }

  fetchFeed(url: string) {
    this.loading = true;
    this.selectedUrl = url;
    this.rssFeedService.fetchFeed(url).subscribe({
      next: (feedData) => {
        this.fetchedFeed = feedData;
        this.filteredItems = feedData.items; // Initialize filteredItems with all items
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch feed', error);
        this.loading = false;
      },
    });
  }
  filterFeedItems() {
    const { results, isEmpty } = this.searchService.filterItems(
      this.fetchedFeed?.items || [],
      this.searchTerm,
      ['title', 'description', 'content']
    );
    this.filteredItems = results;
    this.noResultsFound = isEmpty; // Assuming you have this property defined in your component
  }
}
