import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleManufacturerUpdatePage from './vehicle-manufacturer-update.page-object';

const expect = chai.expect;
export class VehicleManufacturerDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleManufacturer.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleManufacturer'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleManufacturerComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-manufacturer-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('vehicle-manufacturer');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleManufacturer() {
    await this.createButton.click();
    return new VehicleManufacturerUpdatePage();
  }

  async deleteVehicleManufacturer() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleManufacturerDeleteDialog = new VehicleManufacturerDeleteDialog();
    await waitUntilDisplayed(vehicleManufacturerDeleteDialog.deleteModal);
    expect(await vehicleManufacturerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.vehicleManufacturer.delete.question/
    );
    await vehicleManufacturerDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleManufacturerDeleteDialog.deleteModal);

    expect(await isVisible(vehicleManufacturerDeleteDialog.deleteModal)).to.be.false;
  }
}
