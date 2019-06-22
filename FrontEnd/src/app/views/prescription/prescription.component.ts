import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from '../../shared/service/backend.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddUpdatePrescriptionDialogComponent } from '../add-update-prescription-dialog/add-update-prescription-dialog.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PrescriptionComponent implements OnInit {
  public prescriptions: any[]=[];

  private searchHandler:any;
  private searchDelay: number = 500;
  public searchPrescription: FormControl = new FormControl();


  private prescriptionSeries:string;
  private locality:string;
  private county: string;
  private cnp:string;
  private name:string;
  private residence: string;
  private diagnosis: string;
  private medicines: string;
  constructor(private service:BackendService,public dialog: MatDialog,private snackBar: MatSnackBar ) { }

  ngOnInit() {
    $(".button-fill").hover(function () {
      $(this).children(".button-inside").addClass('full');
    }, function() {
    $(this).children(".button-inside").removeClass('full');
  });

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUpdatePrescriptionDialogComponent,{
      width: '500px',
     data : {
      
      prescriptionSeries: this.prescriptionSeries,
      locality: this.locality,
      county: this.county,
      cnp: this.cnp,
      name:this.name,
      residence: this.residence,
      diagnosis: this.diagnosis,
      medicines: this.medicines,
       
     }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {verticalPosition: "top", duration: 6000});
  }

  openDialogWithAdd() {
    console.log("prescription open dialog with add")
    const dialogRef = this.dialog.open(AddUpdatePrescriptionDialogComponent,{
      width: '800px',
     data : {
     }
    });
  }


    onKeyUp(){
      clearTimeout(this.searchHandler);
      this.searchHandler = setTimeout(() => {this.getPrescriptions(this.searchPrescription.value)}, this.searchDelay);
      this.dialog.closeAll();
    }

    onKeyDown(){
      clearTimeout(this.searchHandler);
    }

    add100kData(){
      this.service.add100kPrescriptions().subscribe(result=>{
        if(result){
          console.log(result);
          this.openSnackBar(result.responseTime);
        }
      })
    }

    getPrescriptions(value:string){

      //this.prescriptions = [];
      
      if(value && value.trim().length > 0)
      {
        this.service.getPrescriptions(value).subscribe((prescriptions) => {
          if(prescriptions)
            this.prescriptions = prescriptions;
            console.log("this.prescription este: ",this.prescriptions)
            console.log(prescriptions);
  
        });
      }
      
    }

    onPrescriptionClick(prescriptionSeries:string){
      $("#prescriptionSearch").val("");
      this.service.getPrescriptionBySeries(prescriptionSeries).subscribe((result)=>{
        if(result){
          this.prescriptionSeries=result.prescriptionSeries,
          this.locality=result.locality,
          this.county=result.county,
          this.name=result.name,
          this.cnp=result.cnp,
          this.residence=result.residence,
          this.diagnosis=result.diagnosis,
          this.medicines=result.medicines,
         this.openDialog();
        }
        
      });
      
      
    }
  
   
   

}
