import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../shared/service/backend.service';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { AddUpdateCompanyDialogComponent } from '../add-update-company-dialog/add-update-company-dialog.component';
import * as $ from 'jquery';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyComponent implements OnInit {

  public companies: any[]=[];

  private searchHandler:any;
  private searchDelay: number = 500;
  public searchCompany: FormControl = new FormControl();

  private companyID:number;
  private companyCUI:string;
  private companyName:string;

  constructor(private service:BackendService,public dialog: MatDialog) { }

  ngOnInit() {
    $(".button-fill").hover(function () {
      $(this).children(".button-inside").addClass('full');
    }, function() {
    $(this).children(".button-inside").removeClass('full');
  });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUpdateCompanyDialogComponent,{
      width: '800px',
      position:{
        top:"15%",
        left:"34%"
      },
     data : {
       companyID: this.companyID,
       companyCUI: this.companyCUI,
       companyName: this.companyName,
       
     }
    });
    
   
}

openDialogWithAdd() {
 const dialogRef = this.dialog.open(AddUpdateCompanyDialogComponent,{
   width: '800px',
  data : {
  }
 });

  }


  onKeyUp(){
    clearTimeout(this.searchHandler);
    this.searchHandler = setTimeout(() => {this.getCompanies(this.searchCompany.value)}, this.searchDelay);
    this.dialog.closeAll();
  }

  onKeyDown(){
    clearTimeout(this.searchHandler);
  }

  getCompanies(value:string){

    this.companies = [];
    
    if(value && value.trim().length > 0)
    {
      this.service.getCompaniesForCompanyModule(value).subscribe((companies) => {
        if(companies)
          this.companies = companies;
          console.log(companies);

      });
    }
  }


  onCompanyClick(companyID:number){
    this.service.getCompanyByID(companyID).subscribe((result)=>{
      if(result){
        this.companyID=result.id;
        this.companyCUI=result.cui;
        this.companyName=result.companyName;
        console.log("result on company click", result);
       this.openDialog();
       
      }
      
    });
    
    this.searchCompany.reset();
    if(companyID){
      console.log(companyID);
    }
    
  }

}
