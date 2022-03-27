import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleMovementChecklist from './vehicle-movement-checklist';
import VehicleMovementChecklistDetail from './vehicle-movement-checklist-detail';
import VehicleMovementChecklistUpdate from './vehicle-movement-checklist-update';
import VehicleMovementChecklistDeleteDialog from './vehicle-movement-checklist-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleMovementChecklistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleMovementChecklistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleMovementChecklistDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleMovementChecklist} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleMovementChecklistDeleteDialog} />
  </>
);

export default Routes;
