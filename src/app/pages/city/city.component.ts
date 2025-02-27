import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  cityForm!: FormGroup;
  showForm: boolean = false;
  isEditMode: boolean = false;
  cityList: any[] = [];
  cityIdToDelete: number | undefined;

  constructor(private fb: FormBuilder, private cityService: CityService) {}

  ngOnInit(): void {
    this.initializeForm()

    this.loadcity();
  }

  initializeForm(){
    this.cityForm = this.fb.group({
      cityname: ['', Validators.required],
      citystate: ['', Validators.required],
      citycountry: ['', Validators.required]
    });
  }

  loadcity(): void {
    this.cityService.getCities().subscribe((data: any[]) => {
      this.cityList = data; // Update the cityList with the response data
    });
  }

  addCity(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.cityForm.reset();
  }

  saveCity(): void {
    if (this.cityForm.valid) {
      const city = this.cityForm.value;
      if (this.isEditMode) {
        this.cityService.updateCity(city).subscribe(() => {
          this.loadcity(); // Refresh city list after updating
          this.showForm = false;
        });
      } else {
        this.cityService.saveCity(city).subscribe(() => {
          this.loadcity(); // Refresh city list after saving
          this.showForm = false;
        });
      }
    }
  }

  cancelCityForm(): void {
    this.showForm = false;
  }

  editCity(city: any): void {
    this.showForm = true;
    this.isEditMode = true;
    this.cityForm.patchValue(city);
  }

  deleteCity(city: any): void {
    if (confirm('Are you sure you want to delete this city?')) {
      this.cityService.deleteCity(city.cityid).subscribe(() => {
        this.loadcity();
      });
    }
  }
}
