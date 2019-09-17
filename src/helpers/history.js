/* import { createHashHistory } from 'history'; */
import createHistory from 'history/createBrowserHistory';

/*
export const history = createHashHistory();
*/
export const history = createHistory({
  basename: process.env.PUBLIC_URL,
});
