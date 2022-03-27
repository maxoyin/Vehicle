// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Vehicle = (props: IVehicleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-heading" data-cy="VehicleHeading">
        <Translate contentKey="prospectServiceApp.vehicle.home.title">Vehicles</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.vehicle.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.vehicle.home.createLabel">Create new Vehicle</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleList && vehicleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.maxVehicleId">Max Vehicle Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.subCityId">Sub City Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.chassisNumber">Chassis Number</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.ignitionNumber">Ignition Number</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.engineNumber">Engine Number</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleColor">Vehicle Color</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.oemVendorName">Oem Vendor Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.receiver">Receiver</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.serviceTypeCode">Service Type Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.partnerCode">Partner Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.platformCode">Platform Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.plateNumber">Plate Number</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.licenseExpirationDate">License Expiration Date</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.pricingTemplateId">Pricing Template Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.deviceImei">Device Imei</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.simSerialNumber">Sim Serial Number</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.devicePhone">Device Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.batchId">Batch Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.isMaxVehicle">Is Max Vehicle</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.maxGlobalId">Max Global Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleMovement">Vehicle Movement</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleMovementHistory">Vehicle Movement History</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleTrim">Vehicle Trim</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleStatus">Vehicle Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleList.map((vehicle, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicle.id}`} color="link" size="sm">
                      {vehicle.id}
                    </Button>
                  </td>
                  <td>{vehicle.maxVehicleId}</td>
                  <td>{vehicle.subCityId}</td>
                  <td>{vehicle.chassisNumber}</td>
                  <td>{vehicle.ignitionNumber}</td>
                  <td>{vehicle.engineNumber}</td>
                  <td>{vehicle.vehicleColor}</td>
                  <td>{vehicle.oemVendorName}</td>
                  <td>{vehicle.receiver}</td>
                  <td>{vehicle.serviceTypeCode}</td>
                  <td>{vehicle.partnerCode}</td>
                  <td>{vehicle.platformCode}</td>
                  <td>{vehicle.plateNumber}</td>
                  <td>
                    {vehicle.licenseExpirationDate ? (
                      <TextFormat type="date" value={vehicle.licenseExpirationDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{vehicle.pricingTemplateId}</td>
                  <td>{vehicle.deviceImei}</td>
                  <td>{vehicle.simSerialNumber}</td>
                  <td>{vehicle.devicePhone}</td>
                  <td>{vehicle.batchId}</td>
                  <td>{vehicle.isMaxVehicle ? 'true' : 'false'}</td>
                  <td>{vehicle.maxGlobalId}</td>
                  <td>
                    {vehicle.vehicleMovement ? (
                      <Link to={`vehicle-movement/${vehicle.vehicleMovement.id}`}>{vehicle.vehicleMovement.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {vehicle.vehicleMovementHistory ? (
                      <Link to={`vehicle-movement-history/${vehicle.vehicleMovementHistory.id}`}>{vehicle.vehicleMovementHistory.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{vehicle.vehicleTrim ? <Link to={`vehicle-trim/${vehicle.vehicleTrim.id}`}>{vehicle.vehicleTrim.id}</Link> : ''}</td>
                  <td>
                    {vehicle.vehicleStatus ? <Link to={`vehicle-status/${vehicle.vehicleStatus.id}`}>{vehicle.vehicleStatus.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicle.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicle.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicle.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="prospectServiceApp.vehicle.home.notFound">No Vehicles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicle }: IRootState) => ({
  vehicleList: vehicle.entities,
  loading: vehicle.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
