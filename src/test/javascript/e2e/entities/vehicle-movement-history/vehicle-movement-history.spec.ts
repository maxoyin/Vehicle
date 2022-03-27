import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleMovementHistoryComponentsPage from './vehicle-movement-history.page-object';
import VehicleMovementHistoryUpdatePage from './vehicle-movement-history-update.page-object';
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

describe('VehicleMovementHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleMovementHistoryComponentsPage: VehicleMovementHistoryComponentsPage;
  let vehicleMovementHistoryUpdatePage: VehicleMovementHistoryUpdatePage;
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
    vehicleMovementHistoryComponentsPage = new VehicleMovementHistoryComponentsPage();
    vehicleMovementHistoryComponentsPage = await vehicleMovementHistoryComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleMovementHistories', async () => {
    expect(await vehicleMovementHistoryComponentsPage.title.getText()).to.match(/Vehicle Movement Histories/);
    expect(await vehicleMovementHistoryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleMovementHistories', async () => {
    const beforeRecordsCount = (await isVisible(vehicleMovementHistoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleMovementHistoryComponentsPage.table);
    vehicleMovementHistoryUpdatePage = await vehicleMovementHistoryComponentsPage.goToCreateVehicleMovementHistory();
    await vehicleMovementHistoryUpdatePage.enterData();

    expect(await vehicleMovementHistoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleMovementHistoryComponentsPage.table);
    await waitUntilCount(vehicleMovementHistoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleMovementHistoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleMovementHistoryComponentsPage.deleteVehicleMovementHistory();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleMovementHistoryComponentsPage.records, beforeRecordsCount);
      expect(await vehicleMovementHistoryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleMovementHistoryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
