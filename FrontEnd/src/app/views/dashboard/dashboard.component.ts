import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import * as $ from 'jquery';
import { BackendService } from '../../shared/service/backend.service';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls:['dashboard.component.scss'],
  //providers:[AppService,ApiUrlBuilder]
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {



  constructor(private router:Router, private service: BackendService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    let user= JSON.parse(localStorage.getItem("currentUser"));
    if(!user){
      this.router.navigate(['']);
    }
    
    $(".button-fill").hover(function () {
      $(this).children(".button-inside").addClass('full');
    }, function() {
    $(this).children(".button-inside").removeClass('full');
  });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {verticalPosition: "top", duration: 6000});
  }

  executeCompanyQuery(){
    this.service.executeCompanyQuery().subscribe((result) => {
      if(result){
        // console.log(result); 
        // console.log(result[0].responseTime);
        this.openSnackBar("Query duration:" +result[0].responseTime);
      }
         
      
    });
   
  }

  executeEmployeeQuery(){
    this.service.executeEmployeeQuery().subscribe((result) => {
      if(result){
        console.log(result);
        this.openSnackBar("Query duration:" +result.responseTime);
      }
         
      
    });

  }

  executeMedicineMongoQuery(){
    this.service.executeMedicineMongoQuery().subscribe((result) => {
      if(result){
        console.log(result);  
        this.openSnackBar("Query duration:" +result[0].responseTime);
      }
        
      
    });

  }

  executePrescriptionQuery(){
    this.service.executePrescriptionQuery().subscribe((result) => {
      if(result){
        console.log(result);  
        this.openSnackBar("Query duration:" +result[0].responseTime);
      }
       
      
    });

  }

  

}
