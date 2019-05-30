import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DefaultLayoutComponent } from '../../containers/default-layout';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
@NgModule({
  declarations: [CompanyModule],
  imports: [
    DefaultLayoutComponent,
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ]
})
export class CompanyModule { }
