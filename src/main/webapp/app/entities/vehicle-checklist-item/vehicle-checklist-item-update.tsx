import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle-checklist-item.reducer';
import { IVehicleChecklistItem } from 'app/shared/model/vehicle-checklist-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleChecklistItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleChecklistItemUpdate = (props: IVehicleChecklistItemUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleChecklistItemEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-checklist-item');
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
        ...vehicleChecklistItemEntity,
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
          <h2 id="prospectServiceApp.vehicleChecklistItem.home.createOrEditLabel" data-cy="VehicleChecklistItemCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleChecklistItem.home.createOrEditLabel">
              Create or edit a VehicleChecklistItem
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleChecklistItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-checklist-item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-checklist-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="vehicle-checklist-item-code">
                  <Translate contentKey="prospectServiceApp.vehicleChecklistItem.code">Code</Translate>
                </Label>
                <AvField
                  id="vehicle-checklist-item-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="codeLabel">
                  <Translate contentKey="prospectServiceApp.vehicleChecklistItem.help.code" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="vehicle-checklist-item-displayName">
                  <Translate contentKey="prospectServiceApp.vehicleChecklistItem.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="vehicle-checklist-item-displayName"
                  data-cy="displayName"
                  type="text"
                  name="displayName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="displayNameLabel">
                  <Translate contentKey="prospectServiceApp.vehicleChecklistItem.help.displayName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-checklist-item-description">
                  <Translate contentKey="prospectServiceApp.vehicleChecklistItem.description">Description</Translate>
                </Label>
                <AvField id="vehicle-checklist-item-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-checklist-item" replace color="info">
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
  vehicleChecklistItemEntity: storeState.vehicleChecklistItem.entity,
  loading: storeState.vehicleChecklistItem.loading,
  updating: storeState.vehicleChecklistItem.updating,
  updateSuccess: storeState.vehicleChecklistItem.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleChecklistItemUpdate);
