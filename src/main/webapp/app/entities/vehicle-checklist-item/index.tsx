import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleChecklistItem from './vehicle-checklist-item';
import VehicleChecklistItemDetail from './vehicle-checklist-item-detail';
import VehicleChecklistItemUpdate from './vehicle-checklist-item-update';
import VehicleChecklistItemDeleteDialog from './vehicle-checklist-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleChecklistItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleChecklistItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleChecklistItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleChecklistItem} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleChecklistItemDeleteDialog} />
  </>
);

export default Routes;
