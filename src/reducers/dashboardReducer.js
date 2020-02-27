import {
  FETCH_MY_DASHBOARD,
  FETCH_MY_DASHBOARD_SUCCESS,
  FETCH_MY_DASHBOARD_FAILURE,
} from 'actions/dashboardAction';

const initialState = {
  myDashboard: [],
};

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_DASHBOARD:
      return Object.assign({}, state, {
        myDashboard: action.myDashboard,
        isFetchingMyDashboard: true,
        error: null,
      });
    case FETCH_MY_DASHBOARD_SUCCESS:
      return Object.assign({}, state, {
        myDashboard: action.myDashboard,
        isFetchingMyDashboard: false,
      });
    case FETCH_MY_DASHBOARD_FAILURE:
      return Object.assign({}, state, {
        isFetchingMyDashboard: false,
        error: action.error,
        isDeleted: false,
      });
    default:
      return state;
  }
};

export default dashboard;
