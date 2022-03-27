import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AssestClassComponentsPage from './assest-class.page-object';
import AssestClassUpdatePage from './assest-class-update.page-object';
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

describe('AssestClass e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let assestClassComponentsPage: AssestClassComponentsPage;
  let assestClassUpdatePage: AssestClassUpdatePage;
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
    assestClassComponentsPage = new AssestClassComponentsPage();
    assestClassComponentsPage = await assestClassComponentsPage.goToPage(navBarPage);
  });

  it('should load AssestClasses', async () => {
    expect(await assestClassComponentsPage.title.getText()).to.match(/Assest Classes/);
    expect(await assestClassComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete AssestClasses', async () => {
    const beforeRecordsCount = (await isVisible(assestClassComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(assestClassComponentsPage.table);
    assestClassUpdatePage = await assestClassComponentsPage.goToCreateAssestClass();
    await assestClassUpdatePage.enterData();

    expect(await assestClassComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(assestClassComponentsPage.table);
    await waitUntilCount(assestClassComponentsPage.records, beforeRecordsCount + 1);
    expect(await assestClassComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await assestClassComponentsPage.deleteAssestClass();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(assestClassComponentsPage.records, beforeRecordsCount);
      expect(await assestClassComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(assestClassComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
