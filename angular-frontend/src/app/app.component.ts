import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FeedManagerComponent } from './feed-manager/feed-manager.component';
import { PiholeComponentComponent } from './pihole-component/pihole-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FeedManagerComponent,
    RouterLink,
    RouterLinkActive,
    PiholeComponentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-frontend';
}
