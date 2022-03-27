// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-manufacturer.reducer';
import { IVehicleManufacturer } from 'app/shared/model/vehicle-manufacturer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleManufacturerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleManufacturer = (props: IVehicleManufacturerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleManufacturerList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-manufacturer-heading" data-cy="VehicleManufacturerHeading">
        <Translate contentKey="prospectServiceApp.vehicleManufacturer.home.title">Vehicle Manufacturers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicleManufacturer.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicleManufacturer.home.createLabel">Create new Vehicle Manufacturer</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleManufacturerList && vehicleManufacturerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.isDisplayOn">Is Display On</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.description">Description</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleManufacturerList.map((vehicleManufacturer, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleManufacturer.id}`} color="link" size="sm">
                      {vehicleManufacturer.id}
                    </Button>
                  </td>
                  <td>{vehicleManufacturer.code}</td>
                  <td>{vehicleManufacturer.displayName}</td>
                  <td>{vehicleManufacturer.isDisplayOn ? 'true' : 'false'}</td>
                  <td>{vehicleManufacturer.description}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicleManufacturer.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleManufacturer.id}/edit`}
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
                        to={`${match.url}/${vehicleManufacturer.id}/delete`}
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
              <Translate contentKey="prospectServiceApp.vehicleManufacturer.home.notFound">No Vehicle Manufacturers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleManufacturer }: IRootState) => ({
  vehicleManufacturerList: vehicleManufacturer.entities,
  loading: vehicleManufacturer.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleManufacturer);
