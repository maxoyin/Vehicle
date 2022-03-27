import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleMovementChecklistComponentsPage from './vehicle-movement-checklist.page-object';
import VehicleMovementChecklistUpdatePage from './vehicle-movement-checklist-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('VehicleMovementChecklist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleMovementChecklistComponentsPage: VehicleMovementChecklistComponentsPage;
  let vehicleMovementChecklistUpdatePage: VehicleMovementChecklistUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    vehicleMovementChecklistComponentsPage = new VehicleMovementChecklistComponentsPage();
    vehicleMovementChecklistComponentsPage = await vehicleMovementChecklistComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleMovementChecklists', async () => {
    expect(await vehicleMovementChecklistComponentsPage.title.getText()).to.match(/Vehicle Movement Checklists/);
    expect(await vehicleMovementChecklistComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleMovementChecklists', async () => {
    const beforeRecordsCount = (await isVisible(vehicleMovementChecklistComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleMovementChecklistComponentsPage.table);
    vehicleMovementChecklistUpdatePage = await vehicleMovementChecklistComponentsPage.goToCreateVehicleMovementChecklist();
    await vehicleMovementChecklistUpdatePage.enterData();

    expect(await vehicleMovementChecklistComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleMovementChecklistComponentsPage.table);
    await waitUntilCount(vehicleMovementChecklistComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleMovementChecklistComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleMovementChecklistComponentsPage.deleteVehicleMovementChecklist();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleMovementChecklistComponentsPage.records, beforeRecordsCount);
      expect(await vehicleMovementChecklistComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleMovementChecklistComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
