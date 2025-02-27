import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { GstComponent } from './gst/gst.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { VatComponent } from './vat/vat.component';
import { CityComponent } from './city/city.component'; // ✅ Added CityComponent
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyService } from './company.service';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account.service';
import { InstanceService } from './instance.service';
import { InstanceComponent } from './instance/instance.component';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { UserComponent } from './user/user.component';
import { UserService } from './user.service';
import { CityService } from './city.service';
import { VatService } from './vat.service';
import { GstService } from './gst.service';

@NgModule({
  declarations: [
    PagesComponent,
    GstComponent,
    UserRoleComponent,
    InstanceComponent,
    VatComponent,
    CityComponent,
    CompanyFormComponent,
    AccountComponent,
    AccountComponent,
    UserComponent
  ],
  providers: [CompanyService,AccountService,InstanceService,UserService,
    CityService,VatService,GstService
  ],
  
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule, // Add this
    ReactiveFormsModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,

  ]
})
export class PagesModule { }
