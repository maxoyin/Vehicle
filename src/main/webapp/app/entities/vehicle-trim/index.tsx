import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleTrim from './vehicle-trim';
import VehicleTrimDetail from './vehicle-trim-detail';
import VehicleTrimUpdate from './vehicle-trim-update';
import VehicleTrimDeleteDialog from './vehicle-trim-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleTrimUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleTrimUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleTrimDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleTrim} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleTrimDeleteDialog} />
  </>
);

export default Routes;
