import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicleMovement } from 'app/shared/model/vehicle-movement.model';
import { getEntities as getVehicleMovements } from 'app/entities/vehicle-movement/vehicle-movement.reducer';
import { IVehicleMovementHistory } from 'app/shared/model/vehicle-movement-history.model';
import { getEntities as getVehicleMovementHistories } from 'app/entities/vehicle-movement-history/vehicle-movement-history.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-movement-checklist.reducer';
import { IVehicleMovementChecklist } from 'app/shared/model/vehicle-movement-checklist.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleMovementChecklistUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMovementChecklistUpdate = (props: IVehicleMovementChecklistUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleMovementChecklistEntity, vehicleMovements, vehicleMovementHistories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-movement-checklist');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVehicleMovements();
    props.getVehicleMovementHistories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleMovementChecklistEntity,
        ...values,
        vehicleMovement: vehicleMovements.find(it => it.id.toString() === values.vehicleMovementId.toString()),
        vehicleMovementHistory: vehicleMovementHistories.find(it => it.id.toString() === values.vehicleMovementHistoryId.toString()),
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
          <h2 id="prospectServiceApp.vehicleMovementChecklist.home.createOrEditLabel" data-cy="VehicleMovementChecklistCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.home.createOrEditLabel">
              Create or edit a VehicleMovementChecklist
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleMovementChecklistEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-movement-checklist-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-movement-checklist-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="itemStatusLabel" for="vehicle-movement-checklist-itemStatus">
                  <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.itemStatus">Item Status</Translate>
                </Label>
                <AvInput
                  id="vehicle-movement-checklist-itemStatus"
                  data-cy="itemStatus"
                  type="select"
                  className="form-control"
                  name="itemStatus"
                  value={(!isNew && vehicleMovementChecklistEntity.itemStatus) || 'RETRIEVED'}
                >
                  <option value="RETRIEVED">{translate('prospectServiceApp.VehicleMovementChecklistStatus.RETRIEVED')}</option>
                  <option value="WITHCHAMPION">{translate('prospectServiceApp.VehicleMovementChecklistStatus.WITHCHAMPION')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-movement-checklist-vehicleMovement">
                  <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.vehicleMovement">Vehicle Movement</Translate>
                </Label>
                <AvInput
                  id="vehicle-movement-checklist-vehicleMovement"
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
                <Label for="vehicle-movement-checklist-vehicleMovementHistory">
                  <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.vehicleMovementHistory">
                    Vehicle Movement History
                  </Translate>
                </Label>
                <AvInput
                  id="vehicle-movement-checklist-vehicleMovementHistory"
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
              <Button tag={Link} id="cancel-save" to="/vehicle-movement-checklist" replace color="info">
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
  vehicleMovementChecklistEntity: storeState.vehicleMovementChecklist.entity,
  loading: storeState.vehicleMovementChecklist.loading,
  updating: storeState.vehicleMovementChecklist.updating,
  updateSuccess: storeState.vehicleMovementChecklist.updateSuccess,
});

const mapDispatchToProps = {
  getVehicleMovements,
  getVehicleMovementHistories,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementChecklistUpdate);
