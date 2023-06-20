import { SmartEditFeatureModule } from './features/smartedit-feature.module';
import { NgModule } from '@angular/core';
import {
  AnonymousConsentsModule,
  AuthModule,
  CartModule,
  CartOccModule,
  ConfigModule,
  CostCenterOccModule,
  ExternalRoutesModule,
  OrderOccModule,
  ProductModule,
  ProductOccModule,
  UserOccTransitional_4_2_Module,
  UserTransitional_4_2_Module
} from '@spartacus/core';
import {
  AddressBookModule,
  AnonymousConsentManagementBannerModule,
  AnonymousConsentsDialogModule,
  BannerCarouselModule,
  BannerModule,
  BreadcrumbModule,
  CartComponentModule,
  CartPageEventModule,
  CategoryNavigationModule,
  CmsParagraphModule,
  ConsentManagementModule,
  FooterNavigationModule,
  HamburgerMenuModule,
  HomePageEventModule,
  JsonLdBuilderModule,
  LinkModule,
  LoginRouteModule,
  LogoutModule,
  MyCouponsModule,
  MyInterestsModule,
  NavigationEventModule,
  NavigationModule,
  NotificationPreferenceModule,
  PaymentMethodsModule,
  ProductCarouselModule,
  ProductDetailsPageModule,
  ProductFacetNavigationModule,
  ProductImagesModule,
  ProductIntroModule,
  ProductListingPageModule,
  ProductListModule,
  ProductPageEventModule,
  ProductReferencesModule,
  ProductSummaryModule,
  ProductTabsModule,
  SearchBoxModule,
  SiteContextSelectorModule,
  StockNotificationModule,
  TabParagraphContainerModule,
  UserComponentModule,
  WishListModule
} from '@spartacus/storefront';
import {
  CloseAccountModule,
  ForgotPasswordModule,
  ResetPasswordModule,
  UpdateEmailModule,
  UpdatePasswordModule,
  UpdateProfileModule
} from '@spartacus/user/profile/components';
import { OrderConfirmationModule, ReplenishmentOrderConfirmationModule } from '@spartacus/checkout/components';
import { PersonalizationModule } from '@spartacus/tracking/personalization';
import { AsmOccModule } from '@spartacus/asm/occ';
import { AsmModule } from '@spartacus/asm';
import { StorefinderFeatureModule } from './features/storefinder-feature.module';
import { QualtricsFeatureModule } from './features/qualtrics-feature.module';
import { QualtricsConfig } from '@spartacus/qualtrics/components';
import { AdministrationFeatureModule } from './features/administration-feature.module';
import { OrderApprovalFeatureModule } from './features/order-approval-feature.module';
import { CdsModule } from '@spartacus/cds';
import { CdcconfigurationModule } from '../cms-components/cdcconfiguration/cdcconfiguration.module';
import { RecastModule } from '../cms-components/recast/recast.module';
import { ProductComparisonModule } from 'product-comparison';
import { SpartacusBridgeModule } from '../cms-components/spartacus-bridge/spartacus-bridge.module';
import { YdcspartacusQualtricsModule } from '../cms-components/ydcspartacus-qualtrics/ydcspartacus-qualtrics.module';
import { UserFeatureModule } from './features/user-feature.module';
import { AsmFeatureModule } from './features/asm-feature.module';
import { PersonalizationFeatureModule } from './features/personalization-feature.module';
import { ProductVariantsFeatureModule } from './features/product-variants-feature.module';
import { CheckoutFeatureModule } from './features/checkout-feature.module';
import { YdcspartacusOccModule } from '../../occ/ydcspartacus-occ.module';
import { ProductBulkPricingFeatureModule } from './features/product/product-bulk-pricing-feature.module';
import { ProductImageZoomFeatureModule } from './features/product/product-image-zoom-feature.module';
import { OrderFeatureModule } from './features/order/order-feature.module';
import { OrderComponentsModule } from '@spartacus/order/components';
import { CartSavedCartFeatureModule } from './features/cart/cart-saved-cart-feature.module';
import { CartQuickOrderFeatureModule } from './features/cart/cart-quick-order-feature.module';
import { CartImportExportFeatureModule } from './features/cart/cart-import-export-feature.module';


@NgModule({
  imports: [
    // Auth Core
    AuthModule.forRoot(),
    LogoutModule,
    LoginRouteModule,

    // Basic Cms Components
    HamburgerMenuModule,
    SiteContextSelectorModule,
    LinkModule,
    BannerModule,
    CmsParagraphModule,
    TabParagraphContainerModule,
    BannerCarouselModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    BreadcrumbModule,

    // User Core
    UserTransitional_4_2_Module,
    UserOccTransitional_4_2_Module,
    // User UI
    AddressBookModule,
    ConsentManagementModule,
    MyCouponsModule,
    UserComponentModule,
    UpdateEmailModule,
    UpdatePasswordModule,
    UpdateProfileModule,
    CloseAccountModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    PaymentMethodsModule,
    NotificationPreferenceModule,
    MyInterestsModule,
    StockNotificationModule,
    MyCouponsModule,

    // Anonymous Consents Core
    AnonymousConsentsModule.forRoot(),
    // Anonymous Consents UI
    AnonymousConsentsDialogModule,
    AnonymousConsentManagementBannerModule,

    // Product Core
    ProductModule.forRoot(),
    ProductOccModule,

    // Product UI
    ProductDetailsPageModule,
    ProductListingPageModule,
    ProductListModule,
    SearchBoxModule,
    ProductFacetNavigationModule,
    ProductTabsModule,
    ProductCarouselModule,
    ProductReferencesModule,
    ProductImagesModule,
    ProductSummaryModule,
    ProductIntroModule,

    // Cart Core
    CartModule.forRoot(),
    CartOccModule,
    // Cart UI
    CartComponentModule,
    WishListModule,

    // Checkout Core
    CostCenterOccModule,
    // Checkout UI
    OrderConfirmationModule,

    // Order
    OrderComponentsModule,
    ReplenishmentOrderConfirmationModule,
    OrderOccModule,

    // SmartEdit
    SmartEditFeatureModule,
    // Personalization
    PersonalizationModule,

    // Asm Core
    AsmOccModule,
    // Asm UI
    AsmModule,

    // Page Events
    CartPageEventModule,
    ProductPageEventModule,
    NavigationEventModule,
    HomePageEventModule,

    /************************* Opt-in features *************************/
    ExternalRoutesModule.forRoot(), // to opt-in explicitly, added by default schematics
    JsonLdBuilderModule,

    /************************* External features *************************/
    StorefinderFeatureModule,
    QualtricsFeatureModule,
    ConfigModule.withConfig({
      qualtrics: {
        scriptSource: 'assets/qualtrics.js',
      },
    } as QualtricsConfig),
    YdcspartacusQualtricsModule,
    AdministrationFeatureModule,
    AsmFeatureModule,
    OrderApprovalFeatureModule,
    CdsModule.forRoot({
      // CDS tenant configuration is loaded from backend
      cds: {
        endpoints: {
          strategyProducts:
            '/strategy/${tenant}/strategies/${strategyId}/products',
        },
        profileTag: {
          allowInsecureCookies: true
        },
      },
    }),
    YdcspartacusOccModule,
    CdcconfigurationModule,
    CheckoutFeatureModule,
    PersonalizationFeatureModule,
    ProductVariantsFeatureModule,
    RecastModule,
    ProductComparisonModule,
    SpartacusBridgeModule,
    SmartEditFeatureModule,
    UserFeatureModule,
    ProductBulkPricingFeatureModule,
    ProductImageZoomFeatureModule,
    OrderFeatureModule,
    CartSavedCartFeatureModule,
    CartQuickOrderFeatureModule,
    CartImportExportFeatureModule
  ],
})
export class SpartacusFeaturesModule {
}
