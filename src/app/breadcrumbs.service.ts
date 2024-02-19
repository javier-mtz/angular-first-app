import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private breadcrumbs: { label: string; url: string }[] = [];

  getBreadcrumbs() {
    return this.breadcrumbs;
  }

  setBreadcrumbs(breadcrumbs: { label: string; url: string }[]) {
    this.breadcrumbs = breadcrumbs;
  }
}