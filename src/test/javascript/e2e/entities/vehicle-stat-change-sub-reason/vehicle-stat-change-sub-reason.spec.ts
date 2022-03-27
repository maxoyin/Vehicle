import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleStatChangeSubReasonComponentsPage from './vehicle-stat-change-sub-reason.page-object';
import VehicleStatChangeSubReasonUpdatePage from './vehicle-stat-change-sub-reason-update.page-object';
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

describe('VehicleStatChangeSubReason e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleStatChangeSubReasonComponentsPage: VehicleStatChangeSubReasonComponentsPage;
  let vehicleStatChangeSubReasonUpdatePage: VehicleStatChangeSubReasonUpdatePage;
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
    vehicleStatChangeSubReasonComponentsPage = new VehicleStatChangeSubReasonComponentsPage();
    vehicleStatChangeSubReasonComponentsPage = await vehicleStatChangeSubReasonComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleStatChangeSubReasons', async () => {
    expect(await vehicleStatChangeSubReasonComponentsPage.title.getText()).to.match(/Vehicle Stat Change Sub Reasons/);
    expect(await vehicleStatChangeSubReasonComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleStatChangeSubReasons', async () => {
    const beforeRecordsCount = (await isVisible(vehicleStatChangeSubReasonComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleStatChangeSubReasonComponentsPage.table);
    vehicleStatChangeSubReasonUpdatePage = await vehicleStatChangeSubReasonComponentsPage.goToCreateVehicleStatChangeSubReason();
    await vehicleStatChangeSubReasonUpdatePage.enterData();

    expect(await vehicleStatChangeSubReasonComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleStatChangeSubReasonComponentsPage.table);
    await waitUntilCount(vehicleStatChangeSubReasonComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleStatChangeSubReasonComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleStatChangeSubReasonComponentsPage.deleteVehicleStatChangeSubReason();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleStatChangeSubReasonComponentsPage.records, beforeRecordsCount);
      expect(await vehicleStatChangeSubReasonComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleStatChangeSubReasonComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
