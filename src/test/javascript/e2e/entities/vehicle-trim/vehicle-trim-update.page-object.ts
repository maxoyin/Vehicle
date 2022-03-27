import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VehicleTrimUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleTrim.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#vehicle-trim-code'));
  displayNameInput: ElementFinder = element(by.css('input#vehicle-trim-displayName'));
  isDisplayOnInput: ElementFinder = element(by.css('input#vehicle-trim-isDisplayOn'));
  descriptionInput: ElementFinder = element(by.css('input#vehicle-trim-description'));
  vehicleModelSelect: ElementFinder = element(by.css('select#vehicle-trim-vehicleModel'));

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

  getIsDisplayOnInput() {
    return this.isDisplayOnInput;
  }
  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async vehicleModelSelectLastOption() {
    await this.vehicleModelSelect.all(by.tagName('option')).last().click();
  }

  async vehicleModelSelectOption(option) {
    await this.vehicleModelSelect.sendKeys(option);
  }

  getVehicleModelSelect() {
    return this.vehicleModelSelect;
  }

  async getVehicleModelSelectedOption() {
    return this.vehicleModelSelect.element(by.css('option:checked')).getText();
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
    const selectedIsDisplayOn = await this.getIsDisplayOnInput().isSelected();
    if (selectedIsDisplayOn) {
      await this.getIsDisplayOnInput().click();
      expect(await this.getIsDisplayOnInput().isSelected()).to.be.false;
    } else {
      await this.getIsDisplayOnInput().click();
      expect(await this.getIsDisplayOnInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.vehicleModelSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
