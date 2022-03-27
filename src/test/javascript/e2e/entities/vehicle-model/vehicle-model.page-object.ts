import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleModelUpdatePage from './vehicle-model-update.page-object';

const expect = chai.expect;
export class VehicleModelDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleModel.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleModel'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleModelComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-model-heading'));
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
    await navBarPage.getEntityPage('vehicle-model');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleModel() {
    await this.createButton.click();
    return new VehicleModelUpdatePage();
  }

  async deleteVehicleModel() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleModelDeleteDialog = new VehicleModelDeleteDialog();
    await waitUntilDisplayed(vehicleModelDeleteDialog.deleteModal);
    expect(await vehicleModelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/prospectServiceApp.vehicleModel.delete.question/);
    await vehicleModelDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleModelDeleteDialog.deleteModal);

    expect(await isVisible(vehicleModelDeleteDialog.deleteModal)).to.be.false;
  }
}
