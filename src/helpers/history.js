/*import { createHashHistory } from 'history';

export const history = createHashHistory();*/

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL,
  });