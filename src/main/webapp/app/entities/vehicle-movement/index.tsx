import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleMovement from './vehicle-movement';
import VehicleMovementDetail from './vehicle-movement-detail';
import VehicleMovementUpdate from './vehicle-movement-update';
import VehicleMovementDeleteDialog from './vehicle-movement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleMovementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleMovementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleMovementDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleMovement} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleMovementDeleteDialog} />
  </>
);

export default Routes;
