import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleMovementHistory from './vehicle-movement-history';
import VehicleMovementHistoryDetail from './vehicle-movement-history-detail';
import VehicleMovementHistoryUpdate from './vehicle-movement-history-update';
import VehicleMovementHistoryDeleteDialog from './vehicle-movement-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleMovementHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleMovementHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleMovementHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleMovementHistory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleMovementHistoryDeleteDialog} />
  </>
);

export default Routes;
