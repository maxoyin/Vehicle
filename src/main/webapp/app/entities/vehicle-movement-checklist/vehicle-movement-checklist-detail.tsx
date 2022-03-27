import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-movement-checklist.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMovementChecklistDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMovementChecklistDetail = (props: IVehicleMovementChecklistDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleMovementChecklistEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleMovementChecklistDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.detail.title">VehicleMovementChecklist</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementChecklistEntity.id}</dd>
          <dt>
            <span id="itemStatus">
              <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.itemStatus">Item Status</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementChecklistEntity.itemStatus}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.vehicleMovement">Vehicle Movement</Translate>
          </dt>
          <dd>{vehicleMovementChecklistEntity.vehicleMovement ? vehicleMovementChecklistEntity.vehicleMovement.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleMovementChecklist.vehicleMovementHistory">Vehicle Movement History</Translate>
          </dt>
          <dd>{vehicleMovementChecklistEntity.vehicleMovementHistory ? vehicleMovementChecklistEntity.vehicleMovementHistory.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-movement-checklist" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-movement-checklist/${vehicleMovementChecklistEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleMovementChecklist }: IRootState) => ({
  vehicleMovementChecklistEntity: vehicleMovementChecklist.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementChecklistDetail);
