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

// export interface DialogData{
//   medicineName:string, medicineStock:number, medicineCompany:Company
// }

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
  public searchMedicineMongo: FormControl = new FormControl();

  private medicineName:string;
  private medicineStock:number;
  private medicineCompany:Company=new Company();
  private medicineID:number;
  constructor(private service:BackendService,public dialog: MatDialog) {
   
   }

   openDialog() {
     const dialogRef = this.dialog.open(AddUpdateDialogComponent,{
       width: '800px',
      data : {
        medicineID: this.medicineID,
        medicineName: this.medicineName,
        medicineStock: this.medicineStock,
        medicineCompany: this.medicineCompany,
        
      }
     });
    
}

openDialogWithAdd() {
  const dialogRef = this.dialog.open(AddUpdateDialogComponent,{
    width: '800px',
   data : {
   }
  });
 
}

  ngOnInit() {
  }

  
   onKeyUp(){
    clearTimeout(this.searchHandler);
    this.searchHandler = setTimeout(() => {this.getMedicines(this.searchMedicine.value)}, this.searchDelay);
    this.dialog.closeAll();
  }


  onKeyUpMongo(){
    clearTimeout(this.searchHandler);
    this.searchHandler = setTimeout(() => {this.getMedicinesMongo(this.searchMedicineMongo.value)}, this.searchDelay);
    this.dialog.closeAll();
  }

  onKeyDown(){
    clearTimeout(this.searchHandler);
  }

  getMedicines(value:string){

    this.medicines = [];
    
    if(value && value.trim().length > 0)
    {
      this.service.getMedicines(value).subscribe((medicines) => {
        if(medicines)
          this.medicines = medicines;
          console.log(medicines);

      });
    }
  }

  getMedicinesMongo(value:string){

    this.medicinesMongo = [];
    
    if(value && value.trim().length > 0)
    {
      this.service.getMedicinesMongo(value).subscribe((medicines) => {
        if(medicines)
          this.medicinesMongo = medicines;
          console.log(medicines);

      });
    }
  }

  onMedicineClick(medicineID:number){
    this.service.getMedicineByID(medicineID).subscribe((result)=>{
      if(result){
        this.medicineID=medicineID;
        this.medicineName=result.name;
        this.medicineStock=result.stock;
       this.medicineCompany=result.company;
       this.openDialog();
      }
      
    });
    
    this.searchMedicine.reset();
    if(medicineID){
      console.log(medicineID);
    }
    
  }

}
