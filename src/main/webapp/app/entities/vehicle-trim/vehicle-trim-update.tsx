import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicleModel } from 'app/shared/model/vehicle-model.model';
import { getEntities as getVehicleModels } from 'app/entities/vehicle-model/vehicle-model.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-trim.reducer';
import { IVehicleTrim } from 'app/shared/model/vehicle-trim.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleTrimUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleTrimUpdate = (props: IVehicleTrimUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleTrimEntity, vehicleModels, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-trim');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVehicleModels();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleTrimEntity,
        ...values,
        vehicleModel: vehicleModels.find(it => it.id.toString() === values.vehicleModelId.toString()),
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
          <h2 id="prospectServiceApp.vehicleTrim.home.createOrEditLabel" data-cy="VehicleTrimCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleTrim.home.createOrEditLabel">Create or edit a VehicleTrim</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleTrimEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-trim-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-trim-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="vehicle-trim-code">
                  <Translate contentKey="prospectServiceApp.vehicleTrim.code">Code</Translate>
                </Label>
                <AvField
                  id="vehicle-trim-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="codeLabel">
                  <Translate contentKey="prospectServiceApp.vehicleTrim.help.code" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="vehicle-trim-displayName">
                  <Translate contentKey="prospectServiceApp.vehicleTrim.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="vehicle-trim-displayName"
                  data-cy="displayName"
                  type="text"
                  name="displayName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="displayNameLabel">
                  <Translate contentKey="prospectServiceApp.vehicleTrim.help.displayName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup check>
                <Label id="isDisplayOnLabel">
                  <AvInput
                    id="vehicle-trim-isDisplayOn"
                    data-cy="isDisplayOn"
                    type="checkbox"
                    className="form-check-input"
                    name="isDisplayOn"
                  />
                  <Translate contentKey="prospectServiceApp.vehicleTrim.isDisplayOn">Is Display On</Translate>
                </Label>
                <UncontrolledTooltip target="isDisplayOnLabel">
                  <Translate contentKey="prospectServiceApp.vehicleTrim.help.isDisplayOn" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-trim-description">
                  <Translate contentKey="prospectServiceApp.vehicleTrim.description">Description</Translate>
                </Label>
                <AvField id="vehicle-trim-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-trim-vehicleModel">
                  <Translate contentKey="prospectServiceApp.vehicleTrim.vehicleModel">Vehicle Model</Translate>
                </Label>
                <AvInput id="vehicle-trim-vehicleModel" data-cy="vehicleModel" type="select" className="form-control" name="vehicleModelId">
                  <option value="" key="0" />
                  {vehicleModels
                    ? vehicleModels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-trim" replace color="info">
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
  vehicleModels: storeState.vehicleModel.entities,
  vehicleTrimEntity: storeState.vehicleTrim.entity,
  loading: storeState.vehicleTrim.loading,
  updating: storeState.vehicleTrim.updating,
  updateSuccess: storeState.vehicleTrim.updateSuccess,
});

const mapDispatchToProps = {
  getVehicleModels,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTrimUpdate);
