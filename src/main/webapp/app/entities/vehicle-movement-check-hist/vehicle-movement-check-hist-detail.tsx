import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-movement-check-hist.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMovementCheckHistDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMovementCheckHistDetail = (props: IVehicleMovementCheckHistDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleMovementCheckHistEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleMovementCheckHistDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.detail.title">VehicleMovementCheckHist</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementCheckHistEntity.id}</dd>
          <dt>
            <span id="itemStatus">
              <Translate contentKey="prospectServiceApp.vehicleMovementCheckHist.itemStatus">Item Status</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementCheckHistEntity.itemStatus}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-movement-check-hist" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-movement-check-hist/${vehicleMovementCheckHistEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleMovementCheckHist }: IRootState) => ({
  vehicleMovementCheckHistEntity: vehicleMovementCheckHist.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementCheckHistDetail);
