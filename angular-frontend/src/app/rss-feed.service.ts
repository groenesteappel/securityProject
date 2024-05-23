import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  private baseUrl = 'http://127.0.0.1:3001/api'; // Adjust as needed

  constructor(private http: HttpClient) {}

  fetchFeed(url: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/feed?url=${encodeURIComponent(url)}`
    );
  }

  toggleFeedState(url: string, enabled: boolean): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/toggleFeedState`, {
      url,
      enabled,
    });
  }

  addFeedUrl(name: string, url: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addUrl`, { name, url });
  }

  removeFeedUrl(url: string): Observable<any> {
    return this.http.request<any>('delete', `${this.baseUrl}/removeUrl`, {
      body: { url },
    });
  }

  listFeedUrls(): Observable<
    { name: string; url: string; enabled: boolean }[]
  > {
    return this.http.get<{ name: string; url: string; enabled: boolean }[]>(
      `${this.baseUrl}/listUrls`
    );
  }

  fetchAllFeeds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/fetchAllFeeds`);
  }

  fetchSavedSearches(): Observable<{ label: string; value: string }[]> {
    return this.http
      .get<{ _id: string; search: string }[]>(`${this.baseUrl}/savedsearches`)
      .pipe(
        map((savedSearches: { _id: string; search: string }[]) => {
          console.log('fetchSavedSearches: Original data', savedSearches);
          return savedSearches.map(
            (search: { _id: string; search: string }) => ({
              label: search.search,
              value: search.search,
            })
          );
        })
      );
  }

  saveSearchTerm(searchTerm: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/savedsearches`, {
      search: searchTerm,
    });
  }
  deleteSearchTerm(searchTerm: string): Observable<any> {
    return this.http.request<any>('delete', `${this.baseUrl}/savedsearches`, {
      body: { search: searchTerm },
    });
  }
}
