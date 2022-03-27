import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle-movement-check-hist.reducer';
import { IVehicleMovementCheckHist } from 'app/shared/model/vehicle-movement-check-hist.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleMovementCheckHistUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMovementCheckHistUpdate = (props: IVehicleMovementCheckHistUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleMovementCheckHistEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-movement-check-hist');
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
        ...vehicleMovementCheckHistEntity,
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
          <h2 id="prospectServiceApp.vehicleMovementCheckHist.home.createOrEditLabel" data-cy="VehicleMovementCheckHistCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.home.createOrEditLabel">
              Create or edit a VehicleMovementCheckHist
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleMovementCheckHistEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-movement-check-hist-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-movement-check-hist-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="itemStatusLabel" for="vehicle-movement-check-hist-itemStatus">
                  <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.itemStatus">Item Status</Translate>
                </Label>
                <AvInput
                  id="vehicle-movement-check-hist-itemStatus"
                  data-cy="itemStatus"
                  type="select"
                  className="form-control"
                  name="itemStatus"
                  value={(!isNew && vehicleMovementCheckHistEntity.itemStatus) || 'RETRIEVED'}
                >
                  <option value="RETRIEVED">{translate('prospectServiceApp.VehicleMovementChecklistStatus.RETRIEVED')}</option>
                  <option value="WITHCHAMPION">{translate('prospectServiceApp.VehicleMovementChecklistStatus.WITHCHAMPION')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-movement-check-hist" replace color="info">
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
  vehicleMovementCheckHistEntity: storeState.vehicleMovementCheckHist.entity,
  loading: storeState.vehicleMovementCheckHist.loading,
  updating: storeState.vehicleMovementCheckHist.updating,
  updateSuccess: storeState.vehicleMovementCheckHist.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementCheckHistUpdate);
