import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SimNetworkUpdatePage from './sim-network-update.page-object';

const expect = chai.expect;
export class SimNetworkDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.simNetwork.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-simNetwork'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SimNetworkComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('sim-network-heading'));
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
    await navBarPage.getEntityPage('sim-network');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSimNetwork() {
    await this.createButton.click();
    return new SimNetworkUpdatePage();
  }

  async deleteSimNetwork() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const simNetworkDeleteDialog = new SimNetworkDeleteDialog();
    await waitUntilDisplayed(simNetworkDeleteDialog.deleteModal);
    expect(await simNetworkDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/prospectServiceApp.simNetwork.delete.question/);
    await simNetworkDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(simNetworkDeleteDialog.deleteModal);

    expect(await isVisible(simNetworkDeleteDialog.deleteModal)).to.be.false;
  }
}
