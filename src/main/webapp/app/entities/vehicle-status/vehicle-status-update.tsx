import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle-status.reducer';
import { IVehicleStatus } from 'app/shared/model/vehicle-status.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleStatusUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleStatusUpdate = (props: IVehicleStatusUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleStatusEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-status');
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
        ...vehicleStatusEntity,
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
          <h2 id="prospectServiceApp.vehicleStatus.home.createOrEditLabel" data-cy="VehicleStatusCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleStatus.home.createOrEditLabel">Create or edit a VehicleStatus</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleStatusEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-status-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-status-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="vehicle-status-code">
                  <Translate contentKey="prospectServiceApp.vehicleStatus.code">Code</Translate>
                </Label>
                <AvField
                  id="vehicle-status-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="codeLabel">
                  <Translate contentKey="prospectServiceApp.vehicleStatus.help.code" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="vehicle-status-displayName">
                  <Translate contentKey="prospectServiceApp.vehicleStatus.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="vehicle-status-displayName"
                  data-cy="displayName"
                  type="text"
                  name="displayName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="displayNameLabel">
                  <Translate contentKey="prospectServiceApp.vehicleStatus.help.displayName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-status-description">
                  <Translate contentKey="prospectServiceApp.vehicleStatus.description">Description</Translate>
                </Label>
                <AvField id="vehicle-status-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-status" replace color="info">
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
  vehicleStatusEntity: storeState.vehicleStatus.entity,
  loading: storeState.vehicleStatus.loading,
  updating: storeState.vehicleStatus.updating,
  updateSuccess: storeState.vehicleStatus.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleStatusUpdate);
