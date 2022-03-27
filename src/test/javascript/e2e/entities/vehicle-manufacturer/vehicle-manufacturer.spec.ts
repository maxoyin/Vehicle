import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleManufacturerComponentsPage from './vehicle-manufacturer.page-object';
import VehicleManufacturerUpdatePage from './vehicle-manufacturer-update.page-object';
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

describe('VehicleManufacturer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleManufacturerComponentsPage: VehicleManufacturerComponentsPage;
  let vehicleManufacturerUpdatePage: VehicleManufacturerUpdatePage;
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
    vehicleManufacturerComponentsPage = new VehicleManufacturerComponentsPage();
    vehicleManufacturerComponentsPage = await vehicleManufacturerComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleManufacturers', async () => {
    expect(await vehicleManufacturerComponentsPage.title.getText()).to.match(/Vehicle Manufacturers/);
    expect(await vehicleManufacturerComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleManufacturers', async () => {
    const beforeRecordsCount = (await isVisible(vehicleManufacturerComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleManufacturerComponentsPage.table);
    vehicleManufacturerUpdatePage = await vehicleManufacturerComponentsPage.goToCreateVehicleManufacturer();
    await vehicleManufacturerUpdatePage.enterData();

    expect(await vehicleManufacturerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleManufacturerComponentsPage.table);
    await waitUntilCount(vehicleManufacturerComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleManufacturerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleManufacturerComponentsPage.deleteVehicleManufacturer();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleManufacturerComponentsPage.records, beforeRecordsCount);
      expect(await vehicleManufacturerComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleManufacturerComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
