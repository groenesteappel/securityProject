import { Routes } from '@angular/router';
import { AggregatedFeedComponent } from './aggregated-feed/aggregated-feed.component';
import { FeedManagerComponent } from './feed-manager/feed-manager.component';

export const routes: Routes = [
  {
    path: 'aggregated-feed',
    component: AggregatedFeedComponent,
  },
  {
    path: 'feed-dashboard',
    component: FeedManagerComponent,
  },
];
