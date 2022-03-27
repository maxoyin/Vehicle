import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleMovementUpdatePage from './vehicle-movement-update.page-object';

const expect = chai.expect;
export class VehicleMovementDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleMovement.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleMovement'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleMovementComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-movement-heading'));
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
    await navBarPage.getEntityPage('vehicle-movement');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleMovement() {
    await this.createButton.click();
    return new VehicleMovementUpdatePage();
  }

  async deleteVehicleMovement() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleMovementDeleteDialog = new VehicleMovementDeleteDialog();
    await waitUntilDisplayed(vehicleMovementDeleteDialog.deleteModal);
    expect(await vehicleMovementDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.vehicleMovement.delete.question/
    );
    await vehicleMovementDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleMovementDeleteDialog.deleteModal);

    expect(await isVisible(vehicleMovementDeleteDialog.deleteModal)).to.be.false;
  }
}
