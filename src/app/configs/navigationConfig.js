import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'example-component',
    title: 'Example',
    translate: 'EXAMPLE',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'example',
  },

  {
    id: 'transform-component',
    title: 'Transform',
    translate: 'Transform',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'transform/application',
  },
  {
    id: 'report-component',
    title: 'reports',
    translate: 'REPORTS',
    type: 'group',
  },
  {
    id: 'monthlyreport-component',
    title: 'MonthlyReport',
    translate: 'MonthlyReport',
    type: 'item',
    icon: 'heroicons-outline:chart-square-bar',
    url: 'monthlyreport',
  },
  {
    id: 'donors-component',
    title: 'Donors',
    translate: 'Donors',
    type: 'item',
    icon: 'heroicons-outline:gift',
    url: 'donors',
  },
];

export default navigationConfig;
