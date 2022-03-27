import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sim-network.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISimNetworkDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SimNetworkDetail = (props: ISimNetworkDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { simNetworkEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="simNetworkDetailsHeading">
          <Translate contentKey="prospectServiceApp.simNetwork.detail.title">SimNetwork</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{simNetworkEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.simNetwork.code">Code</Translate>
            </span>
          </dt>
          <dd>{simNetworkEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.simNetwork.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{simNetworkEntity.displayName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.simNetwork.description">Description</Translate>
            </span>
          </dt>
          <dd>{simNetworkEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/sim-network" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sim-network/${simNetworkEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ simNetwork }: IRootState) => ({
  simNetworkEntity: simNetwork.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SimNetworkDetail);
