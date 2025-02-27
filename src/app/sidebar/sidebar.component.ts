import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  dropdowns: { [key: string]: boolean } = {  // ✅ Correctly defined object
    pages: false
  };

  toggleDropdown(menu: string) {
    this.dropdowns[menu] = !this.dropdowns[menu];  // ✅ Correct usage
  }
}
