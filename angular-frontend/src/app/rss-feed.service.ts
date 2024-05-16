import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  private baseUrl = 'http://127.0.0.1:3000/api'; // Adjust as needed

  constructor(private http: HttpClient) {}

  fetchFeed(url: string) {
    return this.http.get<any>(
      `${this.baseUrl}/feed?url=${encodeURIComponent(url)}`
    );
  }

  toggleFeedState(url: string, enabled: boolean) {
    return this.http.post(`${this.baseUrl}/toggleFeedState`, { url, enabled });
  }

  addFeedUrl(name: string, url: string) {
    return this.http.post(`${this.baseUrl}/addUrl`, { name, url });
  }

  removeFeedUrl(url: string) {
    return this.http.request('delete', `${this.baseUrl}/removeUrl`, {
      body: { url },
    });
  }

  // In RssFeedService
  listFeedUrls(): Observable<
    { name: string; url: string; enabled: boolean }[]
  > {
    return this.http.get<{ name: string; url: string; enabled: boolean }[]>(
      `${this.baseUrl}/listUrls`
    );
  }

  fetchAllFeeds() {
    return this.http.get<any[]>(`${this.baseUrl}/fetchAllFeeds`);
  }
}
