import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicleManufacturer } from 'app/shared/model/vehicle-manufacturer.model';
import { getEntities as getVehicleManufacturers } from 'app/entities/vehicle-manufacturer/vehicle-manufacturer.reducer';
import { IVehicleType } from 'app/shared/model/vehicle-type.model';
import { getEntities as getVehicleTypes } from 'app/entities/vehicle-type/vehicle-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-model.reducer';
import { IVehicleModel } from 'app/shared/model/vehicle-model.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleModelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleModelUpdate = (props: IVehicleModelUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleModelEntity, vehicleManufacturers, vehicleTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-model');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVehicleManufacturers();
    props.getVehicleTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleModelEntity,
        ...values,
        vehicleManufacturer: vehicleManufacturers.find(it => it.id.toString() === values.vehicleManufacturerId.toString()),
        vehicleType: vehicleTypes.find(it => it.id.toString() === values.vehicleTypeId.toString()),
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
          <h2 id="prospectServiceApp.vehicleModel.home.createOrEditLabel" data-cy="VehicleModelCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleModel.home.createOrEditLabel">Create or edit a VehicleModel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleModelEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-model-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-model-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="vehicle-model-code">
                  <Translate contentKey="prospectServiceApp.vehicleModel.code">Code</Translate>
                </Label>
                <AvField
                  id="vehicle-model-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="vehicle-model-displayName">
                  <Translate contentKey="prospectServiceApp.vehicleModel.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="vehicle-model-displayName"
                  data-cy="displayName"
                  type="text"
                  name="displayName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="isDisplayOnLabel">
                  <AvInput
                    id="vehicle-model-isDisplayOn"
                    data-cy="isDisplayOn"
                    type="checkbox"
                    className="form-check-input"
                    name="isDisplayOn"
                  />
                  <Translate contentKey="prospectServiceApp.vehicleModel.isDisplayOn">Is Display On</Translate>
                </Label>
                <UncontrolledTooltip target="isDisplayOnLabel">
                  <Translate contentKey="prospectServiceApp.vehicleModel.help.isDisplayOn" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="modelYearLabel" for="vehicle-model-modelYear">
                  <Translate contentKey="prospectServiceApp.vehicleModel.modelYear">Model Year</Translate>
                </Label>
                <AvField id="vehicle-model-modelYear" data-cy="modelYear" type="date" className="form-control" name="modelYear" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-model-description">
                  <Translate contentKey="prospectServiceApp.vehicleModel.description">Description</Translate>
                </Label>
                <AvField id="vehicle-model-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-model-vehicleManufacturer">
                  <Translate contentKey="prospectServiceApp.vehicleModel.vehicleManufacturer">Vehicle Manufacturer</Translate>
                </Label>
                <AvInput
                  id="vehicle-model-vehicleManufacturer"
                  data-cy="vehicleManufacturer"
                  type="select"
                  className="form-control"
                  name="vehicleManufacturerId"
                >
                  <option value="" key="0" />
                  {vehicleManufacturers
                    ? vehicleManufacturers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-model-vehicleType">
                  <Translate contentKey="prospectServiceApp.vehicleModel.vehicleType">Vehicle Type</Translate>
                </Label>
                <AvInput id="vehicle-model-vehicleType" data-cy="vehicleType" type="select" className="form-control" name="vehicleTypeId">
                  <option value="" key="0" />
                  {vehicleTypes
                    ? vehicleTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-model" replace color="info">
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
  vehicleManufacturers: storeState.vehicleManufacturer.entities,
  vehicleTypes: storeState.vehicleType.entities,
  vehicleModelEntity: storeState.vehicleModel.entity,
  loading: storeState.vehicleModel.loading,
  updating: storeState.vehicleModel.updating,
  updateSuccess: storeState.vehicleModel.updateSuccess,
});

const mapDispatchToProps = {
  getVehicleManufacturers,
  getVehicleTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleModelUpdate);
