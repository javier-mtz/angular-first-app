import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../breadcrumbs.service';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  imports: [MatGridListModule, RouterModule, CommonModule, MatCardModule]
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(private breadcrumbsService: BreadcrumbsService) { }

  ngOnInit() {
    this.breadcrumbs = this.breadcrumbsService.getBreadcrumbs();
  }
}