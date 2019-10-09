import GoogleTagManager from '@redux-beacon/google-tag-manager';
import { createMiddleware, createMetaReducer } from 'redux-beacon';
import { LOCATION_CHANGE } from 'connected-react-router';

const gtm = GoogleTagManager();

const pageViewEventDefinition = action => ({
  event: 'PAGEVIEW_EVENT',
  hitType: 'PAGEVIEW_EVENT',
  page: action.payload.location.pathname,
});

const verifyEmailEventDefinition = () => ({
  event: 'COMPLETE_REGISTER',
  hitType: 'COMPLETE_REGISTER',
});

const eventsMap = {
  [LOCATION_CHANGE]: pageViewEventDefinition,
  VERIFY_EMAIL_SUCCESS: verifyEmailEventDefinition,
};

export const gtmMiddleware = createMiddleware(eventsMap, gtm);
export const gtmMetaReducer = createMetaReducer(eventsMap, gtm);
