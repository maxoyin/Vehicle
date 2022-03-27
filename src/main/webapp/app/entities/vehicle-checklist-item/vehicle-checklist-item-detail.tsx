import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-checklist-item.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleChecklistItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleChecklistItemDetail = (props: IVehicleChecklistItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleChecklistItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleChecklistItemDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleChecklistItem.detail.title">VehicleChecklistItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleChecklistItemEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.vehicleChecklistItem.code">Code</Translate>
            </span>
            <UncontrolledTooltip target="code">
              <Translate contentKey="prospectServiceApp.vehicleChecklistItem.help.code" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleChecklistItemEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.vehicleChecklistItem.displayName">Display Name</Translate>
            </span>
            <UncontrolledTooltip target="displayName">
              <Translate contentKey="prospectServiceApp.vehicleChecklistItem.help.displayName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleChecklistItemEntity.displayName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.vehicleChecklistItem.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleChecklistItemEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-checklist-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-checklist-item/${vehicleChecklistItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleChecklistItem }: IRootState) => ({
  vehicleChecklistItemEntity: vehicleChecklistItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleChecklistItemDetail);
