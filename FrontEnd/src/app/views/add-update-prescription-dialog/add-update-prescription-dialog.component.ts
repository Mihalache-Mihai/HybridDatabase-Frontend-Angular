import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BackendService } from '../../shared/service/backend.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-update-prescription-dialog',
  templateUrl: './add-update-prescription-dialog.component.html',
  styleUrls: ['./add-update-prescription-dialog.component.scss']
})
export class AddUpdatePrescriptionDialogComponent implements OnInit {

  private series:FormControl = new FormControl();
  private locality:FormControl = new FormControl();
  private county:FormControl = new FormControl();
  private cnp:FormControl = new FormControl();
  private name:FormControl=new FormControl();
  private residence:FormControl = new FormControl();
  private diagnosis:FormControl = new FormControl();
  private medicines:FormControl = new FormControl();
  private prescriptionID:string;


  private prescriptions: any[]=[];
  private searchHandler:any;
  private buttonName: string="Add"
  private buttonDeleteName: string="Delete";
  private searchDelay: number = 500;

  constructor(public dialogRef: MatDialogRef<AddUpdatePrescriptionDialogComponent>, private snackBar: MatSnackBar, private service: BackendService , @Inject(MAT_DIALOG_DATA) public data:any) {
 }

  ngOnInit() {
    //console.log("Am ajuns in dialog", this.data);
    if(this.data){
      if(this.data.prescriptionSeries){
        this.series.setValue(this.data.prescriptionSeries);
        this.buttonName="Update";
      }
        
      if(this.data.locality)
        this.locality.setValue(this.data.locality);
      if(this.data.county)
        this.county.setValue(this.data.county);
      if(this.data.cnp)
        this.cnp.setValue(this.data.cnp);
      if(this.data.name)
        this.name.setValue(this.data.name);
      if(this.data.residence)
        this.residence.setValue(this.data.residence);
      if(this.data.diagnosis)
        this.diagnosis.setValue(this.data.diagnosis);
      if(this.data.medicines)
        this.medicines.setValue(this.data.medicines);
    }

    if(this.buttonName=="Add"){
      $("#deleteButton").hide();
    }
    else{
      $("#deleteButton").show();
    }

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {verticalPosition: "top", duration: 6000});
  }

  addPrescription(){

    let series = this.series.value;
    let locality = this.locality.value;
    let county = this.county.value;
    let cnp = this.cnp.value;
    let name = this.name.value;
    let diagnosis = this.diagnosis.value;
    let residence = this.residence.value;
    let medicines = this.medicines.value;


    this.service.addPrescription(series,locality,county,cnp,name,residence,diagnosis,medicines).subscribe(prescription => {
      if(prescription){
        console.log(prescription);
        this.openSnackBar(prescription.responseTime);
      }
    })
    
    this.closeDialog();

  }


  
  deletePrescription(){
    this.service.deletePrescription(this.series.value).subscribe(prescription=>{
      if(prescription){
        console.log(prescription);
        this.openSnackBar(prescription.responseTime);
      }
    })
    this.closeDialog();
  }


  addOrUpdate(){
    console.log("Add or update function")
    if(this.buttonName=="Add")
      this.addPrescription();
    else
      this.updatePrescription();
  }

  updatePrescription(){
    console.log("Update");  
    let series = this.series.value;
    let diagnosis = this.diagnosis.value;
    let locality = this.locality.value;
    let county = this.county.value;
    let cnp = this.cnp.value;
    let name = this.name.value;
    let residence = this.residence.value;
    let medicines = this.medicines.value;

    this.service.updatePrescription(series,locality,county,cnp,name,residence,diagnosis,medicines).subscribe(prescription => {
      if(prescription){
        console.log(prescription);
        this.openSnackBar(prescription.responseTime);
      }
    })
    
    this.closeDialog();
  }
  
  closeDialog() {
    this.dialogRef.close();
  }




}
