import { Component } from '@angular/core';
import { RssFeedService } from '../rss-feed.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  feedUrls: { url: string; enabled: boolean }[] = [];

  constructor(private rssFeedService: RssFeedService) {}

  ngOnInit() {
    this.getFeedUrls();
  }

  getFeedUrls(): void {
    this.rssFeedService.listFeedUrls().subscribe({
      next: (feeds) => {
        this.feedUrls = feeds;
      },
      error: (err) => console.error('Error fetching feed URLs:', err),
      complete: () => console.log('Feed URLs fetching complete', this.feedUrls),
    });
  }
}
