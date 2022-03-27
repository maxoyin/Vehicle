import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-trim.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleTrimDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleTrimDetail = (props: IVehicleTrimDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleTrimEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleTrimDetailsHeading">
          <Translate contentKey="prospectServiceApp.vehicleTrim.detail.title">VehicleTrim</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleTrimEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.vehicleTrim.code">Code</Translate>
            </span>
            <UncontrolledTooltip target="code">
              <Translate contentKey="prospectServiceApp.vehicleTrim.help.code" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleTrimEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.vehicleTrim.displayName">Display Name</Translate>
            </span>
            <UncontrolledTooltip target="displayName">
              <Translate contentKey="prospectServiceApp.vehicleTrim.help.displayName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleTrimEntity.displayName}</dd>
          <dt>
            <span id="isDisplayOn">
              <Translate contentKey="prospectServiceApp.vehicleTrim.isDisplayOn">Is Display On</Translate>
            </span>
            <UncontrolledTooltip target="isDisplayOn">
              <Translate contentKey="prospectServiceApp.vehicleTrim.help.isDisplayOn" />
            </UncontrolledTooltip>
          </dt>
          <dd>{vehicleTrimEntity.isDisplayOn ? 'true' : 'false'}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.vehicleTrim.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleTrimEntity.description}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.vehicleTrim.vehicleModel">Vehicle Model</Translate>
          </dt>
          <dd>{vehicleTrimEntity.vehicleModel ? vehicleTrimEntity.vehicleModel.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-trim" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-trim/${vehicleTrimEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleTrim }: IRootState) => ({
  vehicleTrimEntity: vehicleTrim.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTrimDetail);
