import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleTrimComponentsPage from './vehicle-trim.page-object';
import VehicleTrimUpdatePage from './vehicle-trim-update.page-object';
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

describe('VehicleTrim e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleTrimComponentsPage: VehicleTrimComponentsPage;
  let vehicleTrimUpdatePage: VehicleTrimUpdatePage;
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
    vehicleTrimComponentsPage = new VehicleTrimComponentsPage();
    vehicleTrimComponentsPage = await vehicleTrimComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleTrims', async () => {
    expect(await vehicleTrimComponentsPage.title.getText()).to.match(/Vehicle Trims/);
    expect(await vehicleTrimComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleTrims', async () => {
    const beforeRecordsCount = (await isVisible(vehicleTrimComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleTrimComponentsPage.table);
    vehicleTrimUpdatePage = await vehicleTrimComponentsPage.goToCreateVehicleTrim();
    await vehicleTrimUpdatePage.enterData();

    expect(await vehicleTrimComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleTrimComponentsPage.table);
    await waitUntilCount(vehicleTrimComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleTrimComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleTrimComponentsPage.deleteVehicleTrim();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleTrimComponentsPage.records, beforeRecordsCount);
      expect(await vehicleTrimComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleTrimComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
