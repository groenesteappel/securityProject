import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../rss-feed.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SearchService } from '../search.service';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-aggregated-feed',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ProgressSpinnerModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    CalendarModule,
    InputSwitchModule,
    MenubarModule,
    MultiSelectModule,
    DropdownModule,
  ],
  templateUrl: './aggregated-feed.component.html',
  styleUrls: ['./aggregated-feed.component.css'], // Corrected here
})
export class AggregatedFeedComponent implements OnInit {
  aggregatedFeedItems: any[] = [];
  filteredItems: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  rangeDates: Date[] | null = null;
  noResultsFound: boolean = false;
  feedUrls: { name: string; url: string; enabled: boolean }[] = [];
  items: MenuItem[] | undefined;
  selectedUrls: { name: string; url: string }[] = [];
  multiSelectOptions: any[] = [];

  constructor(
    private rssFeedService: RssFeedService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.loadAggregatedFeed();
    this.loadFeedUrls();
  }

  loadFeedUrls() {
    this.rssFeedService.listFeedUrls().subscribe({
      next: (feeds) => {
        this.feedUrls = feeds;
        // Filter to include only enabled feeds before mapping to multiSelectOptions
        this.multiSelectOptions = feeds
          .filter((feed) => feed.enabled)
          .map((feed) => ({
            label: feed.name, // The display name for the dropdown
            value: feed.url, // The URL, which is used for filtering
          }));
      },
      error: (error) => {
        console.error('Failed to load feed URLs', error);
      },
    });
  }

  loadAggregatedFeed() {
    this.loading = true;
    this.rssFeedService.fetchAllFeeds().subscribe({
      next: (items) => {
        this.aggregatedFeedItems = items; // Assumes items now have a 'feedName' or 'feedUrl'
        this.filteredItems = items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load aggregated feed', error);
        this.loading = false;
      },
    });
  }

  toggleFeedState(feedItem: any): void {
    const newState = !feedItem.enabled;
    this.rssFeedService.toggleFeedState(feedItem.url, newState).subscribe({
      next: () => {
        feedItem.enabled = newState; // Update the state on the client side after confirmation from the server
        console.log(`Feed state updated for ${feedItem.url}`);
        this.loadAggregatedFeed();
      },
      error: (err) => {
        console.error(`Failed to toggle feed state for ${feedItem.url}`, err);
        // Optionally reset the switch if the server fails to toggle the state
        feedItem.enabled = !newState;
      },
    });
  }

  updateSelectedUrls(selectedOptions: any[]): void {
    this.selectedUrls = selectedOptions.map((option) => option.value);
    this.filterFeedItems(); // Reapply filters
  }

  filterFeedItems() {
    console.log('Starting filter operation...');

    const startDate =
      this.rangeDates && this.rangeDates.length > 0 ? this.rangeDates[0] : null;
    const endDate =
      this.rangeDates && this.rangeDates.length > 1 ? this.rangeDates[1] : null;

    let results = this.searchService.filterItems(
      this.aggregatedFeedItems,
      this.searchTerm,
      ['title', 'description', 'content'],
      startDate,
      endDate
    ).results;

    if (this.selectedUrls && this.selectedUrls.length) {
      console.log('Selected URLs for filtering:', this.selectedUrls);
      results = results.filter((item) =>
        this.selectedUrls.includes(item.feedUrl)
      );
    }

    this.filteredItems = results;
    this.noResultsFound = results.length === 0 && !this.loading;
  }
}
