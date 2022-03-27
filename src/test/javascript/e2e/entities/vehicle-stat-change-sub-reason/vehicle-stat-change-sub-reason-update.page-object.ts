import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VehicleStatChangeSubReasonUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleStatChangeSubReason.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#vehicle-stat-change-sub-reason-code'));
  displayNameInput: ElementFinder = element(by.css('input#vehicle-stat-change-sub-reason-displayName'));
  descriptionInput: ElementFinder = element(by.css('input#vehicle-stat-change-sub-reason-description'));
  vehicleStatusChangeReasonSelect: ElementFinder = element(by.css('select#vehicle-stat-change-sub-reason-vehicleStatusChangeReason'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setDisplayNameInput(displayName) {
    await this.displayNameInput.sendKeys(displayName);
  }

  async getDisplayNameInput() {
    return this.displayNameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async vehicleStatusChangeReasonSelectLastOption() {
    await this.vehicleStatusChangeReasonSelect.all(by.tagName('option')).last().click();
  }

  async vehicleStatusChangeReasonSelectOption(option) {
    await this.vehicleStatusChangeReasonSelect.sendKeys(option);
  }

  getVehicleStatusChangeReasonSelect() {
    return this.vehicleStatusChangeReasonSelect;
  }

  async getVehicleStatusChangeReasonSelectedOption() {
    return this.vehicleStatusChangeReasonSelect.element(by.css('option:checked')).getText();
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
    await this.setCodeInput('code');
    expect(await this.getCodeInput()).to.match(/code/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDisplayNameInput('displayName');
    expect(await this.getDisplayNameInput()).to.match(/displayName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.vehicleStatusChangeReasonSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
