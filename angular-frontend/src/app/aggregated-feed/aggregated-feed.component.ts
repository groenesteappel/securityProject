// aggregated-feed.component.ts
import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../rss-feed.service';
import { SearchService } from '../search.service';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';

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
    SelectButtonModule,
  ],
  templateUrl: './aggregated-feed.component.html',
  styleUrls: ['./aggregated-feed.component.css'],
})
export class AggregatedFeedComponent implements OnInit {
  aggregatedFeedItems: any[] = [];
  filteredFeedItems: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  dateRange: Date[] | null = null;
  noResults: boolean = false;
  feedUrls: { name: string; url: string; enabled: boolean }[] = [];
  selectedFeedUrls: { name: string; url: string }[] = [];
  multiSelectOptions: any[] = [];
  savedSearchOptions: { label: string; value: string }[] = [
    { label: 'debian', value: 'debian' },
    { label: 'microsoft sql', value: 'microsoft sql' },
  ];
  activeSearchTerms: Set<string> = new Set();
  selectedSavedSearchTerms: string[] = [];

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
        this.multiSelectOptions = feeds
          .filter((feed) => feed.enabled)
          .map((feed) => ({
            label: feed.name,
            value: feed.url,
          }));
      },
      error: (error) => {
        console.error('Failed to load feed URLs', error);
      },
    });
  }

  loadAggregatedFeed() {
    this.isLoading = true;
    this.rssFeedService.fetchAllFeeds().subscribe({
      next: (items) => {
        this.aggregatedFeedItems = items;
        this.filteredFeedItems = items;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load aggregated feed', error);
        this.isLoading = false;
      },
    });
  }

  toggleFeedState(feedItem: any): void {
    const newState = !feedItem.enabled;
    this.rssFeedService.toggleFeedState(feedItem.url, newState).subscribe({
      next: () => {
        feedItem.enabled = newState;
        console.log(`Feed state updated for ${feedItem.url}`);
        this.loadAggregatedFeed();
      },
      error: (err) => {
        console.error(`Failed to toggle feed state for ${feedItem.url}`, err);
        feedItem.enabled = !newState;
      },
    });
  }

  updateSelectedUrls(selectedOptions: any[]): void {
    this.selectedFeedUrls = selectedOptions.map((option) => option.value);
    this.filterFeedItems();
  }

  filterFeedItems() {
    const startDate = this.dateRange?.[0] || null;
    const endDate = this.dateRange?.[1] || null;
    const searchString = this.getSearchString();

    let results = this.searchService.filterItems(
      this.aggregatedFeedItems,
      searchString,
      ['title', 'description', 'content'],
      startDate,
      endDate
    ).results;

    if (this.selectedFeedUrls.length) {
      results = results.filter((item) =>
        this.selectedFeedUrls.includes(item.feedUrl)
      );
    }

    this.filteredFeedItems = Array.from(new Set(results)); // Remove duplicates
    this.noResults = results.length === 0 && !this.isLoading;
  }

  applySavedSearchTerms() {
    this.activeSearchTerms.clear();
    this.selectedSavedSearchTerms.forEach((term) => {
      this.activeSearchTerms.add(term);
    });
    this.updateSearchTerm();
    this.filterFeedItems();
  }

  updateSearchTerm() {
    this.searchTerm = Array.from(this.activeSearchTerms).join(', ');
    this.filterFeedItems();
  }

  onSearchTermChange() {
    const terms = this.searchTerm
      .toLowerCase()
      .split(',')
      .map((term) => term.trim());
    this.activeSearchTerms.clear();
    terms.forEach((term) => {
      if (term) {
        this.activeSearchTerms.add(term);
      }
    });
    this.selectedSavedSearchTerms = Array.from(this.activeSearchTerms); // Sync the selectButton model
    this.filterFeedItems();
  }

  private getSearchString(): string {
    const activeTerms = Array.from(this.activeSearchTerms).join(', ');
    return this.searchTerm ? `${this.searchTerm}, ${activeTerms}` : activeTerms;
  }
}
