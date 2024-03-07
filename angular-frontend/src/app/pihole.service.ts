import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PiholeService {
  private apiUrl = 'http://localhost:8080/admin/api.php?summary&auth=96c3780287c58bd0867c8cd9b2d60c387ea070c4df3f87d2d3e3c770d3baab0b'; // Adjust the URL

  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
