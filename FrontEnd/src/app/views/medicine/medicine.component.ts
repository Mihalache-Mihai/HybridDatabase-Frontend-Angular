import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MedicineComponent implements OnInit {
  public navItems=navItems;
  constructor() {
   
   }

  ngOnInit() {
  }

}
