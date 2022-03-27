import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleStatChangeSubReason from './vehicle-stat-change-sub-reason';
import VehicleStatChangeSubReasonDetail from './vehicle-stat-change-sub-reason-detail';
import VehicleStatChangeSubReasonUpdate from './vehicle-stat-change-sub-reason-update';
import VehicleStatChangeSubReasonDeleteDialog from './vehicle-stat-change-sub-reason-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleStatChangeSubReasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleStatChangeSubReasonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleStatChangeSubReasonDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleStatChangeSubReason} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleStatChangeSubReasonDeleteDialog} />
  </>
);

export default Routes;
