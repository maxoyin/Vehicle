import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleMovementCheckHistComponentsPage from './vehicle-movement-check-hist.page-object';
import VehicleMovementCheckHistUpdatePage from './vehicle-movement-check-hist-update.page-object';
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

describe('VehicleMovementCheckHist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleMovementCheckHistComponentsPage: VehicleMovementCheckHistComponentsPage;
  let vehicleMovementCheckHistUpdatePage: VehicleMovementCheckHistUpdatePage;
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
    vehicleMovementCheckHistComponentsPage = new VehicleMovementCheckHistComponentsPage();
    vehicleMovementCheckHistComponentsPage = await vehicleMovementCheckHistComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleMovementCheckHists', async () => {
    expect(await vehicleMovementCheckHistComponentsPage.title.getText()).to.match(/Vehicle Movement Check Hists/);
    expect(await vehicleMovementCheckHistComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleMovementCheckHists', async () => {
    const beforeRecordsCount = (await isVisible(vehicleMovementCheckHistComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleMovementCheckHistComponentsPage.table);
    vehicleMovementCheckHistUpdatePage = await vehicleMovementCheckHistComponentsPage.goToCreateVehicleMovementCheckHist();
    await vehicleMovementCheckHistUpdatePage.enterData();

    expect(await vehicleMovementCheckHistComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleMovementCheckHistComponentsPage.table);
    await waitUntilCount(vehicleMovementCheckHistComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleMovementCheckHistComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleMovementCheckHistComponentsPage.deleteVehicleMovementCheckHist();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleMovementCheckHistComponentsPage.records, beforeRecordsCount);
      expect(await vehicleMovementCheckHistComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleMovementCheckHistComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
