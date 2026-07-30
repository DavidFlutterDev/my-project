import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ClIconProperties,
  ClLabelProperties,
  ClButtonProperties,
  IClButtonType,
  ClButtonBehavior,
} from '@clay/ui-components/basic';
import { ClComponentTypes } from '@clay/ui-components/shared';

@Injectable()
export class BreadcrumbService {
  constructor(public router: Router) {}

  public breadCrumpSepIconProperties: ClIconProperties = {
    id: `icon5`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-4`,
    },
    iconName: `heroicons_outline:chevron-left`,
  };

  public getLabelProperties(data: any) {
    if (data.routeUrl) {
      return {
        id: `${data.label}label`,
        label: data.label,
        showTooltip: false,
        type: ClComponentTypes.label,
        style: {
          contentWidth: `w-full`,
          cssClasses: `text-base whitespace-nowrap text-primary-600 cursor-pointer`,
        },
        onClick: () => this.onClickBreadCrumb(data.routeUrl),
      };
    } else {
      return {
        id: `${data.label}label`,
        label: data.label,
        showTooltip: false,
        type: ClComponentTypes.label,
        style: {
          contentWidth: `w-full`,
          cssClasses: `text-neutral-700 text-base whitespace-nowrap`,
        },
      };
    }
  }

  public onClickBreadCrumb(routeUrl: string) {
    console.log(routeUrl);
    this.router.navigate([routeUrl]);
  }
}
