import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleMovementHistoryUpdatePage from './vehicle-movement-history-update.page-object';

const expect = chai.expect;
export class VehicleMovementHistoryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleMovementHistory.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleMovementHistory'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleMovementHistoryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-movement-history-heading'));
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
    await navBarPage.getEntityPage('vehicle-movement-history');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleMovementHistory() {
    await this.createButton.click();
    return new VehicleMovementHistoryUpdatePage();
  }

  async deleteVehicleMovementHistory() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleMovementHistoryDeleteDialog = new VehicleMovementHistoryDeleteDialog();
    await waitUntilDisplayed(vehicleMovementHistoryDeleteDialog.deleteModal);
    expect(await vehicleMovementHistoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.vehicleMovementHistory.delete.question/
    );
    await vehicleMovementHistoryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleMovementHistoryDeleteDialog.deleteModal);

    expect(await isVisible(vehicleMovementHistoryDeleteDialog.deleteModal)).to.be.false;
  }
}
