import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleStatChangeSubReasonUpdatePage from './vehicle-stat-change-sub-reason-update.page-object';

const expect = chai.expect;
export class VehicleStatChangeSubReasonDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleStatChangeSubReason.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleStatChangeSubReason'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleStatChangeSubReasonComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-stat-change-sub-reason-heading'));
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
    await navBarPage.getEntityPage('vehicle-stat-change-sub-reason');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleStatChangeSubReason() {
    await this.createButton.click();
    return new VehicleStatChangeSubReasonUpdatePage();
  }

  async deleteVehicleStatChangeSubReason() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleStatChangeSubReasonDeleteDialog = new VehicleStatChangeSubReasonDeleteDialog();
    await waitUntilDisplayed(vehicleStatChangeSubReasonDeleteDialog.deleteModal);
    expect(await vehicleStatChangeSubReasonDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.vehicleStatChangeSubReason.delete.question/
    );
    await vehicleStatChangeSubReasonDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleStatChangeSubReasonDeleteDialog.deleteModal);

    expect(await isVisible(vehicleStatChangeSubReasonDeleteDialog.deleteModal)).to.be.false;
  }
}
