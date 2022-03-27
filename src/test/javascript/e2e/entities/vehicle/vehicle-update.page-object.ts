import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VehicleUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.vehicle.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  maxVehicleIdInput: ElementFinder = element(by.css('input#vehicle-maxVehicleId'));
  subCityIdInput: ElementFinder = element(by.css('input#vehicle-subCityId'));
  chassisNumberInput: ElementFinder = element(by.css('input#vehicle-chassisNumber'));
  ignitionNumberInput: ElementFinder = element(by.css('input#vehicle-ignitionNumber'));
  engineNumberInput: ElementFinder = element(by.css('input#vehicle-engineNumber'));
  vehicleColorInput: ElementFinder = element(by.css('input#vehicle-vehicleColor'));
  oemVendorNameInput: ElementFinder = element(by.css('input#vehicle-oemVendorName'));
  receiverInput: ElementFinder = element(by.css('input#vehicle-receiver'));
  serviceTypeCodeInput: ElementFinder = element(by.css('input#vehicle-serviceTypeCode'));
  partnerCodeInput: ElementFinder = element(by.css('input#vehicle-partnerCode'));
  platformCodeInput: ElementFinder = element(by.css('input#vehicle-platformCode'));
  plateNumberInput: ElementFinder = element(by.css('input#vehicle-plateNumber'));
  licenseExpirationDateInput: ElementFinder = element(by.css('input#vehicle-licenseExpirationDate'));
  pricingTemplateIdInput: ElementFinder = element(by.css('input#vehicle-pricingTemplateId'));
  deviceImeiInput: ElementFinder = element(by.css('input#vehicle-deviceImei'));
  simSerialNumberInput: ElementFinder = element(by.css('input#vehicle-simSerialNumber'));
  devicePhoneInput: ElementFinder = element(by.css('input#vehicle-devicePhone'));
  batchIdInput: ElementFinder = element(by.css('input#vehicle-batchId'));
  isMaxVehicleInput: ElementFinder = element(by.css('input#vehicle-isMaxVehicle'));
  maxGlobalIdInput: ElementFinder = element(by.css('input#vehicle-maxGlobalId'));
  vehicleMovementSelect: ElementFinder = element(by.css('select#vehicle-vehicleMovement'));
  vehicleMovementHistorySelect: ElementFinder = element(by.css('select#vehicle-vehicleMovementHistory'));
  vehicleTrimSelect: ElementFinder = element(by.css('select#vehicle-vehicleTrim'));
  vehicleStatusSelect: ElementFinder = element(by.css('select#vehicle-vehicleStatus'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMaxVehicleIdInput(maxVehicleId) {
    await this.maxVehicleIdInput.sendKeys(maxVehicleId);
  }

  async getMaxVehicleIdInput() {
    return this.maxVehicleIdInput.getAttribute('value');
  }

  async setSubCityIdInput(subCityId) {
    await this.subCityIdInput.sendKeys(subCityId);
  }

  async getSubCityIdInput() {
    return this.subCityIdInput.getAttribute('value');
  }

  async setChassisNumberInput(chassisNumber) {
    await this.chassisNumberInput.sendKeys(chassisNumber);
  }

  async getChassisNumberInput() {
    return this.chassisNumberInput.getAttribute('value');
  }

  async setIgnitionNumberInput(ignitionNumber) {
    await this.ignitionNumberInput.sendKeys(ignitionNumber);
  }

  async getIgnitionNumberInput() {
    return this.ignitionNumberInput.getAttribute('value');
  }

  async setEngineNumberInput(engineNumber) {
    await this.engineNumberInput.sendKeys(engineNumber);
  }

  async getEngineNumberInput() {
    return this.engineNumberInput.getAttribute('value');
  }

  async setVehicleColorInput(vehicleColor) {
    await this.vehicleColorInput.sendKeys(vehicleColor);
  }

  async getVehicleColorInput() {
    return this.vehicleColorInput.getAttribute('value');
  }

  async setOemVendorNameInput(oemVendorName) {
    await this.oemVendorNameInput.sendKeys(oemVendorName);
  }

  async getOemVendorNameInput() {
    return this.oemVendorNameInput.getAttribute('value');
  }

  async setReceiverInput(receiver) {
    await this.receiverInput.sendKeys(receiver);
  }

  async getReceiverInput() {
    return this.receiverInput.getAttribute('value');
  }

  async setServiceTypeCodeInput(serviceTypeCode) {
    await this.serviceTypeCodeInput.sendKeys(serviceTypeCode);
  }

  async getServiceTypeCodeInput() {
    return this.serviceTypeCodeInput.getAttribute('value');
  }

  async setPartnerCodeInput(partnerCode) {
    await this.partnerCodeInput.sendKeys(partnerCode);
  }

  async getPartnerCodeInput() {
    return this.partnerCodeInput.getAttribute('value');
  }

  async setPlatformCodeInput(platformCode) {
    await this.platformCodeInput.sendKeys(platformCode);
  }

  async getPlatformCodeInput() {
    return this.platformCodeInput.getAttribute('value');
  }

  async setPlateNumberInput(plateNumber) {
    await this.plateNumberInput.sendKeys(plateNumber);
  }

  async getPlateNumberInput() {
    return this.plateNumberInput.getAttribute('value');
  }

  async setLicenseExpirationDateInput(licenseExpirationDate) {
    await this.licenseExpirationDateInput.sendKeys(licenseExpirationDate);
  }

  async getLicenseExpirationDateInput() {
    return this.licenseExpirationDateInput.getAttribute('value');
  }

  async setPricingTemplateIdInput(pricingTemplateId) {
    await this.pricingTemplateIdInput.sendKeys(pricingTemplateId);
  }

  async getPricingTemplateIdInput() {
    return this.pricingTemplateIdInput.getAttribute('value');
  }

  async setDeviceImeiInput(deviceImei) {
    await this.deviceImeiInput.sendKeys(deviceImei);
  }

  async getDeviceImeiInput() {
    return this.deviceImeiInput.getAttribute('value');
  }

  async setSimSerialNumberInput(simSerialNumber) {
    await this.simSerialNumberInput.sendKeys(simSerialNumber);
  }

  async getSimSerialNumberInput() {
    return this.simSerialNumberInput.getAttribute('value');
  }

  async setDevicePhoneInput(devicePhone) {
    await this.devicePhoneInput.sendKeys(devicePhone);
  }

  async getDevicePhoneInput() {
    return this.devicePhoneInput.getAttribute('value');
  }

  async setBatchIdInput(batchId) {
    await this.batchIdInput.sendKeys(batchId);
  }

  async getBatchIdInput() {
    return this.batchIdInput.getAttribute('value');
  }

  getIsMaxVehicleInput() {
    return this.isMaxVehicleInput;
  }
  async setMaxGlobalIdInput(maxGlobalId) {
    await this.maxGlobalIdInput.sendKeys(maxGlobalId);
  }

  async getMaxGlobalIdInput() {
    return this.maxGlobalIdInput.getAttribute('value');
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

  async vehicleTrimSelectLastOption() {
    await this.vehicleTrimSelect.all(by.tagName('option')).last().click();
  }

  async vehicleTrimSelectOption(option) {
    await this.vehicleTrimSelect.sendKeys(option);
  }

  getVehicleTrimSelect() {
    return this.vehicleTrimSelect;
  }

  async getVehicleTrimSelectedOption() {
    return this.vehicleTrimSelect.element(by.css('option:checked')).getText();
  }

  async vehicleStatusSelectLastOption() {
    await this.vehicleStatusSelect.all(by.tagName('option')).last().click();
  }

  async vehicleStatusSelectOption(option) {
    await this.vehicleStatusSelect.sendKeys(option);
  }

  getVehicleStatusSelect() {
    return this.vehicleStatusSelect;
  }

  async getVehicleStatusSelectedOption() {
    return this.vehicleStatusSelect.element(by.css('option:checked')).getText();
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
    await this.setMaxVehicleIdInput('maxVehicleId');
    expect(await this.getMaxVehicleIdInput()).to.match(/maxVehicleId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setSubCityIdInput('subCityId');
    expect(await this.getSubCityIdInput()).to.match(/subCityId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setChassisNumberInput('chassisNumber');
    expect(await this.getChassisNumberInput()).to.match(/chassisNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIgnitionNumberInput('ignitionNumber');
    expect(await this.getIgnitionNumberInput()).to.match(/ignitionNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEngineNumberInput('engineNumber');
    expect(await this.getEngineNumberInput()).to.match(/engineNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setVehicleColorInput('vehicleColor');
    expect(await this.getVehicleColorInput()).to.match(/vehicleColor/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOemVendorNameInput('oemVendorName');
    expect(await this.getOemVendorNameInput()).to.match(/oemVendorName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setReceiverInput('receiver');
    expect(await this.getReceiverInput()).to.match(/receiver/);
    await waitUntilDisplayed(this.saveButton);
    await this.setServiceTypeCodeInput('serviceTypeCode');
    expect(await this.getServiceTypeCodeInput()).to.match(/serviceTypeCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPartnerCodeInput('partnerCode');
    expect(await this.getPartnerCodeInput()).to.match(/partnerCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPlatformCodeInput('platformCode');
    expect(await this.getPlatformCodeInput()).to.match(/platformCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPlateNumberInput('plateNumber');
    expect(await this.getPlateNumberInput()).to.match(/plateNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLicenseExpirationDateInput('01-01-2001');
    expect(await this.getLicenseExpirationDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setPricingTemplateIdInput('pricingTemplateId');
    expect(await this.getPricingTemplateIdInput()).to.match(/pricingTemplateId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDeviceImeiInput('deviceImei');
    expect(await this.getDeviceImeiInput()).to.match(/deviceImei/);
    await waitUntilDisplayed(this.saveButton);
    await this.setSimSerialNumberInput('simSerialNumber');
    expect(await this.getSimSerialNumberInput()).to.match(/simSerialNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDevicePhoneInput('devicePhone');
    expect(await this.getDevicePhoneInput()).to.match(/devicePhone/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBatchIdInput('5');
    expect(await this.getBatchIdInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    const selectedIsMaxVehicle = await this.getIsMaxVehicleInput().isSelected();
    if (selectedIsMaxVehicle) {
      await this.getIsMaxVehicleInput().click();
      expect(await this.getIsMaxVehicleInput().isSelected()).to.be.false;
    } else {
      await this.getIsMaxVehicleInput().click();
      expect(await this.getIsMaxVehicleInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setMaxGlobalIdInput('maxGlobalId');
    expect(await this.getMaxGlobalIdInput()).to.match(/maxGlobalId/);
    await this.vehicleMovementSelectLastOption();
    await this.vehicleMovementHistorySelectLastOption();
    await this.vehicleTrimSelectLastOption();
    await this.vehicleStatusSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
