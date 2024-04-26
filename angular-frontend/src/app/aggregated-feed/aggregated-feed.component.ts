import { Component } from '@angular/core';
import { RssFeedService } from '../rss-feed.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-aggregated-feed',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressSpinnerModule],
  templateUrl: './aggregated-feed.component.html',
  styleUrl: './aggregated-feed.component.css',
})
export class AggregatedFeedComponent {
  aggregatedFeedItems: any[] = [];
  loading: boolean = false;

  constructor(private rssFeedService: RssFeedService) {}

  ngOnInit() {
    this.loadAggregatedFeed();
  }

  loadAggregatedFeed() {
    this.loading = true;
    this.rssFeedService.fetchAllFeeds().subscribe({
      next: (items) => {
        this.aggregatedFeedItems = items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load aggregated feed', error);
        this.loading = false;
      },
    });
  }
}
