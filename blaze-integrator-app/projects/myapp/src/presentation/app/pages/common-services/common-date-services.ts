import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonDateService {
  constructor(private datePipe: DatePipe) {}

  formateDate(value?: any, format = 'dd, MMM yyyy, HH:mm'): string|null {
    if (value != undefined && value != null && value != '') {
      var formattedDate = this.datePipe.transform(value, 'dd, MMM yyyy, HH:mm');
      return formattedDate;
    }
    return '';
  }
}
