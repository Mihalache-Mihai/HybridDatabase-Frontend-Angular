import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { navItems } from '../../_nav';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddUpdateDialogComponent } from '../add-update-dialog/add-update-dialog.component';
import { BackendService } from '../../shared/service/backend.service';
import { componentFactoryName } from '@angular/compiler';
import { Medicine } from '../../shared/models/Medicine';
import { Company } from '../../shared/models/Company';

export interface DialogData{
  medicineName:string, medicineStock:number, medicineCompany:Company
}

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MedicineComponent implements OnInit {
  public navItems=navItems;
  public medicines: any[]=[];
  public medicinesMongo: any[]=[];
  private searchHandler:any;
  private searchDelay: number = 500;
  public searchMedicine: FormControl = new FormControl();

  private medicineName:string="";
  private medicineStock:number=0;
  private medicineCompany:Company=new Company();
  constructor(private service:BackendService,public dialog: MatDialog) {
   
   }

   openDialog() {
    const dialogConfig = new MatDialogConfig();

    
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //console.log(medicine,"AAAAAAa");
    
      dialogConfig.data = {
        medicineName: this.medicineName,
        medicineStock: this.medicineStock,
        medicineCompany: this.medicineCompany
      };
      //   console.log(dialogConfig);
  

    this.dialog.open(AddUpdateDialogComponent, dialogConfig);
}

  ngOnInit() {
  }

  @HostListener('window:keyup.esc')
  onKeyUp(){
    clearTimeout(this.searchHandler);
    this.searchHandler = setTimeout(() => {this.getMedicines(this.searchMedicine.value)}, this.searchDelay);
    this.dialog.closeAll();
  }

  onKeyDown(){
    clearTimeout(this.searchHandler);
  }

  getMedicines(value:string){

    this.medicines = [];
    
    if(value && value.trim().length > 0)
    {
      this.service.getMedicines(value).subscribe(medicines => {
        if(medicines)
          this.medicines = medicines;
          //console.log(medicines);

      });
    }
  }

  getMedicinesMongo(value:string){

    this.medicines = [];
    
    if(value && value.trim().length > 0)
    {
      this.service.getMedicinesMongo(value).subscribe(medicines => {
        if(medicines)
          this.medicinesMongo = medicines;
          console.log(medicines);

      });
    }
  }

  onMedicineClick(medicineID:number){
    var medicine = new Medicine();
    this.service.getMedicineByID(medicineID).subscribe(result=>{
      if(result){
        this.medicineName=result.name;
        this.medicineStock=result.stock;
       this.medicineCompany=result.company;
      }
      
    });
    this.openDialog();
    this.searchMedicine.reset();
    if(medicineID){
      console.log(medicineID);
    }
    
  }

}
