import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-type.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleTypeDetail = (props: IVehicleTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleTypeDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleType.detail.title">VehicleType</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.vehicleType.code">Code</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.vehicleType.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.displayName}</dd>
          <dt>
            <span id="isDisplayOn">
              <Translate contentKey="prospectServiceApp.vehicleType.isDisplayOn">Is Display On</Translate>
            </span>
            <UncontrolledTooltip target="isDisplayOn">
              <Translate contentKey="prospectServiceApp.vehicleType.help.isDisplayOn" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleTypeEntity.isDisplayOn ? 'true' : 'false'}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.vehicleType.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.description}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleType.assestClass">Assest Class</Translate>
          </dt>
          <dd>{vehicleTypeEntity.assestClass ? vehicleTypeEntity.assestClass.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-type/${vehicleTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleType }: IRootState) => ({
  vehicleTypeEntity: vehicleType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTypeDetail);
