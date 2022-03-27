import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-status.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleStatusDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleStatusDetail = (props: IVehicleStatusDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleStatusEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleStatusDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleStatus.detail.title">VehicleStatus</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleStatusEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.vehicleStatus.code">Code</Translate>
            </span>
            <UncontrolledTooltip target="code">
              <Translate contentKey="prospectServiceApp.vehicleStatus.help.code" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleStatusEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.vehicleStatus.displayName">Display Name</Translate>
            </span>
            <UncontrolledTooltip target="displayName">
              <Translate contentKey="prospectServiceApp.vehicleStatus.help.displayName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleStatusEntity.displayName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.vehicleStatus.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleStatusEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-status" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-status/${vehicleStatusEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleStatus }: IRootState) => ({
  vehicleStatusEntity: vehicleStatus.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleStatusDetail);
