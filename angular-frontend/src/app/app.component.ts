import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { FeedManagerComponent } from './feed-manager/feed-manager.component';
import { PiholeComponentComponent } from './pihole-component/pihole-component.component';
import { MenubarModule } from 'primeng/menubar';
import { NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';

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
    MenubarModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';
  gfg!: MenuItem[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.gfg = [
      {
        label: 'Feed',
        routerLink: ['/aggregated-feed'],
        command: () => {
          this.applyActiveStyles();
        },
      },
      {
        label: 'Feed Dashboard',
        routerLink: ['/feed-dashboard'],
        command: () => {
          this.applyActiveStyles();
        },
      },
      {
        label: 'pi-hole Dashboard',
        routerLink: ['/pihole-dashboard'],
        command: () => {
          this.applyActiveStyles();
        },
      },
    ];
    this.applyActiveStyles();
  }

  applyActiveStyles() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.gfg.forEach((item) => {
          item.styleClass =
            this.router.url === item.routerLink[0] ? 'active-menu-item' : '';
        });
      }
    });
  }
}
