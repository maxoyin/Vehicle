import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleModelComponentsPage from './vehicle-model.page-object';
import VehicleModelUpdatePage from './vehicle-model-update.page-object';
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

describe('VehicleModel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleModelComponentsPage: VehicleModelComponentsPage;
  let vehicleModelUpdatePage: VehicleModelUpdatePage;
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
    vehicleModelComponentsPage = new VehicleModelComponentsPage();
    vehicleModelComponentsPage = await vehicleModelComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleModels', async () => {
    expect(await vehicleModelComponentsPage.title.getText()).to.match(/Vehicle Models/);
    expect(await vehicleModelComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleModels', async () => {
    const beforeRecordsCount = (await isVisible(vehicleModelComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleModelComponentsPage.table);
    vehicleModelUpdatePage = await vehicleModelComponentsPage.goToCreateVehicleModel();
    await vehicleModelUpdatePage.enterData();

    expect(await vehicleModelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleModelComponentsPage.table);
    await waitUntilCount(vehicleModelComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleModelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleModelComponentsPage.deleteVehicleModel();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleModelComponentsPage.records, beforeRecordsCount);
      expect(await vehicleModelComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleModelComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
