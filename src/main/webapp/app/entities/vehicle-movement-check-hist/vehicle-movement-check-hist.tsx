// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-movement-check-hist.reducer';
import { IVehicleMovementCheckHist } from 'app/shared/model/vehicle-movement-check-hist.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMovementCheckHistProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleMovementCheckHist = (props: IVehicleMovementCheckHistProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleMovementCheckHistList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-movement-check-hist-heading" data-cy="VehicleMovementCheckHistHeading">
        <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.home.title">Vehicle Movement Check Hists</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.home.createLabel">
              Create new Vehicle Movement Check Hist
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleMovementCheckHistList && vehicleMovementCheckHistList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.itemStatus">Item Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleMovementCheckHistList.map((vehicleMovementCheckHist, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleMovementCheckHist.id}`} color="link" size="sm">
                      {vehicleMovementCheckHist.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`prospectServiceApp.VehicleMovementChecklistStatus.${vehicleMovementCheckHist.itemStatus}`} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleMovementCheckHist.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleMovementCheckHist.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleMovementCheckHist.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.home.notFound">
                No Vehicle Movement Check Hists found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleMovementCheckHist }: IRootState) => ({
  vehicleMovementCheckHistList: vehicleMovementCheckHist.entities,
  loading: vehicleMovementCheckHist.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementCheckHist);
