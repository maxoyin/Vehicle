import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/sim-network">
      <Translate contentKey="global.menu.entities.simNetwork" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/assest-class">
      <Translate contentKey="global.menu.entities.assestClass" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-type">
      <Translate contentKey="global.menu.entities.vehicleType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-manufacturer">
      <Translate contentKey="global.menu.entities.vehicleManufacturer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-model">
      <Translate contentKey="global.menu.entities.vehicleModel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-trim">
      <Translate contentKey="global.menu.entities.vehicleTrim" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-status">
      <Translate contentKey="global.menu.entities.vehicleStatus" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-status-change-reason">
      <Translate contentKey="global.menu.entities.vehicleStatusChangeReason" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-stat-change-sub-reason">
      <Translate contentKey="global.menu.entities.vehicleStatChangeSubReason" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle">
      <Translate contentKey="global.menu.entities.vehicle" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-checklist-item">
      <Translate contentKey="global.menu.entities.vehicleChecklistItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-movement">
      <Translate contentKey="global.menu.entities.vehicleMovement" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-movement-checklist">
      <Translate contentKey="global.menu.entities.vehicleMovementChecklist" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-movement-history">
      <Translate contentKey="global.menu.entities.vehicleMovementHistory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-movement-check-hist">
      <Translate contentKey="global.menu.entities.vehicleMovementCheckHist" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
