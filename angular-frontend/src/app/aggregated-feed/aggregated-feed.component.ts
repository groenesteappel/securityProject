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

  constructor(
    private rssFeedService: RssFeedService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.loadAggregatedFeed();
  }

  loadAggregatedFeed() {
    this.loading = true;
    this.rssFeedService.fetchAllFeeds().subscribe({
      next: (items) => {
        this.aggregatedFeedItems = items;
        this.filteredItems = items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load aggregated feed', error);
        this.loading = false;
      },
    });
  }

  filterFeedItems() {
    const startDate =
      this.rangeDates && this.rangeDates.length > 0 ? this.rangeDates[0] : null;
    const endDate =
      this.rangeDates && this.rangeDates.length > 1 ? this.rangeDates[1] : null;

    const { results, isEmpty } = this.searchService.filterItems(
      this.aggregatedFeedItems,
      this.searchTerm,
      ['title', 'description', 'content'],
      startDate,
      endDate
    );

    this.filteredItems = results;
    this.noResultsFound = isEmpty && !this.loading;
  }
}
