import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SimNetwork from './sim-network';
import AssestClass from './assest-class';
import VehicleType from './vehicle-type';
import VehicleManufacturer from './vehicle-manufacturer';
import VehicleModel from './vehicle-model';
import VehicleTrim from './vehicle-trim';
import VehicleStatus from './vehicle-status';
import VehicleStatusChangeReason from './vehicle-status-change-reason';
import VehicleStatChangeSubReason from './vehicle-stat-change-sub-reason';
import Vehicle from './vehicle';
import VehicleChecklistItem from './vehicle-checklist-item';
import VehicleMovement from './vehicle-movement';
import VehicleMovementChecklist from './vehicle-movement-checklist';
import VehicleMovementHistory from './vehicle-movement-history';
import VehicleMovementCheckHist from './vehicle-movement-check-hist';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}sim-network`} component={SimNetwork} />
      <ErrorBoundaryRoute path={`${match.url}assest-class`} component={AssestClass} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-type`} component={VehicleType} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-manufacturer`} component={VehicleManufacturer} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-model`} component={VehicleModel} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-trim`} component={VehicleTrim} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-status`} component={VehicleStatus} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-status-change-reason`} component={VehicleStatusChangeReason} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-stat-change-sub-reason`} component={VehicleStatChangeSubReason} />
      <ErrorBoundaryRoute path={`${match.url}vehicle`} component={Vehicle} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-checklist-item`} component={VehicleChecklistItem} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-movement`} component={VehicleMovement} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-movement-checklist`} component={VehicleMovementChecklist} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-movement-history`} component={VehicleMovementHistory} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-movement-check-hist`} component={VehicleMovementCheckHist} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
