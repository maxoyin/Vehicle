import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleTrimUpdatePage from './vehicle-trim-update.page-object';

const expect = chai.expect;
export class VehicleTrimDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleTrim.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleTrim'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleTrimComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-trim-heading'));
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
    await navBarPage.getEntityPage('vehicle-trim');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleTrim() {
    await this.createButton.click();
    return new VehicleTrimUpdatePage();
  }

  async deleteVehicleTrim() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleTrimDeleteDialog = new VehicleTrimDeleteDialog();
    await waitUntilDisplayed(vehicleTrimDeleteDialog.deleteModal);
    expect(await vehicleTrimDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/prospectServiceApp.vehicleTrim.delete.question/);
    await vehicleTrimDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleTrimDeleteDialog.deleteModal);

    expect(await isVisible(vehicleTrimDeleteDialog.deleteModal)).to.be.false;
  }
}
