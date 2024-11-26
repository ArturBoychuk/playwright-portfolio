import { Page } from '@playwright/test';
import { FormPage } from '../pageObjects/FormPage';

export class PageManager {
    private readonly page: Page
    private readonly formPage: FormPage

    constructor(page: Page) {
        this.page = page;
        this.formPage = new FormPage(this.page)
    }

    getFormPage() {
        return this.formPage;
      }    
}
