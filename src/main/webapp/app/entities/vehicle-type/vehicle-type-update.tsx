import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAssestClass } from 'app/shared/model/assest-class.model';
import { getEntities as getAssestClasses } from 'app/entities/assest-class/assest-class.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-type.reducer';
import { IVehicleType } from 'app/shared/model/vehicle-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleTypeUpdate = (props: IVehicleTypeUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleTypeEntity, assestClasses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-type');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAssestClasses();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleTypeEntity,
        ...values,
        assestClass: assestClasses.find(it => it.id.toString() === values.assestClassId.toString()),
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
          <h2 id="prospectServiceApp.vehicleType.home.createOrEditLabel" data-cy="VehicleTypeCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleType.home.createOrEditLabel">Create or edit a VehicleType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="vehicle-type-code">
                  <Translate contentKey="prospectServiceApp.vehicleType.code">Code</Translate>
                </Label>
                <AvField
                  id="vehicle-type-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="vehicle-type-displayName">
                  <Translate contentKey="prospectServiceApp.vehicleType.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="vehicle-type-displayName"
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
                    id="vehicle-type-isDisplayOn"
                    data-cy="isDisplayOn"
                    type="checkbox"
                    className="form-check-input"
                    name="isDisplayOn"
                  />
                  <Translate contentKey="prospectServiceApp.vehicleType.isDisplayOn">Is Display On</Translate>
                </Label>
                <UncontrolledTooltip target="isDisplayOnLabel">
                  <Translate contentKey="prospectServiceApp.vehicleType.help.isDisplayOn" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-type-description">
                  <Translate contentKey="prospectServiceApp.vehicleType.description">Description</Translate>
                </Label>
                <AvField id="vehicle-type-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-type-assestClass">
                  <Translate contentKey="prospectServiceApp.vehicleType.assestClass">Assest Class</Translate>
                </Label>
                <AvInput id="vehicle-type-assestClass" data-cy="assestClass" type="select" className="form-control" name="assestClassId">
                  <option value="" key="0" />
                  {assestClasses
                    ? assestClasses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-type" replace color="info">
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
  assestClasses: storeState.assestClass.entities,
  vehicleTypeEntity: storeState.vehicleType.entity,
  loading: storeState.vehicleType.loading,
  updating: storeState.vehicleType.updating,
  updateSuccess: storeState.vehicleType.updateSuccess,
});

const mapDispatchToProps = {
  getAssestClasses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTypeUpdate);
