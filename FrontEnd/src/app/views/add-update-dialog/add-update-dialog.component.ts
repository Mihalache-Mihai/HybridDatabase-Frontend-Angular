import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../medicine/medicine.component';
import * as $ from 'jquery';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../shared/service/authentication.service';
import { BackendService } from '../../shared/service/backend.service';

@Component({
  selector: 'app-add-update-dialog',
  templateUrl: 'add-update-dialog.component.html',
})

export class AddUpdateDialogComponent {
  public name:FormControl=new FormControl();
  private companies: any[]=[];
  private companyName:string = "";
  private stock:FormControl = new FormControl();
  private searchHandler:any;
  private searchDelay: number = 500;
  constructor(private service: BackendService ,
              private dialogRef: MatDialogRef<AddUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {

                console.log(data);
                console.log("AAAAAAAAAAAAAAAAaa");
                if(data){
                if(data.medicineName)
                this.name.setValue(data.medicineName);
                if(data.medicineStock)
                  this.stock.setValue(data.medicineStock);
                if(data.medicineCompany)
                  this.companyName=data.medicineCompany.companyName;
             }


 }
                                     
  ngOnInit(){
    
    
    this.getCompanies();
  }

  addMedicine(){
    console.log(this.name.value);
    let name = this.name.value;
    //let prospect = this.prospect.value;

    let stock = +this.stock.value;
    console.log(stock);

    //let company = this.company.value;
    console.log(this.companyName);

    this.service.addMedicine(name,stock,this.companyName).subscribe(medicine => {
      if(medicine){
        console.log(medicine);
      }
    })
    
  }

  onKeyUp(){
    clearTimeout(this.searchHandler);
    this.searchHandler = setTimeout(() => {this.getCompanies()}, this.searchDelay);

  }

  onKeyDown(){
    clearTimeout(this.searchHandler);
  }

  getCompanies(){
    this.companies = [];
    
    // if(value && value.trim().length > 0)
    // {
      this.service.getCompanies().subscribe(companies => {
        if(companies)
          this.companies = companies;
          //console.log(medicines);
          console.log(this.companies);

      });
    }
 // }
  // onCompanyClick(name:string){
  //   this.company.setValue(name);
  // }
}