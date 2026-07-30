import { Component, Input, inject } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { ClIconComponent, ClLabelComponent } from '@clay/ui-components/basic';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [ClLabelComponent, ClIconComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  providers:[
    BreadcrumbService
  ]
})

export class BreadcrumbComponent {
  @Input({ required: true }) data!: {
    label: string;
    routeUrl?: string
  }[];

  constructor() {}

  protected breadcrumbService: BreadcrumbService = inject(BreadcrumbService);
}
