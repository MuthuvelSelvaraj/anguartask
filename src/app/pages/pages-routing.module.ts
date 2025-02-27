import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { InstanceComponent } from './instance/instance.component';
import { UserComponent } from './user/user.component';
import { CityComponent } from './city/city.component';
import { VatComponent } from './vat/vat.component';
import { GstComponent } from './gst/gst.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { AccountComponent } from './account/account.component';
import { UserRoleComponent } from './user-role/user-role.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path:'company-form',component:CompanyFormComponent},
      { path: 'instance', component: InstanceComponent },
      { path: 'user', component: UserComponent },
      { path: 'city', component: CityComponent },
      { path: 'user-role', component: UserRoleComponent },
      { path: 'vat', component: VatComponent },
      { path: 'gst', component: GstComponent },
      {path:'account',component:AccountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
