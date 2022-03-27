// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-status-change-reason.reducer';
import { IVehicleStatusChangeReason } from 'app/shared/model/vehicle-status-change-reason.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleStatusChangeReasonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleStatusChangeReason = (props: IVehicleStatusChangeReasonProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleStatusChangeReasonList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-status-change-reason-heading" data-cy="VehicleStatusChangeReasonHeading">
        <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.home.title">Vehicle Status Change Reasons</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.home.createLabel">
              Create new Vehicle Status Change Reason
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleStatusChangeReasonList && vehicleStatusChangeReasonList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.vehicleStatus">Vehicle Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleStatusChangeReasonList.map((vehicleStatusChangeReason, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleStatusChangeReason.id}`} color="link" size="sm">
                      {vehicleStatusChangeReason.id}
                    </Button>
                  </td>
                  <td>{vehicleStatusChangeReason.code}</td>
                  <td>{vehicleStatusChangeReason.displayName}</td>
                  <td>{vehicleStatusChangeReason.description}</td>
                  <td>
                    {vehicleStatusChangeReason.vehicleStatus ? (
                      <Link to={`vehicle-status/${vehicleStatusChangeReason.vehicleStatus.id}`}>
                        {vehicleStatusChangeReason.vehicleStatus.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleStatusChangeReason.id}`}
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
                        to={`${match.url}/${vehicleStatusChangeReason.id}/edit`}
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
                        to={`${match.url}/${vehicleStatusChangeReason.id}/delete`}
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
              <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.home.notFound">
                No Vehicle Status Change Reasons found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleStatusChangeReason }: IRootState) => ({
  vehicleStatusChangeReasonList: vehicleStatusChangeReason.entities,
  loading: vehicleStatusChangeReason.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleStatusChangeReason);
