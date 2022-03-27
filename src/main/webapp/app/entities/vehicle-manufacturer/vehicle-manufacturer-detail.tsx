import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-manufacturer.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleManufacturerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleManufacturerDetail = (props: IVehicleManufacturerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleManufacturerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleManufacturerDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleManufacturer.detail.title">VehicleManufacturer</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleManufacturerEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.vehicleManufacturer.code">Code</Translate>
            </span>
          </dt>
          <dd>{vehicleManufacturerEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.vehicleManufacturer.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{vehicleManufacturerEntity.displayName}</dd>
          <dt>
            <span id="isDisplayOn">
              <Translate contentKey="prospectServiceApp.vehicleManufacturer.isDisplayOn">Is Display On</Translate>
            </span>
            <UncontrolledTooltip target="isDisplayOn">
              <Translate contentKey="prospectServiceApp.vehicleManufacturer.help.isDisplayOn" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleManufacturerEntity.isDisplayOn ? 'true' : 'false'}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.vehicleManufacturer.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleManufacturerEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-manufacturer" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-manufacturer/${vehicleManufacturerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleManufacturer }: IRootState) => ({
  vehicleManufacturerEntity: vehicleManufacturer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleManufacturerDetail);
