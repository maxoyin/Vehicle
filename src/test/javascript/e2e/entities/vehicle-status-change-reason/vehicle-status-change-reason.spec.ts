import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleStatusChangeReasonComponentsPage from './vehicle-status-change-reason.page-object';
import VehicleStatusChangeReasonUpdatePage from './vehicle-status-change-reason-update.page-object';
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

describe('VehicleStatusChangeReason e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleStatusChangeReasonComponentsPage: VehicleStatusChangeReasonComponentsPage;
  let vehicleStatusChangeReasonUpdatePage: VehicleStatusChangeReasonUpdatePage;
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
    vehicleStatusChangeReasonComponentsPage = new VehicleStatusChangeReasonComponentsPage();
    vehicleStatusChangeReasonComponentsPage = await vehicleStatusChangeReasonComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleStatusChangeReasons', async () => {
    expect(await vehicleStatusChangeReasonComponentsPage.title.getText()).to.match(/Vehicle Status Change Reasons/);
    expect(await vehicleStatusChangeReasonComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleStatusChangeReasons', async () => {
    const beforeRecordsCount = (await isVisible(vehicleStatusChangeReasonComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleStatusChangeReasonComponentsPage.table);
    vehicleStatusChangeReasonUpdatePage = await vehicleStatusChangeReasonComponentsPage.goToCreateVehicleStatusChangeReason();
    await vehicleStatusChangeReasonUpdatePage.enterData();

    expect(await vehicleStatusChangeReasonComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleStatusChangeReasonComponentsPage.table);
    await waitUntilCount(vehicleStatusChangeReasonComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleStatusChangeReasonComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleStatusChangeReasonComponentsPage.deleteVehicleStatusChangeReason();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleStatusChangeReasonComponentsPage.records, beforeRecordsCount);
      expect(await vehicleStatusChangeReasonComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleStatusChangeReasonComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
