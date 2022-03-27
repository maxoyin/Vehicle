import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicleStatusChangeReason } from 'app/shared/model/vehicle-status-change-reason.model';
import { getEntities as getVehicleStatusChangeReasons } from 'app/entities/vehicle-status-change-reason/vehicle-status-change-reason.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-stat-change-sub-reason.reducer';
import { IVehicleStatChangeSubReason } from 'app/shared/model/vehicle-stat-change-sub-reason.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleStatChangeSubReasonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleStatChangeSubReasonUpdate = (props: IVehicleStatChangeSubReasonUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleStatChangeSubReasonEntity, vehicleStatusChangeReasons, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-stat-change-sub-reason');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVehicleStatusChangeReasons();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleStatChangeSubReasonEntity,
        ...values,
        vehicleStatusChangeReason: vehicleStatusChangeReasons.find(
          it => it.id.toString() === values.vehicleStatusChangeReasonId.toString()
        ),
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
            id="prospectServiceApp.vehicleStatChangeSubReason.home.createOrEditLabel"
            data-cy="VehicleStatChangeSubReasonCreateUpdateHeading"
          >
            <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.home.createOrEditLabel">
              Create or edit a VehicleStatChangeSubReason
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleStatChangeSubReasonEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-stat-change-sub-reason-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-stat-change-sub-reason-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="vehicle-stat-change-sub-reason-code">
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.code">Code</Translate>
                </Label>
                <AvField
                  id="vehicle-stat-change-sub-reason-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="codeLabel">
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.help.code" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="vehicle-stat-change-sub-reason-displayName">
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="vehicle-stat-change-sub-reason-displayName"
                  data-cy="displayName"
                  type="text"
                  name="displayName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="displayNameLabel">
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.help.displayName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-stat-change-sub-reason-description">
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.description">Description</Translate>
                </Label>
                <AvField id="vehicle-stat-change-sub-reason-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-stat-change-sub-reason-vehicleStatusChangeReason">
                  <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.vehicleStatusChangeReason">
                    Vehicle Status Change Reason
                  </Translate>
                </Label>
                <AvInput
                  id="vehicle-stat-change-sub-reason-vehicleStatusChangeReason"
                  data-cy="vehicleStatusChangeReason"
                  type="select"
                  className="form-control"
                  name="vehicleStatusChangeReasonId"
                >
                  <option value="" key="0" />
                  {vehicleStatusChangeReasons
                    ? vehicleStatusChangeReasons.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-stat-change-sub-reason" replace color="info">
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
  vehicleStatusChangeReasons: storeState.vehicleStatusChangeReason.entities,
  vehicleStatChangeSubReasonEntity: storeState.vehicleStatChangeSubReason.entity,
  loading: storeState.vehicleStatChangeSubReason.loading,
  updating: storeState.vehicleStatChangeSubReason.updating,
  updateSuccess: storeState.vehicleStatChangeSubReason.updateSuccess,
});

const mapDispatchToProps = {
  getVehicleStatusChangeReasons,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleStatChangeSubReasonUpdate);
