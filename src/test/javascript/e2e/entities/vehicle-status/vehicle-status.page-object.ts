import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleStatusUpdatePage from './vehicle-status-update.page-object';

const expect = chai.expect;
export class VehicleStatusDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleStatus.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleStatus'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleStatusComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-status-heading'));
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
    await navBarPage.getEntityPage('vehicle-status');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleStatus() {
    await this.createButton.click();
    return new VehicleStatusUpdatePage();
  }

  async deleteVehicleStatus() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleStatusDeleteDialog = new VehicleStatusDeleteDialog();
    await waitUntilDisplayed(vehicleStatusDeleteDialog.deleteModal);
    expect(await vehicleStatusDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.vehicleStatus.delete.question/
    );
    await vehicleStatusDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleStatusDeleteDialog.deleteModal);

    expect(await isVisible(vehicleStatusDeleteDialog.deleteModal)).to.be.false;
  }
}
