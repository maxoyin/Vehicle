// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-stat-change-sub-reason.reducer';
import { IVehicleStatChangeSubReason } from 'app/shared/model/vehicle-stat-change-sub-reason.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleStatChangeSubReasonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleStatChangeSubReason = (props: IVehicleStatChangeSubReasonProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleStatChangeSubReasonList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-stat-change-sub-reason-heading" data-cy="VehicleStatChangeSubReasonHeading">
        <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.home.title">Vehicle Stat Change Sub Reasons</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.home.createLabel">
              Create new Vehicle Stat Change Sub Reason
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleStatChangeSubReasonList && vehicleStatChangeSubReasonList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.vehicleStatusChangeReason">
                    Vehicle Status Change Reason
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleStatChangeSubReasonList.map((vehicleStatChangeSubReason, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleStatChangeSubReason.id}`} color="link" size="sm">
                      {vehicleStatChangeSubReason.id}
                    </Button>
                  </td>
                  <td>{vehicleStatChangeSubReason.code}</td>
                  <td>{vehicleStatChangeSubReason.displayName}</td>
                  <td>{vehicleStatChangeSubReason.description}</td>
                  <td>
                    {vehicleStatChangeSubReason.vehicleStatusChangeReason ? (
                      <Link to={`vehicle-status-change-reason/${vehicleStatChangeSubReason.vehicleStatusChangeReason.id}`}>
                        {vehicleStatChangeSubReason.vehicleStatusChangeReason.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleStatChangeSubReason.id}`}
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
                        to={`${match.url}/${vehicleStatChangeSubReason.id}/edit`}
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
                        to={`${match.url}/${vehicleStatChangeSubReason.id}/delete`}
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
              <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.home.notFound">
                No Vehicle Stat Change Sub Reasons found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleStatChangeSubReason }: IRootState) => ({
  vehicleStatChangeSubReasonList: vehicleStatChangeSubReason.entities,
  loading: vehicleStatChangeSubReason.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleStatChangeSubReason);
