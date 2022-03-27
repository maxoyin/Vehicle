// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-trim.reducer';
import { IVehicleTrim } from 'app/shared/model/vehicle-trim.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleTrimProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleTrim = (props: IVehicleTrimProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleTrimList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-trim-heading" data-cy="VehicleTrimHeading">
        <Translate contentKey="prospectServiceApp.vehicleTrim.home.title">Vehicle Trims</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicleTrim.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicleTrim.home.createLabel">Create new Vehicle Trim</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleTrimList && vehicleTrimList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleTrim.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleTrim.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleTrim.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleTrim.isDisplayOn">Is Display On</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleTrim.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleTrim.vehicleModel">Vehicle Model</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleTrimList.map((vehicleTrim, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleTrim.id}`} color="link" size="sm">
                      {vehicleTrim.id}
                    </Button>
                  </td>
                  <td>{vehicleTrim.code}</td>
                  <td>{vehicleTrim.displayName}</td>
                  <td>{vehicleTrim.isDisplayOn ? 'true' : 'false'}</td>
                  <td>{vehicleTrim.description}</td>
                  <td>
                    {vehicleTrim.vehicleModel ? (
                      <Link to={`vehicle-model/${vehicleTrim.vehicleModel.id}`}>{vehicleTrim.vehicleModel.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicleTrim.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleTrim.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleTrim.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="prospectServiceApp.vehicleTrim.home.notFound">No Vehicle Trims found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleTrim }: IRootState) => ({
  vehicleTrimList: vehicleTrim.entities,
  loading: vehicleTrim.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTrim);
