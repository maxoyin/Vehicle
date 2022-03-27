// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-movement-history.reducer';
import { IVehicleMovementHistory } from 'app/shared/model/vehicle-movement-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMovementHistoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleMovementHistory = (props: IVehicleMovementHistoryProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleMovementHistoryList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-movement-history-heading" data-cy="VehicleMovementHistoryHeading">
        <Translate contentKey="prospectServiceApp.vehicleMovementHistory.home.title">Vehicle Movement Histories</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicleMovementHistory.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicleMovementHistory.home.createLabel">
              Create new Vehicle Movement History
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleMovementHistoryList && vehicleMovementHistoryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.sourceSubCityId">Source Sub City Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.destinationSubCityId">Destination Sub City Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.movementType">Movement Type</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.retrivalAgentMaxId">Retrival Agent Max Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.odometerReadingOutward">
                    Odometer Reading Outward
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.odometerReadingInward">
                    Odometer Reading Inward
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.vehicle">Vehicle</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.vehicleMovement">Vehicle Movement</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleMovementHistoryList.map((vehicleMovementHistory, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleMovementHistory.id}`} color="link" size="sm">
                      {vehicleMovementHistory.id}
                    </Button>
                  </td>
                  <td>{vehicleMovementHistory.sourceSubCityId}</td>
                  <td>{vehicleMovementHistory.destinationSubCityId}</td>
                  <td>
                    <Translate contentKey={`prospectServiceApp.MovementType.${vehicleMovementHistory.movementType}`} />
                  </td>
                  <td>{vehicleMovementHistory.retrivalAgentMaxId}</td>
                  <td>{vehicleMovementHistory.odometerReadingOutward}</td>
                  <td>{vehicleMovementHistory.odometerReadingInward}</td>
                  <td>
                    {vehicleMovementHistory.vehicle ? (
                      <Link to={`vehicle/${vehicleMovementHistory.vehicle.id}`}>{vehicleMovementHistory.vehicle.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {vehicleMovementHistory.vehicleMovement ? (
                      <Link to={`vehicle-movement/${vehicleMovementHistory.vehicleMovement.id}`}>
                        {vehicleMovementHistory.vehicleMovement.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleMovementHistory.id}`}
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
                        to={`${match.url}/${vehicleMovementHistory.id}/edit`}
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
                        to={`${match.url}/${vehicleMovementHistory.id}/delete`}
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
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.home.notFound">
                No Vehicle Movement Histories found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleMovementHistory }: IRootState) => ({
  vehicleMovementHistoryList: vehicleMovementHistory.entities,
  loading: vehicleMovementHistory.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementHistory);
