import { Routes } from '@angular/router';
import { AggregatedFeedComponent } from './aggregated-feed/aggregated-feed.component';
import { FeedManagerComponent } from './feed-manager/feed-manager.component';
import { PiholeComponentComponent } from './pihole-component/pihole-component.component';

export const routes: Routes = [
  {
    path: 'aggregated-feed',
    component: AggregatedFeedComponent,
  },
  {
    path: 'feed-dashboard',
    component: FeedManagerComponent,
  },
  {
    path: 'pihole-dashboard',
    component: PiholeComponentComponent,
  },
];
