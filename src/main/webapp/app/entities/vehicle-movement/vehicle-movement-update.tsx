import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicle } from 'app/shared/model/vehicle.model';
import { getEntities as getVehicles } from 'app/entities/vehicle/vehicle.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-movement.reducer';
import { IVehicleMovement } from 'app/shared/model/vehicle-movement.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleMovementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMovementUpdate = (props: IVehicleMovementUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleMovementEntity, vehicles, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-movement');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVehicles();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleMovementEntity,
        ...values,
        vehicle: vehicles.find(it => it.id.toString() === values.vehicleId.toString()),
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
          <h2 id="prospectServiceApp.vehicleMovement.home.createOrEditLabel" data-cy="VehicleMovementCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleMovement.home.createOrEditLabel">Create or edit a VehicleMovement</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleMovementEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-movement-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-movement-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sourceSubCityIdLabel" for="vehicle-movement-sourceSubCityId">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.sourceSubCityId">Source Sub City Id</Translate>
                </Label>
                <AvField
                  id="vehicle-movement-sourceSubCityId"
                  data-cy="sourceSubCityId"
                  type="text"
                  name="sourceSubCityId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="sourceSubCityIdLabel">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.help.sourceSubCityId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="destinationSubCityIdLabel" for="vehicle-movement-destinationSubCityId">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.destinationSubCityId">Destination Sub City Id</Translate>
                </Label>
                <AvField
                  id="vehicle-movement-destinationSubCityId"
                  data-cy="destinationSubCityId"
                  type="text"
                  name="destinationSubCityId"
                />
              </AvGroup>
              <AvGroup>
                <Label id="movementTypeLabel" for="vehicle-movement-movementType">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.movementType">Movement Type</Translate>
                </Label>
                <AvInput
                  id="vehicle-movement-movementType"
                  data-cy="movementType"
                  type="select"
                  className="form-control"
                  name="movementType"
                  value={(!isNew && vehicleMovementEntity.movementType) || 'ENTRY'}
                >
                  <option value="ENTRY">{translate('prospectServiceApp.MovementType.ENTRY')}</option>
                  <option value="EXIT">{translate('prospectServiceApp.MovementType.EXIT')}</option>
                </AvInput>
                <UncontrolledTooltip target="movementTypeLabel">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.help.movementType" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="retrievalAgentMaxIdLabel" for="vehicle-movement-retrievalAgentMaxId">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.retrievalAgentMaxId">Retrieval Agent Max Id</Translate>
                </Label>
                <AvField
                  id="vehicle-movement-retrievalAgentMaxId"
                  data-cy="retrievalAgentMaxId"
                  type="text"
                  name="retrievalAgentMaxId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="odometerReadingOutwardLabel" for="vehicle-movement-odometerReadingOutward">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.odometerReadingOutward">Odometer Reading Outward</Translate>
                </Label>
                <AvField
                  id="vehicle-movement-odometerReadingOutward"
                  data-cy="odometerReadingOutward"
                  type="string"
                  className="form-control"
                  name="odometerReadingOutward"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
                <UncontrolledTooltip target="odometerReadingOutwardLabel">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.help.odometerReadingOutward" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="odometerReadingInwardLabel" for="vehicle-movement-odometerReadingInward">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.odometerReadingInward">Odometer Reading Inward</Translate>
                </Label>
                <AvField
                  id="vehicle-movement-odometerReadingInward"
                  data-cy="odometerReadingInward"
                  type="string"
                  className="form-control"
                  name="odometerReadingInward"
                />
                <UncontrolledTooltip target="odometerReadingInwardLabel">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.help.odometerReadingInward" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-movement-vehicle">
                  <Translate contentKey="prospectServiceApp.vehicleMovement.vehicle">Vehicle</Translate>
                </Label>
                <AvInput id="vehicle-movement-vehicle" data-cy="vehicle" type="select" className="form-control" name="vehicleId">
                  <option value="" key="0" />
                  {vehicles
                    ? vehicles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-movement" replace color="info">
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
  vehicles: storeState.vehicle.entities,
  vehicleMovementEntity: storeState.vehicleMovement.entity,
  loading: storeState.vehicleMovement.loading,
  updating: storeState.vehicleMovement.updating,
  updateSuccess: storeState.vehicleMovement.updateSuccess,
});

const mapDispatchToProps = {
  getVehicles,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementUpdate);
