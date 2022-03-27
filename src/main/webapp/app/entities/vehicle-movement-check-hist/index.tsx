import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleMovementCheckHist from './vehicle-movement-check-hist';
import VehicleMovementCheckHistDetail from './vehicle-movement-check-hist-detail';
import VehicleMovementCheckHistUpdate from './vehicle-movement-check-hist-update';
import VehicleMovementCheckHistDeleteDialog from './vehicle-movement-check-hist-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleMovementCheckHistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleMovementCheckHistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleMovementCheckHistDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleMovementCheckHist} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleMovementCheckHistDeleteDialog} />
  </>
);

export default Routes;
