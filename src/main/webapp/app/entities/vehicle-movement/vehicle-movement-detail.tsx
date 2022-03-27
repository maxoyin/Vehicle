import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-movement.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMovementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMovementDetail = (props: IVehicleMovementDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleMovementEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleMovementDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleMovement.detail.title">VehicleMovement</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementEntity.id}</dd>
          <dt>
            <span id="sourceSubCityId">
              <Translate contentKey="prospectServiceApp.vehicleMovement.sourceSubCityId">Source Sub City Id</Translate>
            </span>
            <UncontrolledTooltip target="sourceSubCityId">
              <Translate contentKey="prospectServiceApp.vehicleMovement.help.sourceSubCityId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleMovementEntity.sourceSubCityId}</dd>
          <dt>
            <span id="destinationSubCityId">
              <Translate contentKey="prospectServiceApp.vehicleMovement.destinationSubCityId">Destination Sub City Id</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementEntity.destinationSubCityId}</dd>
          <dt>
            <span id="movementType">
              <Translate contentKey="prospectServiceApp.vehicleMovement.movementType">Movement Type</Translate>
            </span>
            <UncontrolledTooltip target="movementType">
              <Translate contentKey="prospectServiceApp.vehicleMovement.help.movementType" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleMovementEntity.movementType}</dd>
          <dt>
            <span id="retrievalAgentMaxId">
              <Translate contentKey="prospectServiceApp.vehicleMovement.retrievalAgentMaxId">Retrieval Agent Max Id</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementEntity.retrievalAgentMaxId}</dd>
          <dt>
            <span id="odometerReadingOutward">
              <Translate contentKey="prospectServiceApp.vehicleMovement.odometerReadingOutward">Odometer Reading Outward</Translate>
            </span>
            <UncontrolledTooltip target="odometerReadingOutward">
              <Translate contentKey="prospectServiceApp.vehicleMovement.help.odometerReadingOutward" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleMovementEntity.odometerReadingOutward}</dd>
          <dt>
            <span id="odometerReadingInward">
              <Translate contentKey="prospectServiceApp.vehicleMovement.odometerReadingInward">Odometer Reading Inward</Translate>
            </span>
            <UncontrolledTooltip target="odometerReadingInward">
              <Translate contentKey="prospectServiceApp.vehicleMovement.help.odometerReadingInward" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleMovementEntity.odometerReadingInward}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleMovement.vehicle">Vehicle</Translate>
          </dt>
          <dd>{vehicleMovementEntity.vehicle ? vehicleMovementEntity.vehicle.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-movement" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-movement/${vehicleMovementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleMovement }: IRootState) => ({
  vehicleMovementEntity: vehicleMovement.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementDetail);
