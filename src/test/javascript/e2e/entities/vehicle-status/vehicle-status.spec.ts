import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleStatusComponentsPage from './vehicle-status.page-object';
import VehicleStatusUpdatePage from './vehicle-status-update.page-object';
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

describe('VehicleStatus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleStatusComponentsPage: VehicleStatusComponentsPage;
  let vehicleStatusUpdatePage: VehicleStatusUpdatePage;
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
    vehicleStatusComponentsPage = new VehicleStatusComponentsPage();
    vehicleStatusComponentsPage = await vehicleStatusComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleStatuses', async () => {
    expect(await vehicleStatusComponentsPage.title.getText()).to.match(/Vehicle Statuses/);
    expect(await vehicleStatusComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleStatuses', async () => {
    const beforeRecordsCount = (await isVisible(vehicleStatusComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleStatusComponentsPage.table);
    vehicleStatusUpdatePage = await vehicleStatusComponentsPage.goToCreateVehicleStatus();
    await vehicleStatusUpdatePage.enterData();

    expect(await vehicleStatusComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleStatusComponentsPage.table);
    await waitUntilCount(vehicleStatusComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleStatusComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleStatusComponentsPage.deleteVehicleStatus();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleStatusComponentsPage.records, beforeRecordsCount);
      expect(await vehicleStatusComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleStatusComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
