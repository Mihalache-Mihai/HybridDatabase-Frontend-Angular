import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BackendService } from '../../shared/service/backend.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-update-company-dialog',
  templateUrl: './add-update-company-dialog.component.html',
  styleUrls: ['./add-update-company-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddUpdateCompanyDialogComponent implements OnInit {

  public companyID:number;
  public cui:FormControl=new FormControl();
  public name:FormControl=new FormControl();
  private buttonName:string="Add";
  private buttonDeleteName:string="Delete";

  constructor(public dialogRef: MatDialogRef<AddUpdateCompanyDialogComponent>, private snackBar: MatSnackBar, private service: BackendService , @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    console.log("company dialog",this.data.cui);

    if(this.data){
      if(this.data.companyID){
        this.companyID=this.data.companyID;
      }
      if(this.data.companyCUI){
        this.cui.setValue(this.data.companyCUI);
       
      }
      if(this.data.companyName){
        this.name.setValue(this.data.companyName);
        this.buttonName="Update";
      }
    
          
    if(this.buttonName=="Add"){
      $("#deleteButton").hide();
    }
    else{
      $("#deleteButton").show();
    }
  }

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {verticalPosition: "top", duration: 6000});
  }

  addCompany(){

    let name = this.name.value;
    let cui = this.cui.value;



    this.service.addCompany(cui,name).subscribe(company => {
      if(company){
        console.log(company);
        this.openSnackBar("Insert time is: "+ company.responseTime);
      }
    })
    
    this.closeDialog();

  }


  deleteCompany(){
    this.service.deleteCompany(this.companyID).subscribe(company=>{
      if(company){
        console.log(company);
        this.openSnackBar("Delete time is: "+ company.responseTime);
      }
    })
    this.closeDialog();
  }

  addOrUpdate(){
    console.log("Add or update function")
    if(this.buttonName=="Add")
      this.addCompany();
    else
      this.updateCompany();
  }


  updateCompany(){
    console.log("Update");  
    let cui = this.cui.value;
    let name = this.name.value;

    this.service.updateCompany(this.companyID,cui,name).subscribe(company => {
      if(company){
        console.log(company);
        this.openSnackBar("Update time is: "+ company.responseTime);
      }
    })
    
    this.closeDialog();
  }


  closeDialog() {
    this.dialogRef.close();
  }



}
