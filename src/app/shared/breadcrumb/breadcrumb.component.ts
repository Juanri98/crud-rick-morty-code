import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Breadcrumb } from 'src/app/interfaces/breadcrumb.interface';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private location: Location,
    private router: Router,
  ) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }

  get showBreadcrumbs(): boolean {
    const currentUrl = this.router.url;
    const currentUrlIncl = currentUrl.includes('/login') || currentUrl.includes('/register');
    return currentUrlIncl;
  }

  goBack(): void {
    this.location.back();
  }
}
