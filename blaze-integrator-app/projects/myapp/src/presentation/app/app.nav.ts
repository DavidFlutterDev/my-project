import { ClNavigationItem } from '@clay/app-shell/structural';

export const defaultNavigation: ClNavigationItem[] = [
  {
    id: 'dashboard.basic',
    title: 'Basic',
    type: 'collapsable',
    icon: 'heroicons_outline:hashtag',
    children: [
      {
        id: 'dashboard.basic.inputs',
        title: 'Inputs',
        type: 'basic',
        link: '/dashboard/inputs',
      },
      {
        id: 'dashboard.basic.buttons',
        title: 'Buttons',
        type: 'basic',
        link: '/dashboard/buttons',
      },
      {
        id: 'dashboard.basic.selects',
        title: 'Selects',
        type: 'basic',
        link: '/dashboard/selects',
      },
      {
        id: 'dashboard.basic.iconsList',
        title: 'Icons List',
        type: 'basic',
        link: '/dashboard/icons-list',
      },
      {
        id: 'dashboard.basic.chipList',
        title: 'Chip List',
        type: 'basic',
        link: '/dashboard/chipList',
      },
      {
        id: 'dashboard.basic.progressBar',
        title: 'Progress Bar',
        type: 'basic',
        link: '/dashboard/progress-bar',
      },
      {
        id: 'dashboard.basic.image',
        title: 'Image',
        type: 'basic',
        link: '/dashboard/image',
      },
    ],
  },
  {
    id: 'dashboard.complex',
    title: 'Complex',
    type: 'collapsable',
    icon: 'heroicons_outline:hashtag',
    children: [
      {
        id: 'dashboard.complex.addLead',
        title: 'Add lead',
        type: 'basic',
        link: '/dashboard/add-lead'
      },
      {
        id: 'dashboard.complex.addProduct',
        title: 'Add product',
        type: 'basic',
        link: '/dashboard/add-product'
      },
      {
        id: 'dashboard.complex.riskSetupPg',
        title: 'Risk setup',
        type: 'basic',
        link: '/dashboard/risk-setup/pg'
      },
      {
        id: 'dashboard.complex.autocomplete',
        title: 'Auto Complete',
        type: 'basic',
        link: '/dashboard/multiselect-autocomplete'
      },
      {
        id: 'dashboard.complex.dragDropUpload',
        title: 'Drag and drop upload',
        type: 'basic',
        link: '/dashboard/drag-drop-upload'
      },
    ],
  },
  {
    id: 'dashboard.container',
    title: 'Container',
    type: 'collapsable',
    icon: 'heroicons_outline:hashtag',
    children: [
      {
        id: 'dashboard.container.tabs',
        title: 'Tabs',
        type: 'basic',
        link: '/dashboard/tabs'
      },
      {
        id: 'dashboard.container.table',
        title: 'Table/Data Grid',
        type: 'basic',
        link: '/dashboard/table'
      },
      {
        id: 'dashboard.container.stepper',
        title: 'Expansion panel',
        type: 'basic',
        link: '/dashboard/expansion-panel'
      },
      {
        id: 'dashboard.container.expansionPanel',
        title: 'Stepper',
        type: 'basic',
        link: '/dashboard/stepper'
      },
      {
        id: 'dashboard.container.accordion',
        title: 'Accordion',
        type: 'basic',
        link: '/dashboard/accordion'
      },
      {
        id: 'dashboard.container.stacklayout',
        title: 'StackLayout',
        type: 'basic',
        link: '/dashboard/stacklayout'
      },
    ],
  },
  {
    id: 'dashboard.services',
    title: 'Services',
    type: 'collapsable',
    icon: 'heroicons_outline:hashtag',
    children: [
      {
        id: 'dashboard.services.upload',
        title: 'Upload',
        type: 'basic',
        link: '/dashboard/upload'
      },
    ],
  },
];
