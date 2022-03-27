import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AssestClass from './assest-class';
import AssestClassDetail from './assest-class-detail';
import AssestClassUpdate from './assest-class-update';
import AssestClassDeleteDialog from './assest-class-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AssestClassUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AssestClassUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AssestClassDetail} />
      <ErrorBoundaryRoute path={match.url} component={AssestClass} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AssestClassDeleteDialog} />
  </>
);

export default Routes;
