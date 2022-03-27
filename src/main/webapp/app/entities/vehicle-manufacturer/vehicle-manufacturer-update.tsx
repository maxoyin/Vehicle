import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle-manufacturer.reducer';
import { IVehicleManufacturer } from 'app/shared/model/vehicle-manufacturer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleManufacturerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleManufacturerUpdate = (props: IVehicleManufacturerUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleManufacturerEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-manufacturer');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleManufacturerEntity,
        ...values,
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
          <h2 id="prospectServiceApp.vehicleManufacturer.home.createOrEditLabel" data-cy="VehicleManufacturerCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleManufacturer.home.createOrEditLabel">
              Create or edit a VehicleManufacturer
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleManufacturerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-manufacturer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-manufacturer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="vehicle-manufacturer-code">
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.code">Code</Translate>
                </Label>
                <AvField
                  id="vehicle-manufacturer-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="vehicle-manufacturer-displayName">
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="vehicle-manufacturer-displayName"
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
                    id="vehicle-manufacturer-isDisplayOn"
                    data-cy="isDisplayOn"
                    type="checkbox"
                    className="form-check-input"
                    name="isDisplayOn"
                  />
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.isDisplayOn">Is Display On</Translate>
                </Label>
                <UncontrolledTooltip target="isDisplayOnLabel">
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.help.isDisplayOn" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-manufacturer-description">
                  <Translate contentKey="prospectServiceApp.vehicleManufacturer.description">Description</Translate>
                </Label>
                <AvField id="vehicle-manufacturer-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-manufacturer" replace color="info">
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
  vehicleManufacturerEntity: storeState.vehicleManufacturer.entity,
  loading: storeState.vehicleManufacturer.loading,
  updating: storeState.vehicleManufacturer.updating,
  updateSuccess: storeState.vehicleManufacturer.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleManufacturerUpdate);
