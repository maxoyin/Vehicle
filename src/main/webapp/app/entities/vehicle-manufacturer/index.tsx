import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleManufacturer from './vehicle-manufacturer';
import VehicleManufacturerDetail from './vehicle-manufacturer-detail';
import VehicleManufacturerUpdate from './vehicle-manufacturer-update';
import VehicleManufacturerDeleteDialog from './vehicle-manufacturer-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleManufacturerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleManufacturerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleManufacturerDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleManufacturer} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleManufacturerDeleteDialog} />
  </>
);

export default Routes;
