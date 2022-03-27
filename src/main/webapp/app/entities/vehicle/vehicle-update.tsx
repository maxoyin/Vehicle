import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicleMovement } from 'app/shared/model/vehicle-movement.model';
import { getEntities as getVehicleMovements } from 'app/entities/vehicle-movement/vehicle-movement.reducer';
import { IVehicleMovementHistory } from 'app/shared/model/vehicle-movement-history.model';
import { getEntities as getVehicleMovementHistories } from 'app/entities/vehicle-movement-history/vehicle-movement-history.reducer';
import { IVehicleTrim } from 'app/shared/model/vehicle-trim.model';
import { getEntities as getVehicleTrims } from 'app/entities/vehicle-trim/vehicle-trim.reducer';
import { IVehicleStatus } from 'app/shared/model/vehicle-status.model';
import { getEntities as getVehicleStatuses } from 'app/entities/vehicle-status/vehicle-status.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleUpdate = (props: IVehicleUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleEntity, vehicleMovements, vehicleMovementHistories, vehicleTrims, vehicleStatuses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVehicleMovements();
    props.getVehicleMovementHistories();
    props.getVehicleTrims();
    props.getVehicleStatuses();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleEntity,
        ...values,
        vehicleMovement: vehicleMovements.find(it => it.id.toString() === values.vehicleMovementId.toString()),
        vehicleMovementHistory: vehicleMovementHistories.find(it => it.id.toString() === values.vehicleMovementHistoryId.toString()),
        vehicleTrim: vehicleTrims.find(it => it.id.toString() === values.vehicleTrimId.toString()),
        vehicleStatus: vehicleStatuses.find(it => it.id.toString() === values.vehicleStatusId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="prospectServiceApp.vehicle.home.createOrEditLabel" data-cy="VehicleCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicle.home.createOrEditLabel">Create or edit a Vehicle</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="maxVehicleIdLabel" for="vehicle-maxVehicleId">
                  <Translate contentKey="prospectServiceApp.vehicle.maxVehicleId">Max Vehicle Id</Translate>
                </Label>
                <AvField
                  id="vehicle-maxVehicleId"
                  data-cy="maxVehicleId"
                  type="text"
                  name="maxVehicleId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="maxVehicleIdLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.maxVehicleId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="subCityIdLabel" for="vehicle-subCityId">
                  <Translate contentKey="prospectServiceApp.vehicle.subCityId">Sub City Id</Translate>
                </Label>
                <AvField
                  id="vehicle-subCityId"
                  data-cy="subCityId"
                  type="text"
                  name="subCityId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="subCityIdLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.subCityId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="chassisNumberLabel" for="vehicle-chassisNumber">
                  <Translate contentKey="prospectServiceApp.vehicle.chassisNumber">Chassis Number</Translate>
                </Label>
                <AvField
                  id="vehicle-chassisNumber"
                  data-cy="chassisNumber"
                  type="text"
                  name="chassisNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="ignitionNumberLabel" for="vehicle-ignitionNumber">
                  <Translate contentKey="prospectServiceApp.vehicle.ignitionNumber">Ignition Number</Translate>
                </Label>
                <AvField
                  id="vehicle-ignitionNumber"
                  data-cy="ignitionNumber"
                  type="text"
                  name="ignitionNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="engineNumberLabel" for="vehicle-engineNumber">
                  <Translate contentKey="prospectServiceApp.vehicle.engineNumber">Engine Number</Translate>
                </Label>
                <AvField
                  id="vehicle-engineNumber"
                  data-cy="engineNumber"
                  type="text"
                  name="engineNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="vehicleColorLabel" for="vehicle-vehicleColor">
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleColor">Vehicle Color</Translate>
                </Label>
                <AvField
                  id="vehicle-vehicleColor"
                  data-cy="vehicleColor"
                  type="text"
                  name="vehicleColor"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="oemVendorNameLabel" for="vehicle-oemVendorName">
                  <Translate contentKey="prospectServiceApp.vehicle.oemVendorName">Oem Vendor Name</Translate>
                </Label>
                <AvField
                  id="vehicle-oemVendorName"
                  data-cy="oemVendorName"
                  type="text"
                  name="oemVendorName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="receiverLabel" for="vehicle-receiver">
                  <Translate contentKey="prospectServiceApp.vehicle.receiver">Receiver</Translate>
                </Label>
                <AvField
                  id="vehicle-receiver"
                  data-cy="receiver"
                  type="text"
                  name="receiver"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="serviceTypeCodeLabel" for="vehicle-serviceTypeCode">
                  <Translate contentKey="prospectServiceApp.vehicle.serviceTypeCode">Service Type Code</Translate>
                </Label>
                <AvField id="vehicle-serviceTypeCode" data-cy="serviceTypeCode" type="text" name="serviceTypeCode" />
                <UncontrolledTooltip target="serviceTypeCodeLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.serviceTypeCode" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="partnerCodeLabel" for="vehicle-partnerCode">
                  <Translate contentKey="prospectServiceApp.vehicle.partnerCode">Partner Code</Translate>
                </Label>
                <AvField id="vehicle-partnerCode" data-cy="partnerCode" type="text" name="partnerCode" />
                <UncontrolledTooltip target="partnerCodeLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.partnerCode" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="platformCodeLabel" for="vehicle-platformCode">
                  <Translate contentKey="prospectServiceApp.vehicle.platformCode">Platform Code</Translate>
                </Label>
                <AvField id="vehicle-platformCode" data-cy="platformCode" type="text" name="platformCode" />
                <UncontrolledTooltip target="platformCodeLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.platformCode" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="plateNumberLabel" for="vehicle-plateNumber">
                  <Translate contentKey="prospectServiceApp.vehicle.plateNumber">Plate Number</Translate>
                </Label>
                <AvField id="vehicle-plateNumber" data-cy="plateNumber" type="text" name="plateNumber" />
                <UncontrolledTooltip target="plateNumberLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.plateNumber" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="licenseExpirationDateLabel" for="vehicle-licenseExpirationDate">
                  <Translate contentKey="prospectServiceApp.vehicle.licenseExpirationDate">License Expiration Date</Translate>
                </Label>
                <AvField
                  id="vehicle-licenseExpirationDate"
                  data-cy="licenseExpirationDate"
                  type="date"
                  className="form-control"
                  name="licenseExpirationDate"
                />
                <UncontrolledTooltip target="licenseExpirationDateLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.licenseExpirationDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="pricingTemplateIdLabel" for="vehicle-pricingTemplateId">
                  <Translate contentKey="prospectServiceApp.vehicle.pricingTemplateId">Pricing Template Id</Translate>
                </Label>
                <AvField id="vehicle-pricingTemplateId" data-cy="pricingTemplateId" type="text" name="pricingTemplateId" />
                <UncontrolledTooltip target="pricingTemplateIdLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.pricingTemplateId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="deviceImeiLabel" for="vehicle-deviceImei">
                  <Translate contentKey="prospectServiceApp.vehicle.deviceImei">Device Imei</Translate>
                </Label>
                <AvField id="vehicle-deviceImei" data-cy="deviceImei" type="text" name="deviceImei" />
                <UncontrolledTooltip target="deviceImeiLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.deviceImei" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="simSerialNumberLabel" for="vehicle-simSerialNumber">
                  <Translate contentKey="prospectServiceApp.vehicle.simSerialNumber">Sim Serial Number</Translate>
                </Label>
                <AvField id="vehicle-simSerialNumber" data-cy="simSerialNumber" type="text" name="simSerialNumber" />
                <UncontrolledTooltip target="simSerialNumberLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.simSerialNumber" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="devicePhoneLabel" for="vehicle-devicePhone">
                  <Translate contentKey="prospectServiceApp.vehicle.devicePhone">Device Phone</Translate>
                </Label>
                <AvField id="vehicle-devicePhone" data-cy="devicePhone" type="text" name="devicePhone" />
                <UncontrolledTooltip target="devicePhoneLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.devicePhone" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="batchIdLabel" for="vehicle-batchId">
                  <Translate contentKey="prospectServiceApp.vehicle.batchId">Batch Id</Translate>
                </Label>
                <AvField id="vehicle-batchId" data-cy="batchId" type="string" className="form-control" name="batchId" />
                <UncontrolledTooltip target="batchIdLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.batchId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup check>
                <Label id="isMaxVehicleLabel">
                  <AvInput
                    id="vehicle-isMaxVehicle"
                    data-cy="isMaxVehicle"
                    type="checkbox"
                    className="form-check-input"
                    name="isMaxVehicle"
                  />
                  <Translate contentKey="prospectServiceApp.vehicle.isMaxVehicle">Is Max Vehicle</Translate>
                </Label>
                <UncontrolledTooltip target="isMaxVehicleLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.isMaxVehicle" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="maxGlobalIdLabel" for="vehicle-maxGlobalId">
                  <Translate contentKey="prospectServiceApp.vehicle.maxGlobalId">Max Global Id</Translate>
                </Label>
                <AvField id="vehicle-maxGlobalId" data-cy="maxGlobalId" type="text" name="maxGlobalId" />
                <UncontrolledTooltip target="maxGlobalIdLabel">
                  <Translate contentKey="prospectServiceApp.vehicle.help.maxGlobalId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-vehicleMovement">
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleMovement">Vehicle Movement</Translate>
                </Label>
                <AvInput
                  id="vehicle-vehicleMovement"
                  data-cy="vehicleMovement"
                  type="select"
                  className="form-control"
                  name="vehicleMovementId"
                >
                  <option value="" key="0" />
                  {vehicleMovements
                    ? vehicleMovements.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-vehicleMovementHistory">
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleMovementHistory">Vehicle Movement History</Translate>
                </Label>
                <AvInput
                  id="vehicle-vehicleMovementHistory"
                  data-cy="vehicleMovementHistory"
                  type="select"
                  className="form-control"
                  name="vehicleMovementHistoryId"
                >
                  <option value="" key="0" />
                  {vehicleMovementHistories
                    ? vehicleMovementHistories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-vehicleTrim">
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleTrim">Vehicle Trim</Translate>
                </Label>
                <AvInput id="vehicle-vehicleTrim" data-cy="vehicleTrim" type="select" className="form-control" name="vehicleTrimId">
                  <option value="" key="0" />
                  {vehicleTrims
                    ? vehicleTrims.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-vehicleStatus">
                  <Translate contentKey="prospectServiceApp.vehicle.vehicleStatus">Vehicle Status</Translate>
                </Label>
                <AvInput id="vehicle-vehicleStatus" data-cy="vehicleStatus" type="select" className="form-control" name="vehicleStatusId">
                  <option value="" key="0" />
                  {vehicleStatuses
                    ? vehicleStatuses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  vehicleMovements: storeState.vehicleMovement.entities,
  vehicleMovementHistories: storeState.vehicleMovementHistory.entities,
  vehicleTrims: storeState.vehicleTrim.entities,
  vehicleStatuses: storeState.vehicleStatus.entities,
  vehicleEntity: storeState.vehicle.entity,
  loading: storeState.vehicle.loading,
  updating: storeState.vehicle.updating,
  updateSuccess: storeState.vehicle.updateSuccess,
});

const mapDispatchToProps = {
  getVehicleMovements,
  getVehicleMovementHistories,
  getVehicleTrims,
  getVehicleStatuses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleUpdate);
