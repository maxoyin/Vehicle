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
import { IVehicleMovement } from 'app/shared/model/vehicle-movement.model';
import { getEntities as getVehicleMovements } from 'app/entities/vehicle-movement/vehicle-movement.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-movement-history.reducer';
import { IVehicleMovementHistory } from 'app/shared/model/vehicle-movement-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleMovementHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMovementHistoryUpdate = (props: IVehicleMovementHistoryUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleMovementHistoryEntity, vehicles, vehicleMovements, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-movement-history');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVehicles();
    props.getVehicleMovements();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleMovementHistoryEntity,
        ...values,
        vehicle: vehicles.find(it => it.id.toString() === values.vehicleId.toString()),
        vehicleMovement: vehicleMovements.find(it => it.id.toString() === values.vehicleMovementId.toString()),
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
          <h2 id="prospectServiceApp.vehicleMovementHistory.home.createOrEditLabel" data-cy="VehicleMovementHistoryCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleMovementHistory.home.createOrEditLabel">
              Create or edit a VehicleMovementHistory
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleMovementHistoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-movement-history-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-movement-history-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sourceSubCityIdLabel" for="vehicle-movement-history-sourceSubCityId">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.sourceSubCityId">Source Sub City Id</Translate>
                </Label>
                <AvField
                  id="vehicle-movement-history-sourceSubCityId"
                  data-cy="sourceSubCityId"
                  type="text"
                  name="sourceSubCityId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="sourceSubCityIdLabel">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.help.sourceSubCityId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="destinationSubCityIdLabel" for="vehicle-movement-history-destinationSubCityId">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.destinationSubCityId">Destination Sub City Id</Translate>
                </Label>
                <AvField
                  id="vehicle-movement-history-destinationSubCityId"
                  data-cy="destinationSubCityId"
                  type="text"
                  name="destinationSubCityId"
                />
              </AvGroup>
              <AvGroup>
                <Label id="movementTypeLabel" for="vehicle-movement-history-movementType">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.movementType">Movement Type</Translate>
                </Label>
                <AvInput
                  id="vehicle-movement-history-movementType"
                  data-cy="movementType"
                  type="select"
                  className="form-control"
                  name="movementType"
                  value={(!isNew && vehicleMovementHistoryEntity.movementType) || 'ENTRY'}
                >
                  <option value="ENTRY">{translate('prospectServiceApp.MovementType.ENTRY')}</option>
                  <option value="EXIT">{translate('prospectServiceApp.MovementType.EXIT')}</option>
                </AvInput>
                <UncontrolledTooltip target="movementTypeLabel">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.help.movementType" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="retrivalAgentMaxIdLabel" for="vehicle-movement-history-retrivalAgentMaxId">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.retrivalAgentMaxId">Retrival Agent Max Id</Translate>
                </Label>
                <AvField
                  id="vehicle-movement-history-retrivalAgentMaxId"
                  data-cy="retrivalAgentMaxId"
                  type="text"
                  name="retrivalAgentMaxId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="odometerReadingOutwardLabel" for="vehicle-movement-history-odometerReadingOutward">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.odometerReadingOutward">
                    Odometer Reading Outward
                  </Translate>
                </Label>
                <AvField
                  id="vehicle-movement-history-odometerReadingOutward"
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
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.help.odometerReadingOutward" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="odometerReadingInwardLabel" for="vehicle-movement-history-odometerReadingInward">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.odometerReadingInward">
                    Odometer Reading Inward
                  </Translate>
                </Label>
                <AvField
                  id="vehicle-movement-history-odometerReadingInward"
                  data-cy="odometerReadingInward"
                  type="string"
                  className="form-control"
                  name="odometerReadingInward"
                />
                <UncontrolledTooltip target="odometerReadingInwardLabel">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.help.odometerReadingInward" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-movement-history-vehicle">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.vehicle">Vehicle</Translate>
                </Label>
                <AvInput id="vehicle-movement-history-vehicle" data-cy="vehicle" type="select" className="form-control" name="vehicleId">
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
              <AvGroup>
                <Label for="vehicle-movement-history-vehicleMovement">
                  <Translate contentKey="prospectServiceApp.vehicleMovementHistory.vehicleMovement">Vehicle Movement</Translate>
                </Label>
                <AvInput
                  id="vehicle-movement-history-vehicleMovement"
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
              <Button tag={Link} id="cancel-save" to="/vehicle-movement-history" replace color="info">
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
  vehicleMovements: storeState.vehicleMovement.entities,
  vehicleMovementHistoryEntity: storeState.vehicleMovementHistory.entity,
  loading: storeState.vehicleMovementHistory.loading,
  updating: storeState.vehicleMovementHistory.updating,
  updateSuccess: storeState.vehicleMovementHistory.updateSuccess,
});

const mapDispatchToProps = {
  getVehicles,
  getVehicleMovements,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementHistoryUpdate);
