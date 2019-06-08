import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineComponent } from './medicine.component';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { DefaultLayoutComponent } from '../../containers/default-layout';
import { AddUpdateDialogComponent } from '../add-update-dialog/add-update-dialog.component';
import * as $ from 'jquery';

@NgModule({
  declarations: [MedicineComponent],
  imports: [
    DefaultLayoutComponent,
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
 
})
export class MedicineModule { }
