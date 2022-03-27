import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VehicleMovementChecklistUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleMovementChecklist.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  itemStatusSelect: ElementFinder = element(by.css('select#vehicle-movement-checklist-itemStatus'));
  vehicleMovementSelect: ElementFinder = element(by.css('select#vehicle-movement-checklist-vehicleMovement'));
  vehicleMovementHistorySelect: ElementFinder = element(by.css('select#vehicle-movement-checklist-vehicleMovementHistory'));

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
  async vehicleMovementSelectLastOption() {
    await this.vehicleMovementSelect.all(by.tagName('option')).last().click();
  }

  async vehicleMovementSelectOption(option) {
    await this.vehicleMovementSelect.sendKeys(option);
  }

  getVehicleMovementSelect() {
    return this.vehicleMovementSelect;
  }

  async getVehicleMovementSelectedOption() {
    return this.vehicleMovementSelect.element(by.css('option:checked')).getText();
  }

  async vehicleMovementHistorySelectLastOption() {
    await this.vehicleMovementHistorySelect.all(by.tagName('option')).last().click();
  }

  async vehicleMovementHistorySelectOption(option) {
    await this.vehicleMovementHistorySelect.sendKeys(option);
  }

  getVehicleMovementHistorySelect() {
    return this.vehicleMovementHistorySelect;
  }

  async getVehicleMovementHistorySelectedOption() {
    return this.vehicleMovementHistorySelect.element(by.css('option:checked')).getText();
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
    await this.vehicleMovementSelectLastOption();
    await this.vehicleMovementHistorySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
