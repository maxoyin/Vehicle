// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-movement.reducer';
import { IVehicleMovement } from 'app/shared/model/vehicle-movement.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMovementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleMovement = (props: IVehicleMovementProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleMovementList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-movement-heading" data-cy="VehicleMovementHeading">
        <Translate contentKey="prospectServiceApp.vehicleMovement.home.title">Vehicle Movements</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicleMovement.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicleMovement.home.createLabel">Create new Vehicle Movement</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleMovementList && vehicleMovementList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovement.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovement.sourceSubCityId">Source Sub City Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovement.destinationSubCityId">Destination Sub City Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovement.movementType">Movement Type</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovement.retrievalAgentMaxId">Retrieval Agent Max Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovement.odometerReadingOutward">Odometer Reading Outward</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovement.odometerReadingInward">Odometer Reading Inward</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovement.vehicle">Vehicle</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleMovementList.map((vehicleMovement, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleMovement.id}`} color="link" size="sm">
                      {vehicleMovement.id}
                    </Button>
                  </td>
                  <td>{vehicleMovement.sourceSubCityId}</td>
                  <td>{vehicleMovement.destinationSubCityId}</td>
                  <td>
                    <Translate contentKey={`prospectServiceApp.MovementType.${vehicleMovement.movementType}`} />
                  </td>
                  <td>{vehicleMovement.retrievalAgentMaxId}</td>
                  <td>{vehicleMovement.odometerReadingOutward}</td>
                  <td>{vehicleMovement.odometerReadingInward}</td>
                  <td>
                    {vehicleMovement.vehicle ? <Link to={`vehicle/${vehicleMovement.vehicle.id}`}>{vehicleMovement.vehicle.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicleMovement.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleMovement.id}/edit`}
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
                        to={`${match.url}/${vehicleMovement.id}/delete`}
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
              <Translate contentKey="prospectServiceApp.vehicleMovement.home.notFound">No Vehicle Movements found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleMovement }: IRootState) => ({
  vehicleMovementList: vehicleMovement.entities,
  loading: vehicleMovement.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovement);
