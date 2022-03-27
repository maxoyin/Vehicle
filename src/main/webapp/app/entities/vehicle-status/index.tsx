import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleStatus from './vehicle-status';
import VehicleStatusDetail from './vehicle-status-detail';
import VehicleStatusUpdate from './vehicle-status-update';
import VehicleStatusDeleteDialog from './vehicle-status-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleStatusDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleStatus} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleStatusDeleteDialog} />
  </>
);

export default Routes;
