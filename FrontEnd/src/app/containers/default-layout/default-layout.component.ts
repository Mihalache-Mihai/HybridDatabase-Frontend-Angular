import { Component, OnDestroy, Inject, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import * as $ from 'jquery';


@Component({
  selector: 'app-dashboard',
  styleUrls: ['./default-layout.component.scss'],
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  @ViewChild('app-sidebar-nav') navBar: ElementRef; 
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public selected: string = "haloo";
  constructor(@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit() {
    $("a.navbar-brand").hide();
    // console.log(this.navBar);
    setTimeout(() => {
      this.selected = $(".breadcrumb-item.active span")[0].innerHTML;
      console.log(this.selected);
    },0);
    console.log(this.selected);

  }

  ngOnChange() {

  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
