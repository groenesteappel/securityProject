import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../rss-feed.service';
import { SearchService } from '../search.service';
import { FormsModule } from '@angular/forms';
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
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-aggregated-feed',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    PanelModule,
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
    InputGroupModule,
    InputGroupAddonModule,
    IconFieldModule,
    InputIconModule,
    ContextMenuModule,
    TagModule,
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
  items: MenuItem[] | undefined;

  constructor(
    private rssFeedService: RssFeedService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    console.log('ngOnInit called');
    this.loadAggregatedFeed();
    this.loadFeedUrls();
    this.loadSavedSearches();
  }

  loadFeedUrls() {
    console.log('loadFeedUrls called');
    this.rssFeedService.listFeedUrls().subscribe({
      next: (feeds) => {
        console.log('Feeds loaded:', feeds);
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
    console.log('loadAggregatedFeed called');
    this.isLoading = true;
    this.rssFeedService.fetchAllFeeds().subscribe({
      next: (items) => {
        console.log('Aggregated feed items loaded:', items);
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

  loadSavedSearches(clearSearchTerm: boolean = false) {
    console.log('loadSavedSearches called');
    this.rssFeedService.fetchSavedSearches().subscribe({
      next: (savedSearches) => {
        console.log('Saved searches loaded:', savedSearches);
        this.savedSearchOptions = savedSearches;
        if (clearSearchTerm) {
          this.clearSearch(); // Clear search terms and active terms
        } else {
          this.updateSearchTerm(); // Refresh the state
        }
      },
      error: (error) => {
        console.error('Failed to load saved searches', error);
      },
    });
  }

  saveSearch() {
    console.log('saveSearch called with searchTerm:', this.searchTerm);
    if (this.searchTerm.trim() !== '') {
      if (!this.isSavedSearch()) {
        console.log('Saving search term:', this.searchTerm.trim());
        this.rssFeedService.saveSearchTerm(this.searchTerm.trim()).subscribe({
          next: () => {
            console.log('Search term saved successfully');
            this.loadSavedSearches(); // Refresh saved searches
          },
          error: (error) => {
            console.error('Failed to save search term', error);
          },
        });
      } else {
        console.log('Deleting search term:', this.searchTerm.trim());
        this.deleteSearch(this.searchTerm.trim(), true); // Clear the search term
      }
    }
  }

  clearSearch() {
    console.log('clearSearch called');
    this.searchTerm = '';
    this.activeSearchTerms.clear();
    this.selectedSavedSearchTerms = []; // Clear selected saved search terms
    this.filterFeedItems(); // Reapply filters
  }

  public isSavedSearch(): boolean {
    const isSaved = this.savedSearchOptions.some(
      (option) => option.value === this.searchTerm.trim()
    );
    console.log('isSavedSearch:', isSaved);
    return isSaved;
  }

  deleteSearch(searchTerm: string, clearSearchTerm: boolean = false) {
    console.log(
      'deleteSearch called with searchTerm:',
      searchTerm,
      'clearSearchTerm:',
      clearSearchTerm
    );
    this.rssFeedService.deleteSearchTerm(searchTerm).subscribe({
      next: () => {
        console.log('Search term deleted successfully');
        this.loadSavedSearches(clearSearchTerm); // Refresh saved searches and optionally clear search term
      },
      error: (error) => {
        console.error('Failed to delete search term', error);
      },
    });
  }

  toggleFeedState(feedItem: any): void {
    const newState = !feedItem.enabled;
    console.log(
      'toggleFeedState called with feedItem:',
      feedItem,
      'newState:',
      newState
    );
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
    console.log(
      'updateSelectedUrls called with selectedOptions:',
      selectedOptions
    );
    this.selectedFeedUrls = selectedOptions.map((option) => option.value);
    this.filterFeedItems();
  }

  filterFeedItems() {
    console.log('filterFeedItems called');
    const startDate = this.dateRange?.[0] || null;
    const endDate = this.dateRange?.[1] || null;
    const searchString = this.getSearchString();
    console.log(
      'Filtering with searchString:',
      searchString,
      'startDate:',
      startDate,
      'endDate:',
      endDate
    );

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
    console.log('applySavedSearchTerms called');
    this.activeSearchTerms.clear();
    this.selectedSavedSearchTerms.forEach((term) => {
      this.activeSearchTerms.add(term);
    });
    this.updateSearchTerm(); // Sync `searchTerm` with `activeSearchTerms`
    this.filterFeedItems();
  }

  updateSearchTerm() {
    console.log('updateSearchTerm called');
    this.searchTerm = Array.from(this.activeSearchTerms).join(', ');
    console.log('Updated searchTerm:', this.searchTerm);
    this.filterFeedItems();
  }

  onSearchTermChange() {
    console.log('onSearchTermChange called with searchTerm:', this.searchTerm);
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
    console.log('getSearchString called, activeTerms:', activeTerms);
    return activeTerms; // Return only active terms without appending searchTerm
  }

  getLimitedLines(text: string, limit: number): string {
    if (!text) return '';
    const lines = text.split('\n');
    return lines.slice(0, limit).join('<br>');
  }
}
