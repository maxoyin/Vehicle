import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleChecklistItemUpdatePage from './vehicle-checklist-item-update.page-object';

const expect = chai.expect;
export class VehicleChecklistItemDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.vehicleChecklistItem.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleChecklistItem'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleChecklistItemComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-checklist-item-heading'));
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
    await navBarPage.getEntityPage('vehicle-checklist-item');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleChecklistItem() {
    await this.createButton.click();
    return new VehicleChecklistItemUpdatePage();
  }

  async deleteVehicleChecklistItem() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleChecklistItemDeleteDialog = new VehicleChecklistItemDeleteDialog();
    await waitUntilDisplayed(vehicleChecklistItemDeleteDialog.deleteModal);
    expect(await vehicleChecklistItemDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.vehicleChecklistItem.delete.question/
    );
    await vehicleChecklistItemDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleChecklistItemDeleteDialog.deleteModal);

    expect(await isVisible(vehicleChecklistItemDeleteDialog.deleteModal)).to.be.false;
  }
}
