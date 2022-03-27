import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleDetail = (props: IVehicleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicle.detail.title">Vehicle</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.id}</dd>
          <dt>
            <span id="maxVehicleId">
              <Translate contentKey="prospectServiceApp.vehicle.maxVehicleId">Max Vehicle Id</Translate>
            </span>
            <UncontrolledTooltip target="maxVehicleId">
              <Translate contentKey="prospectServiceApp.vehicle.help.maxVehicleId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.maxVehicleId}</dd>
          <dt>
            <span id="subCityId">
              <Translate contentKey="prospectServiceApp.vehicle.subCityId">Sub City Id</Translate>
            </span>
            <UncontrolledTooltip target="subCityId">
              <Translate contentKey="prospectServiceApp.vehicle.help.subCityId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.subCityId}</dd>
          <dt>
            <span id="chassisNumber">
              <Translate contentKey="prospectServiceApp.vehicle.chassisNumber">Chassis Number</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.chassisNumber}</dd>
          <dt>
            <span id="ignitionNumber">
              <Translate contentKey="prospectServiceApp.vehicle.ignitionNumber">Ignition Number</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.ignitionNumber}</dd>
          <dt>
            <span id="engineNumber">
              <Translate contentKey="prospectServiceApp.vehicle.engineNumber">Engine Number</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.engineNumber}</dd>
          <dt>
            <span id="vehicleColor">
              <Translate contentKey="prospectServiceApp.vehicle.vehicleColor">Vehicle Color</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.vehicleColor}</dd>
          <dt>
            <span id="oemVendorName">
              <Translate contentKey="prospectServiceApp.vehicle.oemVendorName">Oem Vendor Name</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.oemVendorName}</dd>
          <dt>
            <span id="receiver">
              <Translate contentKey="prospectServiceApp.vehicle.receiver">Receiver</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.receiver}</dd>
          <dt>
            <span id="serviceTypeCode">
              <Translate contentKey="prospectServiceApp.vehicle.serviceTypeCode">Service Type Code</Translate>
            </span>
            <UncontrolledTooltip target="serviceTypeCode">
              <Translate contentKey="prospectServiceApp.vehicle.help.serviceTypeCode" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.serviceTypeCode}</dd>
          <dt>
            <span id="partnerCode">
              <Translate contentKey="prospectServiceApp.vehicle.partnerCode">Partner Code</Translate>
            </span>
            <UncontrolledTooltip target="partnerCode">
              <Translate contentKey="prospectServiceApp.vehicle.help.partnerCode" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.partnerCode}</dd>
          <dt>
            <span id="platformCode">
              <Translate contentKey="prospectServiceApp.vehicle.platformCode">Platform Code</Translate>
            </span>
            <UncontrolledTooltip target="platformCode">
              <Translate contentKey="prospectServiceApp.vehicle.help.platformCode" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.platformCode}</dd>
          <dt>
            <span id="plateNumber">
              <Translate contentKey="prospectServiceApp.vehicle.plateNumber">Plate Number</Translate>
            </span>
            <UncontrolledTooltip target="plateNumber">
              <Translate contentKey="prospectServiceApp.vehicle.help.plateNumber" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.plateNumber}</dd>
          <dt>
            <span id="licenseExpirationDate">
              <Translate contentKey="prospectServiceApp.vehicle.licenseExpirationDate">License Expiration Date</Translate>
            </span>
            <UncontrolledTooltip target="licenseExpirationDate">
              <Translate contentKey="prospectServiceApp.vehicle.help.licenseExpirationDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {vehicleEntity.licenseExpirationDate ? (
              <TextFormat value={vehicleEntity.licenseExpirationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="pricingTemplateId">
              <Translate contentKey="prospectServiceApp.vehicle.pricingTemplateId">Pricing Template Id</Translate>
            </span>
            <UncontrolledTooltip target="pricingTemplateId">
              <Translate contentKey="prospectServiceApp.vehicle.help.pricingTemplateId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.pricingTemplateId}</dd>
          <dt>
            <span id="deviceImei">
              <Translate contentKey="prospectServiceApp.vehicle.deviceImei">Device Imei</Translate>
            </span>
            <UncontrolledTooltip target="deviceImei">
              <Translate contentKey="prospectServiceApp.vehicle.help.deviceImei" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.deviceImei}</dd>
          <dt>
            <span id="simSerialNumber">
              <Translate contentKey="prospectServiceApp.vehicle.simSerialNumber">Sim Serial Number</Translate>
            </span>
            <UncontrolledTooltip target="simSerialNumber">
              <Translate contentKey="prospectServiceApp.vehicle.help.simSerialNumber" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.simSerialNumber}</dd>
          <dt>
            <span id="devicePhone">
              <Translate contentKey="prospectServiceApp.vehicle.devicePhone">Device Phone</Translate>
            </span>
            <UncontrolledTooltip target="devicePhone">
              <Translate contentKey="prospectServiceApp.vehicle.help.devicePhone" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.devicePhone}</dd>
          <dt>
            <span id="batchId">
              <Translate contentKey="prospectServiceApp.vehicle.batchId">Batch Id</Translate>
            </span>
            <UncontrolledTooltip target="batchId">
              <Translate contentKey="prospectServiceApp.vehicle.help.batchId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.batchId}</dd>
          <dt>
            <span id="isMaxVehicle">
              <Translate contentKey="prospectServiceApp.vehicle.isMaxVehicle">Is Max Vehicle</Translate>
            </span>
            <UncontrolledTooltip target="isMaxVehicle">
              <Translate contentKey="prospectServiceApp.vehicle.help.isMaxVehicle" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.isMaxVehicle ? 'true' : 'false'}</dd>
          <dt>
            <span id="maxGlobalId">
              <Translate contentKey="prospectServiceApp.vehicle.maxGlobalId">Max Global Id</Translate>
            </span>
            <UncontrolledTooltip target="maxGlobalId">
              <Translate contentKey="prospectServiceApp.vehicle.help.maxGlobalId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleEntity.maxGlobalId}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicle.vehicleMovement">Vehicle Movement</Translate>
          </dt>
          <dd>{vehicleEntity.vehicleMovement ? vehicleEntity.vehicleMovement.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicle.vehicleMovementHistory">Vehicle Movement History</Translate>
          </dt>
          <dd>{vehicleEntity.vehicleMovementHistory ? vehicleEntity.vehicleMovementHistory.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicle.vehicleTrim">Vehicle Trim</Translate>
          </dt>
          <dd>{vehicleEntity.vehicleTrim ? vehicleEntity.vehicleTrim.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicle.vehicleStatus">Vehicle Status</Translate>
          </dt>
          <dd>{vehicleEntity.vehicleStatus ? vehicleEntity.vehicleStatus.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle/${vehicleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicle }: IRootState) => ({
  vehicleEntity: vehicle.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);
