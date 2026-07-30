import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';

import {
  ClNavigationService
} from '@clay/app-shell/structural';

export const initialDataResolver = () => {
  const navigationService = inject(ClNavigationService);

  // Fork join multiple API endpoint calls to wait all of them to finish
  return forkJoin([
    navigationService.get()
  ]);
};
