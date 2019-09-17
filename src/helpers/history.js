/*import { createHashHistory } from 'history';

export const history = createHashHistory();*/

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
    basename: "https://masteraula.com.br",
  });