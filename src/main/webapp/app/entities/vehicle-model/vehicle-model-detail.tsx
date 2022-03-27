import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-model.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleModelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleModelDetail = (props: IVehicleModelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleModelEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleModelDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleModel.detail.title">VehicleModel</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleModelEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.vehicleModel.code">Code</Translate>
            </span>
          </dt>
          <dd>{vehicleModelEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.vehicleModel.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{vehicleModelEntity.displayName}</dd>
          <dt>
            <span id="isDisplayOn">
              <Translate contentKey="prospectServiceApp.vehicleModel.isDisplayOn">Is Display On</Translate>
            </span>
            <UncontrolledTooltip target="isDisplayOn">
              <Translate contentKey="prospectServiceApp.vehicleModel.help.isDisplayOn" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleModelEntity.isDisplayOn ? 'true' : 'false'}</dd>
          <dt>
            <span id="modelYear">
              <Translate contentKey="prospectServiceApp.vehicleModel.modelYear">Model Year</Translate>
            </span>
          </dt>
          <dd>
            {vehicleModelEntity.modelYear ? (
              <TextFormat value={vehicleModelEntity.modelYear} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.vehicleModel.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleModelEntity.description}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleModel.vehicleManufacturer">Vehicle Manufacturer</Translate>
          </dt>
          <dd>{vehicleModelEntity.vehicleManufacturer ? vehicleModelEntity.vehicleManufacturer.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleModel.vehicleType">Vehicle Type</Translate>
          </dt>
          <dd>{vehicleModelEntity.vehicleType ? vehicleModelEntity.vehicleType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-model" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-model/${vehicleModelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleModel }: IRootState) => ({
  vehicleModelEntity: vehicleModel.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleModelDetail);
