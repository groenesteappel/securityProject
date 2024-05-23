import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
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
        label: 'Feed Dashboard',
        routerLink: ['/feed-dashboard'],
        command: () => {
          this.applyActiveStyles();
        },
      },
      {
        label: 'Pi-hole Dashboard',
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
