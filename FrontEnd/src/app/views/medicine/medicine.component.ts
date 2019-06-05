import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { navItems } from '../../_nav';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../shared/service/authentication.service';

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
  constructor(private service:AuthenticationService) {
   
   }

  ngOnInit() {
  }

  onKeyUp(){
    clearTimeout(this.searchHandler);
    this.searchHandler = setTimeout(() => {this.getMedicines(this.searchMedicine.value)}, this.searchDelay);
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

  onMedicineClick(){
    console.log("you clicked me");
  }

}
