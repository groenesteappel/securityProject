import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  private baseUrl = 'http://localhost:3000/api'; // Adjust as needed

  constructor(private http: HttpClient) {}

  fetchFeed(url: string) {
    return this.http.get<any>(
      `${this.baseUrl}/feed?url=${encodeURIComponent(url)}`
    );
  }

  addFeedUrl(url: string) {
    return this.http.post(`${this.baseUrl}/addUrl`, { url });
  }

  removeFeedUrl(url: string) {
    return this.http.request('delete', `${this.baseUrl}/removeUrl`, {
      body: { url },
    });
  }

  listFeedUrls() {
    return this.http.get<string[]>(`${this.baseUrl}/listUrls`);
  }
}
