import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VehicleMovementUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleMovement.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  sourceSubCityIdInput: ElementFinder = element(by.css('input#vehicle-movement-sourceSubCityId'));
  destinationSubCityIdInput: ElementFinder = element(by.css('input#vehicle-movement-destinationSubCityId'));
  movementTypeSelect: ElementFinder = element(by.css('select#vehicle-movement-movementType'));
  retrievalAgentMaxIdInput: ElementFinder = element(by.css('input#vehicle-movement-retrievalAgentMaxId'));
  odometerReadingOutwardInput: ElementFinder = element(by.css('input#vehicle-movement-odometerReadingOutward'));
  odometerReadingInwardInput: ElementFinder = element(by.css('input#vehicle-movement-odometerReadingInward'));
  vehicleSelect: ElementFinder = element(by.css('select#vehicle-movement-vehicle'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSourceSubCityIdInput(sourceSubCityId) {
    await this.sourceSubCityIdInput.sendKeys(sourceSubCityId);
  }

  async getSourceSubCityIdInput() {
    return this.sourceSubCityIdInput.getAttribute('value');
  }

  async setDestinationSubCityIdInput(destinationSubCityId) {
    await this.destinationSubCityIdInput.sendKeys(destinationSubCityId);
  }

  async getDestinationSubCityIdInput() {
    return this.destinationSubCityIdInput.getAttribute('value');
  }

  async setMovementTypeSelect(movementType) {
    await this.movementTypeSelect.sendKeys(movementType);
  }

  async getMovementTypeSelect() {
    return this.movementTypeSelect.element(by.css('option:checked')).getText();
  }

  async movementTypeSelectLastOption() {
    await this.movementTypeSelect.all(by.tagName('option')).last().click();
  }
  async setRetrievalAgentMaxIdInput(retrievalAgentMaxId) {
    await this.retrievalAgentMaxIdInput.sendKeys(retrievalAgentMaxId);
  }

  async getRetrievalAgentMaxIdInput() {
    return this.retrievalAgentMaxIdInput.getAttribute('value');
  }

  async setOdometerReadingOutwardInput(odometerReadingOutward) {
    await this.odometerReadingOutwardInput.sendKeys(odometerReadingOutward);
  }

  async getOdometerReadingOutwardInput() {
    return this.odometerReadingOutwardInput.getAttribute('value');
  }

  async setOdometerReadingInwardInput(odometerReadingInward) {
    await this.odometerReadingInwardInput.sendKeys(odometerReadingInward);
  }

  async getOdometerReadingInwardInput() {
    return this.odometerReadingInwardInput.getAttribute('value');
  }

  async vehicleSelectLastOption() {
    await this.vehicleSelect.all(by.tagName('option')).last().click();
  }

  async vehicleSelectOption(option) {
    await this.vehicleSelect.sendKeys(option);
  }

  getVehicleSelect() {
    return this.vehicleSelect;
  }

  async getVehicleSelectedOption() {
    return this.vehicleSelect.element(by.css('option:checked')).getText();
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
    await this.setSourceSubCityIdInput('sourceSubCityId');
    expect(await this.getSourceSubCityIdInput()).to.match(/sourceSubCityId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDestinationSubCityIdInput('destinationSubCityId');
    expect(await this.getDestinationSubCityIdInput()).to.match(/destinationSubCityId/);
    await waitUntilDisplayed(this.saveButton);
    await this.movementTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setRetrievalAgentMaxIdInput('retrievalAgentMaxId');
    expect(await this.getRetrievalAgentMaxIdInput()).to.match(/retrievalAgentMaxId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOdometerReadingOutwardInput('5');
    expect(await this.getOdometerReadingOutwardInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setOdometerReadingInwardInput('5');
    expect(await this.getOdometerReadingInwardInput()).to.eq('5');
    await this.vehicleSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
