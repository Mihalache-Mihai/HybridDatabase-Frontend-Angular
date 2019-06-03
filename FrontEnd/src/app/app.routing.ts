import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P500Component } from './views/error/500.component';
import { P404Component } from './views/error/404.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { MedicineComponent } from './views/medicine/medicine.component';
import { CompanyComponent } from './views/company/company.component';
import { PrescriptionComponent } from './views/prescription/prescription.component';

export const routes: Routes = [
  {
    path: '',
    component:LoginPageComponent,

  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'medicines',
    component: DefaultLayoutComponent,
    data:{
      title: 'Medicines'
    }
  },
  {
    path: 'companies',
    component: DefaultLayoutComponent,
    data:{
      title: 'Companies'
    }
  },
  {
    path: 'prescriptions',
    component: DefaultLayoutComponent,
    data:{
      title: 'Prescriptions'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      // {
      //   path: 'medicines',
      //   loadChildren: './views/medicine/medicine.module#MedicineModule',
      //   data: {
      //     title: 'Medicines'
      //   }
      // },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
