import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleMovementComponentsPage from './vehicle-movement.page-object';
import VehicleMovementUpdatePage from './vehicle-movement-update.page-object';
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

describe('VehicleMovement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleMovementComponentsPage: VehicleMovementComponentsPage;
  let vehicleMovementUpdatePage: VehicleMovementUpdatePage;
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
    vehicleMovementComponentsPage = new VehicleMovementComponentsPage();
    vehicleMovementComponentsPage = await vehicleMovementComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleMovements', async () => {
    expect(await vehicleMovementComponentsPage.title.getText()).to.match(/Vehicle Movements/);
    expect(await vehicleMovementComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleMovements', async () => {
    const beforeRecordsCount = (await isVisible(vehicleMovementComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleMovementComponentsPage.table);
    vehicleMovementUpdatePage = await vehicleMovementComponentsPage.goToCreateVehicleMovement();
    await vehicleMovementUpdatePage.enterData();

    expect(await vehicleMovementComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleMovementComponentsPage.table);
    await waitUntilCount(vehicleMovementComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleMovementComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleMovementComponentsPage.deleteVehicleMovement();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleMovementComponentsPage.records, beforeRecordsCount);
      expect(await vehicleMovementComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleMovementComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
