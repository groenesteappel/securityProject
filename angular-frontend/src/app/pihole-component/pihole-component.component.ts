import { Component, OnInit } from '@angular/core';
import { PiholeService } from '../pihole.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pihole-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pihole-component.component.html',
  styleUrl: './pihole-component.component.css'
})
export class PiholeComponentComponent implements OnInit{
  summary: any;

  constructor(private piholeService: PiholeService) {}

  ngOnInit(): void {
    this.piholeService.getSummary().subscribe((data) => {
      console.log("Data received:", data); // This will print the data to your browser's console
      this.summary = data;
    });
  }
}
