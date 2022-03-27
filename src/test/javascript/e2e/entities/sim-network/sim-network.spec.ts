import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SimNetworkComponentsPage from './sim-network.page-object';
import SimNetworkUpdatePage from './sim-network-update.page-object';
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

describe('SimNetwork e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let simNetworkComponentsPage: SimNetworkComponentsPage;
  let simNetworkUpdatePage: SimNetworkUpdatePage;
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
    simNetworkComponentsPage = new SimNetworkComponentsPage();
    simNetworkComponentsPage = await simNetworkComponentsPage.goToPage(navBarPage);
  });

  it('should load SimNetworks', async () => {
    expect(await simNetworkComponentsPage.title.getText()).to.match(/Sim Networks/);
    expect(await simNetworkComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete SimNetworks', async () => {
    const beforeRecordsCount = (await isVisible(simNetworkComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(simNetworkComponentsPage.table);
    simNetworkUpdatePage = await simNetworkComponentsPage.goToCreateSimNetwork();
    await simNetworkUpdatePage.enterData();

    expect(await simNetworkComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(simNetworkComponentsPage.table);
    await waitUntilCount(simNetworkComponentsPage.records, beforeRecordsCount + 1);
    expect(await simNetworkComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await simNetworkComponentsPage.deleteSimNetwork();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(simNetworkComponentsPage.records, beforeRecordsCount);
      expect(await simNetworkComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(simNetworkComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
