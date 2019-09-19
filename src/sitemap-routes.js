import React from 'react';
import { Route, Router } from 'react-router';

export default (
  <Route>
    <Route path="/question-base/:page(\d+)" />
    <Route path="/view-question/:id" />
    <Route path="/create-question/" />
    <Route path="/user-profile" />
    <Route path="/documents/:page(\d+)" />
    <Route path="/view-object/:id" />
    <Route path="/object-base/:page(\d+)" />
    <Route path="/nossos-planos" />
    <Route path="/terms-use" />
  </Route>
);
