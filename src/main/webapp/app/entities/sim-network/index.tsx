import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SimNetwork from './sim-network';
import SimNetworkDetail from './sim-network-detail';
import SimNetworkUpdate from './sim-network-update';
import SimNetworkDeleteDialog from './sim-network-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SimNetworkUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SimNetworkUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SimNetworkDetail} />
      <ErrorBoundaryRoute path={match.url} component={SimNetwork} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SimNetworkDeleteDialog} />
  </>
);

export default Routes;
