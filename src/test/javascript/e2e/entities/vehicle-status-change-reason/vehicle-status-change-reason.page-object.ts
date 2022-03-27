import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleStatusChangeReasonUpdatePage from './vehicle-status-change-reason-update.page-object';

const expect = chai.expect;
export class VehicleStatusChangeReasonDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleStatusChangeReason.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleStatusChangeReason'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleStatusChangeReasonComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-status-change-reason-heading'));
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
    await navBarPage.getEntityPage('vehicle-status-change-reason');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleStatusChangeReason() {
    await this.createButton.click();
    return new VehicleStatusChangeReasonUpdatePage();
  }

  async deleteVehicleStatusChangeReason() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleStatusChangeReasonDeleteDialog = new VehicleStatusChangeReasonDeleteDialog();
    await waitUntilDisplayed(vehicleStatusChangeReasonDeleteDialog.deleteModal);
    expect(await vehicleStatusChangeReasonDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.vehicleStatusChangeReason.delete.question/
    );
    await vehicleStatusChangeReasonDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleStatusChangeReasonDeleteDialog.deleteModal);

    expect(await isVisible(vehicleStatusChangeReasonDeleteDialog.deleteModal)).to.be.false;
  }
}
