import { Component } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  profile = {
    name: '',
    email: '',
    password: ''
  };

  selectedTheme = 'light'; // Default theme
  selectedLanguage = 'en'; // Default language

  constructor() {}

  updateProfile() {
    console.log('Profile updated:', this.profile);
    alert('Profile updated successfully!');
  }

  applyTheme() {
    document.body.className = this.selectedTheme;
    console.log('Theme applied:', this.selectedTheme);
  }

  saveLanguage() {
    console.log('Language selected:', this.selectedLanguage);
    alert(`Language changed to ${this.selectedLanguage}`);
  }
}

