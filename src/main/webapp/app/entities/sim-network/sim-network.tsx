// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sim-network.reducer';
import { ISimNetwork } from 'app/shared/model/sim-network.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISimNetworkProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SimNetwork = (props: ISimNetworkProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { simNetworkList, match, loading } = props;
  return (
    <div>
      <h2 id="sim-network-heading" data-cy="SimNetworkHeading">
        <Translate contentKey="prospectServiceApp.simNetwork.home.title">Sim Networks</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.simNetwork.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.simNetwork.home.createLabel">Create new Sim Network</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {simNetworkList && simNetworkList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.simNetwork.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.simNetwork.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.simNetwork.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.simNetwork.description">Description</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {simNetworkList.map((simNetwork, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${simNetwork.id}`} color="link" size="sm">
                      {simNetwork.id}
                    </Button>
                  </td>
                  <td>{simNetwork.code}</td>
                  <td>{simNetwork.displayName}</td>
                  <td>{simNetwork.description}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${simNetwork.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${simNetwork.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${simNetwork.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="prospectServiceApp.simNetwork.home.notFound">No Sim Networks found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ simNetwork }: IRootState) => ({
  simNetworkList: simNetwork.entities,
  loading: simNetwork.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SimNetwork);
