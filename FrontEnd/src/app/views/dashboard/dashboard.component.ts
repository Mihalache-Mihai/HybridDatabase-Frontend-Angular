import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls:['dashboard.component.scss'],
  //providers:[AppService,ApiUrlBuilder]
})
export class DashboardComponent implements OnInit {
  constructor(private router:Router){}

  ngOnInit(): void {
    let user= JSON.parse(localStorage.getItem("currentUser"));
    if(!user){
      this.router.navigate(['']);
    } 
  }

}
