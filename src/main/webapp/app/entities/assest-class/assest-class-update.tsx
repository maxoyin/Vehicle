import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './assest-class.reducer';
import { IAssestClass } from 'app/shared/model/assest-class.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAssestClassUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AssestClassUpdate = (props: IAssestClassUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { assestClassEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/assest-class');
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
        ...assestClassEntity,
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
          <h2 id="prospectServiceApp.assestClass.home.createOrEditLabel" data-cy="AssestClassCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.assestClass.home.createOrEditLabel">Create or edit a AssestClass</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : assestClassEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="assest-class-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="assest-class-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="assest-class-code">
                  <Translate contentKey="prospectServiceApp.assestClass.code">Code</Translate>
                </Label>
                <AvField
                  id="assest-class-code"
                  data-cy="code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="displayNameLabel" for="assest-class-displayName">
                  <Translate contentKey="prospectServiceApp.assestClass.displayName">Display Name</Translate>
                </Label>
                <AvField
                  id="assest-class-displayName"
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
                    id="assest-class-isDisplayOn"
                    data-cy="isDisplayOn"
                    type="checkbox"
                    className="form-check-input"
                    name="isDisplayOn"
                  />
                  <Translate contentKey="prospectServiceApp.assestClass.isDisplayOn">Is Display On</Translate>
                </Label>
                <UncontrolledTooltip target="isDisplayOnLabel">
                  <Translate contentKey="prospectServiceApp.assestClass.help.isDisplayOn" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="assest-class-description">
                  <Translate contentKey="prospectServiceApp.assestClass.description">Description</Translate>
                </Label>
                <AvField id="assest-class-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/assest-class" replace color="info">
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
  assestClassEntity: storeState.assestClass.entity,
  loading: storeState.assestClass.loading,
  updating: storeState.assestClass.updating,
  updateSuccess: storeState.assestClass.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssestClassUpdate);
