import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-status-change-reason.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleStatusChangeReasonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleStatusChangeReasonDetail = (props: IVehicleStatusChangeReasonDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleStatusChangeReasonEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleStatusChangeReasonDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.detail.title">VehicleStatusChangeReason</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleStatusChangeReasonEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.code">Code</Translate>
            </span>
            <UncontrolledTooltip target="code">
              <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.help.code" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleStatusChangeReasonEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.displayName">Display Name</Translate>
            </span>
            <UncontrolledTooltip target="displayName">
              <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.help.displayName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleStatusChangeReasonEntity.displayName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleStatusChangeReasonEntity.description}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleStatusChangeReason.vehicleStatus">Vehicle Status</Translate>
          </dt>
          <dd>{vehicleStatusChangeReasonEntity.vehicleStatus ? vehicleStatusChangeReasonEntity.vehicleStatus.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-status-change-reason" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-status-change-reason/${vehicleStatusChangeReasonEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleStatusChangeReason }: IRootState) => ({
  vehicleStatusChangeReasonEntity: vehicleStatusChangeReason.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleStatusChangeReasonDetail);
