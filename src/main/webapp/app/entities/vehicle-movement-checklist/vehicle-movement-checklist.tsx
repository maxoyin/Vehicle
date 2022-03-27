// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-movement-checklist.reducer';
import { IVehicleMovementChecklist } from 'app/shared/model/vehicle-movement-checklist.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMovementChecklistProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleMovementChecklist = (props: IVehicleMovementChecklistProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleMovementChecklistList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-movement-checklist-heading" data-cy="VehicleMovementChecklistHeading">
        <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.home.title">Vehicle Movement Checklists</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.home.createLabel">
              Create new Vehicle Movement Checklist
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleMovementChecklistList && vehicleMovementChecklistList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.itemStatus">Item Status</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.vehicleMovement">Vehicle Movement</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.vehicleMovementHistory">
                    Vehicle Movement History
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleMovementChecklistList.map((vehicleMovementChecklist, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleMovementChecklist.id}`} color="link" size="sm">
                      {vehicleMovementChecklist.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`prospectServiceApp.VehicleMovementChecklistStatus.${vehicleMovementChecklist.itemStatus}`} />
                  </td>
                  <td>
                    {vehicleMovementChecklist.vehicleMovement ? (
                      <Link to={`vehicle-movement/${vehicleMovementChecklist.vehicleMovement.id}`}>
                        {vehicleMovementChecklist.vehicleMovement.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {vehicleMovementChecklist.vehicleMovementHistory ? (
                      <Link to={`vehicle-movement-history/${vehicleMovementChecklist.vehicleMovementHistory.id}`}>
                        {vehicleMovementChecklist.vehicleMovementHistory.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleMovementChecklist.id}`}
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
                        to={`${match.url}/${vehicleMovementChecklist.id}/edit`}
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
                        to={`${match.url}/${vehicleMovementChecklist.id}/delete`}
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
              <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.home.notFound">
                No Vehicle Movement Checklists found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleMovementChecklist }: IRootState) => ({
  vehicleMovementChecklistList: vehicleMovementChecklist.entities,
  loading: vehicleMovementChecklist.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementChecklist);
