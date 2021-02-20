import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import {ProductDetailsComponent} from "./views/product-details/product-details.component";
import {ProductListComponent} from "./views/product-list/product-list.component"
import {CartPageComponent}from './views/cart-page/cart-page.component'

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  // {
  //   path: "auth",
  //   component: AuthComponent,
  //   children: [
  //     { path: "login", component: LoginComponent },
  //     { path: "register", component: RegisterComponent },
  //     { path: "", redirectTo: "login", pathMatch: "full" },
  //   ],
  // },

  // // no layout views
  // { path: "profile", component: ProfileComponent },
   { path: "landing", component: LandingComponent },
  // {path : "productDetails", component : ProductDetailsComponent},
  // {path:"productList",component:ProductListComponent},
  // {path: "cartPage", component:CartPageComponent},
  // { path: "", component: IndexComponent },
  { path: '', loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule) },
  { path: 'productList/:industryid/:bussinessid', loadChildren: () => import('./feature/product-list/product-list.module').then(m => m.ProductListModule) },
  { path: 'cart', loadChildren: () => import('./feature/cart/cart.module').then(m => m.CartModule) },
  { path: 'order', loadChildren: () => import('./feature/order/order.module').then(m => m.OrderModule) },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
