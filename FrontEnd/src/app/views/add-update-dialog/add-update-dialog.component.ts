import { Component, OnInit, Inject, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatButton, MatSnackBar } from '@angular/material';
//import { DialogData } from '../medicine/medicine.component';
import * as $ from 'jquery';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/service/authentication.service';
import { BackendService } from '../../shared/service/backend.service';

@Component({
  selector: 'add-update-dialog',
  templateUrl: 'add-update-dialog.component.html',
  encapsulation: ViewEncapsulation.None,

})

export class AddUpdateDialogComponent {
  //@ViewChild('removeButton') deleteButton: any;
  submitted = false;

  public name:FormControl=new FormControl();
  private companies: any[]=[];
  private companyName:string = "";
  private stock:FormControl = new FormControl();
  private searchHandler:any;
  private buttonName: string="Add"
  private buttonDeleteName: string="Delete";
  private searchDelay: number = 500;
  private medicineID:number;

  private prescriptionForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddUpdateDialogComponent>,
               private snackBar: MatSnackBar, 
               private formBuilder: FormBuilder,
               private service: BackendService , 
               @Inject(MAT_DIALOG_DATA) public data:any) {
 }
                                     
  ngOnInit(){
    this.prescriptionForm = this.formBuilder.group({
      name:['',[Validators.required]],
      stock: ['', [Validators.required]],
  });

    if(this.data){
      if(this.data.medicineName){
        this.name.setValue(this.data.medicineName);
        this.buttonName="Update";
      }
      else{
        this.buttonName="Add";
      }
     
      if(this.data.medicineStock)
        this.stock.setValue(this.data.medicineStock);
      if(this.data.medicineCompany){
          if(this.data.medicineCompany.companyName)
        this.companyName=this.data.medicineCompany.companyName;
          else
            this.companyName=this.data.medicineCompany;
      }
       

      if(this.data.medicineID)
        this.medicineID=this.data.medicineID;
   }
    if(this.buttonName=="Add"){
      $("#deleteButton").hide();
    }
    else{
      $("#deleteButton").show();
    }
    console.log("data: ", this.companyName);
    this.getCompanies();
  }

  get f() { return this.prescriptionForm.controls; }

  ngOnSubmit(){
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {verticalPosition: "top", duration: 6000});
  }

  addMedicine(){
    //this.deleteButton
    //this.submitted = true;

    // stop here if form is invalid
    // if (this.prescriptionForm.invalid) {
    //     return;
    // }

    let name = this.name.value;
    let stock = +this.stock.value;
    //this.submitted = false;
    this.service.addMedicine(name,stock,this.companyName).subscribe(medicine => {
      if(medicine){
        console.log(medicine);
        this.openSnackBar(medicine.responseTime);
       
      }
    })
    
    this.closeDialog();

  }

  deleteMedicine(){
  //  this.submitted = true;

    // stop here if form is invalid

    this.service.deleteMedicine(this.medicineID).subscribe(medicine=>{
      if(medicine){
        console.log(medicine);
        this.openSnackBar(medicine.responseTime);
      }
    })
    this.closeDialog();
  }

  addOrUpdate(){
    console.log("Add or update function")
    if(this.buttonName=="Add")
      this.addMedicine();
    else
      this.updateMedicine();
  }

  updateMedicine(){
    console.log("Update");  
    let name = this.name.value;
    let stock = +this.stock.value;

    this.service.updateMedicine(this.medicineID,name,stock,this.companyName).subscribe(medicine => {
      if(medicine){
        console.log(medicine);
        this.openSnackBar(medicine.responseTime);
      }
    })
    
    this.closeDialog();
  }

  onKeyUp(){
    clearTimeout(this.searchHandler);
    this.searchHandler = setTimeout(() => {this.getCompanies()}, this.searchDelay);

  }

  onKeyDown(){
    clearTimeout(this.searchHandler);
  }

  
  closeDialog() {
    this.dialogRef.close();
  }

  getCompanies(){
    this.companies = [];
    
      this.service.getCompanies().subscribe(companies => {
        if(companies)
          this.companies = companies;
          console.log(this.companies);

      });
    }

}