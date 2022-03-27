// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './assest-class.reducer';
import { IAssestClass } from 'app/shared/model/assest-class.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAssestClassProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AssestClass = (props: IAssestClassProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { assestClassList, match, loading } = props;
  return (
    <div>
      <h2 id="assest-class-heading" data-cy="AssestClassHeading">
        <Translate contentKey="prospectServiceApp.assestClass.home.title">Assest Classes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.assestClass.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.assestClass.home.createLabel">Create new Assest Class</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {assestClassList && assestClassList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.assestClass.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.assestClass.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.assestClass.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.assestClass.isDisplayOn">Is Display On</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.assestClass.description">Description</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assestClassList.map((assestClass, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${assestClass.id}`} color="link" size="sm">
                      {assestClass.id}
                    </Button>
                  </td>
                  <td>{assestClass.code}</td>
                  <td>{assestClass.displayName}</td>
                  <td>{assestClass.isDisplayOn ? 'true' : 'false'}</td>
                  <td>{assestClass.description}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${assestClass.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${assestClass.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${assestClass.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="prospectServiceApp.assestClass.home.notFound">No Assest Classes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ assestClass }: IRootState) => ({
  assestClassList: assestClass.entities,
  loading: assestClass.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssestClass);
