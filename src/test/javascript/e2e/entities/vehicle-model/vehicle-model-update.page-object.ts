import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VehicleModelUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleModel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#vehicle-model-code'));
  displayNameInput: ElementFinder = element(by.css('input#vehicle-model-displayName'));
  isDisplayOnInput: ElementFinder = element(by.css('input#vehicle-model-isDisplayOn'));
  modelYearInput: ElementFinder = element(by.css('input#vehicle-model-modelYear'));
  descriptionInput: ElementFinder = element(by.css('input#vehicle-model-description'));
  vehicleManufacturerSelect: ElementFinder = element(by.css('select#vehicle-model-vehicleManufacturer'));
  vehicleTypeSelect: ElementFinder = element(by.css('select#vehicle-model-vehicleType'));

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
  async setModelYearInput(modelYear) {
    await this.modelYearInput.sendKeys(modelYear);
  }

  async getModelYearInput() {
    return this.modelYearInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async vehicleManufacturerSelectLastOption() {
    await this.vehicleManufacturerSelect.all(by.tagName('option')).last().click();
  }

  async vehicleManufacturerSelectOption(option) {
    await this.vehicleManufacturerSelect.sendKeys(option);
  }

  getVehicleManufacturerSelect() {
    return this.vehicleManufacturerSelect;
  }

  async getVehicleManufacturerSelectedOption() {
    return this.vehicleManufacturerSelect.element(by.css('option:checked')).getText();
  }

  async vehicleTypeSelectLastOption() {
    await this.vehicleTypeSelect.all(by.tagName('option')).last().click();
  }

  async vehicleTypeSelectOption(option) {
    await this.vehicleTypeSelect.sendKeys(option);
  }

  getVehicleTypeSelect() {
    return this.vehicleTypeSelect;
  }

  async getVehicleTypeSelectedOption() {
    return this.vehicleTypeSelect.element(by.css('option:checked')).getText();
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
    await this.setModelYearInput('01-01-2001');
    expect(await this.getModelYearInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.vehicleManufacturerSelectLastOption();
    await this.vehicleTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
