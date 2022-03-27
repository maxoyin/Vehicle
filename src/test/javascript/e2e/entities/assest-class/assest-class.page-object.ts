import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AssestClassUpdatePage from './assest-class-update.page-object';

const expect = chai.expect;
export class AssestClassDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.assestClass.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-assestClass'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AssestClassComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('assest-class-heading'));
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
    await navBarPage.getEntityPage('assest-class');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAssestClass() {
    await this.createButton.click();
    return new AssestClassUpdatePage();
  }

  async deleteAssestClass() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const assestClassDeleteDialog = new AssestClassDeleteDialog();
    await waitUntilDisplayed(assestClassDeleteDialog.deleteModal);
    expect(await assestClassDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/prospectServiceApp.assestClass.delete.question/);
    await assestClassDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(assestClassDeleteDialog.deleteModal);

    expect(await isVisible(assestClassDeleteDialog.deleteModal)).to.be.false;
  }
}
