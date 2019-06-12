import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import * as $ from 'jquery';
import { BackendService } from '../../shared/service/backend.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls:['dashboard.component.scss'],
  //providers:[AppService,ApiUrlBuilder]
})
export class DashboardComponent implements OnInit {
  constructor(private router:Router, private service: BackendService){}

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

  executeCompanyQuery(){
    this.service.executeCompanyQuery().subscribe((result) => {
      if(result)
        console.log(result);  
      
    });
  }

  executeEmployeeQuery(){
    this.service.executeEmployeeQuery().subscribe((result) => {
      if(result)
        console.log(result);  
      
    });
  }

  executeMedicineMongoQuery(){
    this.service.executeMedicineMongoQuery().subscribe((result) => {
      if(result)
        console.log(result);  
      
    });
  }

  executePrescriptionQuery(){
    this.service.executePrescriptionQuery().subscribe((result) => {
      if(result)
        console.log(result);  
      
    });
  }

}
