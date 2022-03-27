import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './assest-class.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAssestClassDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AssestClassDetail = (props: IAssestClassDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { assestClassEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assestClassDetailsHeading">
          <Translate contentKey="prospectServiceApp.assestClass.detail.title">AssestClass</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assestClassEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.assestClass.code">Code</Translate>
            </span>
          </dt>
          <dd>{assestClassEntity.code}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="prospectServiceApp.assestClass.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{assestClassEntity.displayName}</dd>
          <dt>
            <span id="isDisplayOn">
              <Translate contentKey="prospectServiceApp.assestClass.isDisplayOn">Is Display On</Translate>
            </span>
            <UncontrolledTooltip target="isDisplayOn">
              <Translate contentKey="prospectServiceApp.assestClass.help.isDisplayOn" />
            </UncontrolledTooltip>
          </dt>
          <dd>{assestClassEntity.isDisplayOn ? 'true' : 'false'}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.assestClass.description">Description</Translate>
            </span>
          </dt>
          <dd>{assestClassEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/assest-class" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/assest-class/${assestClassEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ assestClass }: IRootState) => ({
  assestClassEntity: assestClass.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssestClassDetail);
