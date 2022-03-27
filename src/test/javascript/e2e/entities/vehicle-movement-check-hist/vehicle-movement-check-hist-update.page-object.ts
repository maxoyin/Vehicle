import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VehicleMovementCheckHistUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleMovementCheckHist.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  itemStatusSelect: ElementFinder = element(by.css('select#vehicle-movement-check-hist-itemStatus'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setItemStatusSelect(itemStatus) {
    await this.itemStatusSelect.sendKeys(itemStatus);
  }

  async getItemStatusSelect() {
    return this.itemStatusSelect.element(by.css('option:checked')).getText();
  }

  async itemStatusSelectLastOption() {
    await this.itemStatusSelect.all(by.tagName('option')).last().click();
  }
  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.itemStatusSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
