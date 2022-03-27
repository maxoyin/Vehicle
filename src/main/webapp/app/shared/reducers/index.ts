import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import simNetwork, {
  SimNetworkState
} from 'app/entities/sim-network/sim-network.reducer';
// prettier-ignore
import assestClass, {
  AssestClassState
} from 'app/entities/assest-class/assest-class.reducer';
// prettier-ignore
import vehicleType, {
  VehicleTypeState
} from 'app/entities/vehicle-type/vehicle-type.reducer';
// prettier-ignore
import vehicleManufacturer, {
  VehicleManufacturerState
} from 'app/entities/vehicle-manufacturer/vehicle-manufacturer.reducer';
// prettier-ignore
import vehicleModel, {
  VehicleModelState
} from 'app/entities/vehicle-model/vehicle-model.reducer';
// prettier-ignore
import vehicleTrim, {
  VehicleTrimState
} from 'app/entities/vehicle-trim/vehicle-trim.reducer';
// prettier-ignore
import vehicleStatus, {
  VehicleStatusState
} from 'app/entities/vehicle-status/vehicle-status.reducer';
// prettier-ignore
import vehicleStatusChangeReason, {
  VehicleStatusChangeReasonState
} from 'app/entities/vehicle-status-change-reason/vehicle-status-change-reason.reducer';
// prettier-ignore
import vehicleStatChangeSubReason, {
  VehicleStatChangeSubReasonState
} from 'app/entities/vehicle-stat-change-sub-reason/vehicle-stat-change-sub-reason.reducer';
// prettier-ignore
import vehicle, {
  VehicleState
} from 'app/entities/vehicle/vehicle.reducer';
// prettier-ignore
import vehicleChecklistItem, {
  VehicleChecklistItemState
} from 'app/entities/vehicle-checklist-item/vehicle-checklist-item.reducer';
// prettier-ignore
import vehicleMovement, {
  VehicleMovementState
} from 'app/entities/vehicle-movement/vehicle-movement.reducer';
// prettier-ignore
import vehicleMovementChecklist, {
  VehicleMovementChecklistState
} from 'app/entities/vehicle-movement-checklist/vehicle-movement-checklist.reducer';
// prettier-ignore
import vehicleMovementHistory, {
  VehicleMovementHistoryState
} from 'app/entities/vehicle-movement-history/vehicle-movement-history.reducer';
// prettier-ignore
import vehicleMovementCheckHist, {
  VehicleMovementCheckHistState
} from 'app/entities/vehicle-movement-check-hist/vehicle-movement-check-hist.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly simNetwork: SimNetworkState;
  readonly assestClass: AssestClassState;
  readonly vehicleType: VehicleTypeState;
  readonly vehicleManufacturer: VehicleManufacturerState;
  readonly vehicleModel: VehicleModelState;
  readonly vehicleTrim: VehicleTrimState;
  readonly vehicleStatus: VehicleStatusState;
  readonly vehicleStatusChangeReason: VehicleStatusChangeReasonState;
  readonly vehicleStatChangeSubReason: VehicleStatChangeSubReasonState;
  readonly vehicle: VehicleState;
  readonly vehicleChecklistItem: VehicleChecklistItemState;
  readonly vehicleMovement: VehicleMovementState;
  readonly vehicleMovementChecklist: VehicleMovementChecklistState;
  readonly vehicleMovementHistory: VehicleMovementHistoryState;
  readonly vehicleMovementCheckHist: VehicleMovementCheckHistState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  simNetwork,
  assestClass,
  vehicleType,
  vehicleManufacturer,
  vehicleModel,
  vehicleTrim,
  vehicleStatus,
  vehicleStatusChangeReason,
  vehicleStatChangeSubReason,
  vehicle,
  vehicleChecklistItem,
  vehicleMovement,
  vehicleMovementChecklist,
  vehicleMovementHistory,
  vehicleMovementCheckHist,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
