import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { StaticPageComponent } from './static-page/static-page.component';
import { CustomRoutingModule } from './custom-routing/custom-routing.module';
import { SaleComponent } from './sale/sale.component';
import { ProductNameNormalizer } from './product-name.normalizer';
import { PRODUCT_NORMALIZER } from '@spartacus/core';
import { ProductCategoryNormalizer } from './product-category.normalizer';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticPageComponent,
    SaleComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: 'https://api.c39j2-walkersde1-d4-public.model-t.cc.commerce.ondemand.com/',
          prefix: '/rest/v2/'
        }
      },
      context: {
        baseSite: ['electronics-spa'],
        currency: ['USD'],
        language: ['en'],
        urlParameters: ['customParam', 'baseSite', 'language', 'currency']
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      },
      features: {
        level: '2.0'
      }
    }),
    CustomRoutingModule
  ],
  providers: [
    { provide: PRODUCT_NORMALIZER, useClass: ProductNameNormalizer, multi: true },
    { provide: PRODUCT_NORMALIZER, useClass: ProductCategoryNormalizer, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
