import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import Transform from './Transform';

i18next.addResourceBundle('en', 'transform', en);
i18next.addResourceBundle('tr', 'transform', tr);
i18next.addResourceBundle('ar', 'transform', ar);

const TransformConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'transform',
      element: <Transform />,
    },
    {
      path: 'transform/application',
      element: <Transform />
    },
 
    {
      path: 'transform/approvallist',
      element: <Transform />
    },
    {
      path: 'transform/communitylist',
      element: <Transform />
    },
    {
      path: 'transform/rowdatadetail',
      element: <Transform />
    },
  ],
};

export default TransformConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/
