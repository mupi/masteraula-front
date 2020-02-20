import {
  dashboardService,
} from 'services';

// Get all my dashboard info
export const FETCH_MY_DASHBOARD = 'FETCH_MY_DASHBOARD';
export const FETCH_MY_DASHBOARD_SUCCESS = 'FETCH_MY_DASHBOARD_SUCCESS';
export const FETCH_MY_DASHBOARD_FAILURE = 'FETCH_MY_DASHBOARD_FAILURE';

export const fetchMyDashboard = () => {
  function requestMyDashboard() {
    return {
      type: FETCH_MY_DASHBOARD,
    };
  }

  function fetchMyDashboardSuccess(myDashboard) {
    return {
      type: FETCH_MY_DASHBOARD_SUCCESS,
      myDashboard,
    };
  }

  function fetchMyDashboardFailure(error) {
    return {
      type: FETCH_MY_DASHBOARD_FAILURE,
      error,
    };
  }
  return (dispatch) => {
    dispatch(requestMyDashboard());
    return dashboardService.fetchMyDashboard()
      .then(
        (myDashboard) => {
          dispatch(fetchMyDashboardSuccess(myDashboard));
        },
        (error) => {
          dispatch(fetchMyDashboardFailure(error));
        },
      );
  };
};
