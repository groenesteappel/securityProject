import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../rss-feed.service'; // Adjust the path as necessary
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed-manager',
  templateUrl: './feed-manager.component.html',
  styleUrls: ['./feed-manager.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class FeedManagerComponent implements OnInit {
  feedUrls: string[] = [];
  newUrl = '';

  constructor(private rssFeedService: RssFeedService) {}

  ngOnInit() {
    this.loadFeedUrls();
  }

  loadFeedUrls() {
    this.rssFeedService.listFeedUrls().subscribe({
      next: (urls) => {
        this.feedUrls = urls;
      },
      error: (error) => console.error('Failed to load feed URLs', error),
    });
  }

  addUrl() {
    if (!this.newUrl) return;
    this.rssFeedService.addFeedUrl(this.newUrl).subscribe({
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
}
