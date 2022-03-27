import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-stat-change-sub-reason.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleStatChangeSubReasonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleStatChangeSubReasonDetail = (props: IVehicleStatChangeSubReasonDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleStatChangeSubReasonEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleStatChangeSubReasonDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.detail.title">VehicleStatChangeSubReason</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleStatChangeSubReasonEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.code">Code</Translate>
            </span>
            <UncontrolledTooltip target="code">
              <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.help.code" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleStatChangeSubReasonEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.displayName">Display Name</Translate>
            </span>
            <UncontrolledTooltip target="displayName">
              <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.help.displayName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleStatChangeSubReasonEntity.displayName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleStatChangeSubReasonEntity.description}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleStatChangeSubReason.vehicleStatusChangeReason">
              Vehicle Status Change Reason
            </Translate>
          </dt>
          <dd>
            {vehicleStatChangeSubReasonEntity.vehicleStatusChangeReason
              ? vehicleStatChangeSubReasonEntity.vehicleStatusChangeReason.id
              : ''}
          </dd>
        </dl>
        <Button tag={Link} to="/vehicle-stat-change-sub-reason" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-stat-change-sub-reason/${vehicleStatChangeSubReasonEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleStatChangeSubReason }: IRootState) => ({
  vehicleStatChangeSubReasonEntity: vehicleStatChangeSubReason.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleStatChangeSubReasonDetail);
