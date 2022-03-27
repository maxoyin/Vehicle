import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleUpdatePage from './vehicle-update.page-object';

const expect = chai.expect;
export class VehicleDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicle.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicle'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-heading'));
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
    await navBarPage.getEntityPage('vehicle');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicle() {
    await this.createButton.click();
    return new VehicleUpdatePage();
  }

  async deleteVehicle() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleDeleteDialog = new VehicleDeleteDialog();
    await waitUntilDisplayed(vehicleDeleteDialog.deleteModal);
    expect(await vehicleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/prospectServiceApp.vehicle.delete.question/);
    await vehicleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleDeleteDialog.deleteModal);

    expect(await isVisible(vehicleDeleteDialog.deleteModal)).to.be.false;
  }
}
