import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicleStatus } from 'app/shared/model/vehicle-status.model';
import { getEntities as getVehicleStatuses } from 'app/entities/vehicle-status/vehicle-status.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-status-change-reason.reducer';
import { IVehicleStatusChangeReason } from 'app/shared/model/vehicle-status-change-reason.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleStatusChangeReasonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleStatusChangeReasonUpdate = (props: IVehicleStatusChangeReasonUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleStatusChangeReasonEntity, vehicleStatuses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-status-change-reason');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...vehicleStatusChangeReasonEntity,
        ...values,
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
          <h2
            id="prospectServiceApp.vehicleStatusChangeReason.home.createOrEditLabel"
            data-cy="VehicleStatusChangeReasonCreateUpdateHeading"
          >
            <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.home.createOrEditLabel">
              Create or edit a VehicleStatusChangeReason
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleStatusChangeReasonEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-status-change-reason-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-status-change-reason-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="vehicle-status-change-reason-code">
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.code">Code</Translate>
                </Label>
                <AvField
                  id="vehicle-status-change-reason-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="codeLabel">
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.help.code" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="vehicle-status-change-reason-displayName">
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="vehicle-status-change-reason-displayName"
                  data-cy="displayName"
                  type="text"
                  name="displayName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="displayNameLabel">
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.help.displayName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-status-change-reason-description">
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.description">Description</Translate>
                </Label>
                <AvField id="vehicle-status-change-reason-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-status-change-reason-vehicleStatus">
                  <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.vehicleStatus">Vehicle Status</Translate>
                </Label>
                <AvInput
                  id="vehicle-status-change-reason-vehicleStatus"
                  data-cy="vehicleStatus"
                  type="select"
                  className="form-control"
                  name="vehicleStatusId"
                >
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
              <Button tag={Link} id="cancel-save" to="/vehicle-status-change-reason" replace color="info">
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
  vehicleStatuses: storeState.vehicleStatus.entities,
  vehicleStatusChangeReasonEntity: storeState.vehicleStatusChangeReason.entity,
  loading: storeState.vehicleStatusChangeReason.loading,
  updating: storeState.vehicleStatusChangeReason.updating,
  updateSuccess: storeState.vehicleStatusChangeReason.updateSuccess,
});

const mapDispatchToProps = {
  getVehicleStatuses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleStatusChangeReasonUpdate);
