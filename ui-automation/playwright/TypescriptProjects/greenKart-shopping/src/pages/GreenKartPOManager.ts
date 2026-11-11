import type { Page } from '@playwright/test';
import { GreenKartCartPage } from './GreenKartCartPage';
import { GreenKartCatalogPage } from './GreenKartCatalogPage';
import { GreenKartCountryPage } from './GreenKartCountryPage';

export class GreenKartPOManager {
    readonly catalog: GreenKartCatalogPage;
    readonly cart: GreenKartCartPage;
    readonly country: GreenKartCountryPage;

    constructor(page: Page) {
        this.catalog = new GreenKartCatalogPage(page);
        this.cart = new GreenKartCartPage(page);
        this.country = new GreenKartCountryPage(page);
    }
}