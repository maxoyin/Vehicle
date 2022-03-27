import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleChecklistItemComponentsPage from './vehicle-checklist-item.page-object';
import VehicleChecklistItemUpdatePage from './vehicle-checklist-item-update.page-object';
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

describe('VehicleChecklistItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleChecklistItemComponentsPage: VehicleChecklistItemComponentsPage;
  let vehicleChecklistItemUpdatePage: VehicleChecklistItemUpdatePage;
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
    vehicleChecklistItemComponentsPage = new VehicleChecklistItemComponentsPage();
    vehicleChecklistItemComponentsPage = await vehicleChecklistItemComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleChecklistItems', async () => {
    expect(await vehicleChecklistItemComponentsPage.title.getText()).to.match(/Vehicle Checklist Items/);
    expect(await vehicleChecklistItemComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleChecklistItems', async () => {
    const beforeRecordsCount = (await isVisible(vehicleChecklistItemComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleChecklistItemComponentsPage.table);
    vehicleChecklistItemUpdatePage = await vehicleChecklistItemComponentsPage.goToCreateVehicleChecklistItem();
    await vehicleChecklistItemUpdatePage.enterData();

    expect(await vehicleChecklistItemComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleChecklistItemComponentsPage.table);
    await waitUntilCount(vehicleChecklistItemComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleChecklistItemComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleChecklistItemComponentsPage.deleteVehicleChecklistItem();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleChecklistItemComponentsPage.records, beforeRecordsCount);
      expect(await vehicleChecklistItemComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleChecklistItemComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
