import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleStatusChangeReason from './vehicle-status-change-reason';
import VehicleStatusChangeReasonDetail from './vehicle-status-change-reason-detail';
import VehicleStatusChangeReasonUpdate from './vehicle-status-change-reason-update';
import VehicleStatusChangeReasonDeleteDialog from './vehicle-status-change-reason-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleStatusChangeReasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleStatusChangeReasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleStatusChangeReasonDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleStatusChangeReason} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleStatusChangeReasonDeleteDialog} />
  </>
);

export default Routes;
