import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-movement-history.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMovementHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMovementHistoryDetail = (props: IVehicleMovementHistoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleMovementHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleMovementHistoryDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleMovementHistory.detail.title">VehicleMovementHistory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementHistoryEntity.id}</dd>
          <dt>
            <span id="sourceSubCityId">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.sourceSubCityId">Source Sub City Id</Translate>
            </span>
            <UncontrolledTooltip target="sourceSubCityId">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.help.sourceSubCityId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleMovementHistoryEntity.sourceSubCityId}</dd>
          <dt>
            <span id="destinationSubCityId">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.destinationSubCityId">Destination Sub City Id</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementHistoryEntity.destinationSubCityId}</dd>
          <dt>
            <span id="movementType">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.movementType">Movement Type</Translate>
            </span>
            <UncontrolledTooltip target="movementType">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.help.movementType" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleMovementHistoryEntity.movementType}</dd>
          <dt>
            <span id="retrivalAgentMaxId">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.retrivalAgentMaxId">Retrival Agent Max Id</Translate>
            </span>
          </dt>
          <dd>{vehicleMovementHistoryEntity.retrivalAgentMaxId}</dd>
          <dt>
            <span id="odometerReadingOutward">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.odometerReadingOutward">Odometer Reading Outward</Translate>
            </span>
            <UncontrolledTooltip target="odometerReadingOutward">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.help.odometerReadingOutward" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleMovementHistoryEntity.odometerReadingOutward}</dd>
          <dt>
            <span id="odometerReadingInward">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.odometerReadingInward">Odometer Reading Inward</Translate>
            </span>
            <UncontrolledTooltip target="odometerReadingInward">
              <Translate contentKey="prospectServiceApp.vehicleMovementHistory.help.odometerReadingInward" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleMovementHistoryEntity.odometerReadingInward}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleMovementHistory.vehicle">Vehicle</Translate>
          </dt>
          <dd>{vehicleMovementHistoryEntity.vehicle ? vehicleMovementHistoryEntity.vehicle.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleMovementHistory.vehicleMovement">Vehicle Movement</Translate>
          </dt>
          <dd>{vehicleMovementHistoryEntity.vehicleMovement ? vehicleMovementHistoryEntity.vehicleMovement.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-movement-history" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-movement-history/${vehicleMovementHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleMovementHistory }: IRootState) => ({
  vehicleMovementHistoryEntity: vehicleMovementHistory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMovementHistoryDetail);
