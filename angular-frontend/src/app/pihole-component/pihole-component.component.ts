import { Component, OnInit } from '@angular/core';
import { PiholeService } from '../pihole.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-pihole-component',
  standalone: true,
  imports: [CommonModule,CardModule ],
  templateUrl: './pihole-component.component.html',
  styleUrl: './pihole-component.component.css'
})
export class PiholeComponentComponent implements OnInit{
  summary: any;

  constructor(private piholeService: PiholeService) {}

  ngOnInit(): void {
    this.piholeService.getSummary().subscribe((data: any) => {
      this.summary = data;
    });
  }
}
