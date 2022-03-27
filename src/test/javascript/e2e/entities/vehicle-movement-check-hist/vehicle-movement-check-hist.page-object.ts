import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleMovementCheckHistUpdatePage from './vehicle-movement-check-hist-update.page-object';

const expect = chai.expect;
export class VehicleMovementCheckHistDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleMovementCheckHist.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleMovementCheckHist'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleMovementCheckHistComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-movement-check-hist-heading'));
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
    await navBarPage.getEntityPage('vehicle-movement-check-hist');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleMovementCheckHist() {
    await this.createButton.click();
    return new VehicleMovementCheckHistUpdatePage();
  }

  async deleteVehicleMovementCheckHist() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleMovementCheckHistDeleteDialog = new VehicleMovementCheckHistDeleteDialog();
    await waitUntilDisplayed(vehicleMovementCheckHistDeleteDialog.deleteModal);
    expect(await vehicleMovementCheckHistDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.vehicleMovementCheckHist.delete.question/
    );
    await vehicleMovementCheckHistDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleMovementCheckHistDeleteDialog.deleteModal);

    expect(await isVisible(vehicleMovementCheckHistDeleteDialog.deleteModal)).to.be.false;
  }
}
