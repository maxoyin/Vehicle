// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-model.reducer';
import { IVehicleModel } from 'app/shared/model/vehicle-model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleModelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleModel = (props: IVehicleModelProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleModelList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-model-heading" data-cy="VehicleModelHeading">
        <Translate contentKey="prospectServiceApp.vehicleModel.home.title">Vehicle Models</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicleModel.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicleModel.home.createLabel">Create new Vehicle Model</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleModelList && vehicleModelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleModel.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleModel.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleModel.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleModel.isDisplayOn">Is Display On</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleModel.modelYear">Model Year</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleModel.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleModel.vehicleManufacturer">Vehicle Manufacturer</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicleModel.vehicleType">Vehicle Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleModelList.map((vehicleModel, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleModel.id}`} color="link" size="sm">
                      {vehicleModel.id}
                    </Button>
                  </td>
                  <td>{vehicleModel.code}</td>
                  <td>{vehicleModel.displayName}</td>
                  <td>{vehicleModel.isDisplayOn ? 'true' : 'false'}</td>
                  <td>
                    {vehicleModel.modelYear ? (
                      <TextFormat type="date" value={vehicleModel.modelYear} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{vehicleModel.description}</td>
                  <td>
                    {vehicleModel.vehicleManufacturer ? (
                      <Link to={`vehicle-manufacturer/${vehicleModel.vehicleManufacturer.id}`}>{vehicleModel.vehicleManufacturer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {vehicleModel.vehicleType ? (
                      <Link to={`vehicle-type/${vehicleModel.vehicleType.id}`}>{vehicleModel.vehicleType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicleModel.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleModel.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${vehicleModel.id}/delete`}
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
              <Translate contentKey="prospectServiceApp.vehicleModel.home.notFound">No Vehicle Models found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleModel }: IRootState) => ({
  vehicleModelList: vehicleModel.entities,
  loading: vehicleModel.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleModel);
