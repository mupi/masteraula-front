import React from 'react';
import { Route, Router } from 'react-router';

export default (
  <Route>
    <Route path="/question-base/:page(\d+)" />
    <Route path="/view-question/:id" />
    <Route path="/classify-question/:id" />
    <Route path="/edit-question/:id" />
    <Route path="/create-question/" />
    <Route path="/user-profile" />
    <Route path="/documents/:page(\d+)" />
    <Route path="/my-headers/:page(\d+)" />
    <Route path="/edit-document" />
    <Route path="/view-object/:id" />
    <Route path="/edit-header/:id" />
    <Route path="/new-header" />
    <Route path="/object-base/:page(\d+)" />
    <Route path="/nossos-planos" />
    <Route path="/esqueci-senha" />
    <Route path="/redefine-senha/:uid/:token" />
    <Route path="/terms-use" />
    <Route path="/verify-userregister/:key" />
  </Route>
);