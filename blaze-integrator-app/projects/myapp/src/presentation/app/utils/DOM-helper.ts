import {
  ClFilterConfig,
} from '@clay/ui-components/containers';

export enum dateFilterKeys {
  all = 'All',
  today = 'Today',
  yesterday = 'Yesterday',
  last7Days = 'Last 7 days',
  last30Days = 'Last 30 days',
}

export class DOMHelper {
  public static getDateFilterConfig(): ClFilterConfig[] {
    return [
      {
        label: 'Created on',
        selectedValue: '',
        key: 'dmlOn',
        widthFilterDropdown: 'w-96',
        filterFromServerSide: true,
        options: [
          {
            text: dateFilterKeys.today,
            value: dateFilterKeys.today,
          },
          {
            text: dateFilterKeys.yesterday,
            value: dateFilterKeys.yesterday,
          },
          {
            text: dateFilterKeys.last7Days,
            value: dateFilterKeys.last7Days,
          },
          {
            text: dateFilterKeys.last30Days,
            value: dateFilterKeys.last30Days,
          },
        ],
      },
    ];
  }

  public static replaceUnderScoreWithSpace(text: string): string {
    let temp: string = '';
    if(text) {
      temp = text.replaceAll('_', ' ');
      temp = temp?.charAt(0).toUpperCase() + temp?.slice(1);
    }
    return temp ?? '';
  }
}
