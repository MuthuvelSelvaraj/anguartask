import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GstService } from '../gst.service';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.scss'],
})
export class GstComponent implements OnInit {
  gstList: any[] = []; // Array to hold GST records
  gstForm: FormGroup; // FormGroup for GST form
  isEditMode: boolean = false; // Flag to track edit mode
  showForm: boolean = false; // Flag to toggle form visibility

  constructor(private gstService: GstService, private fb: FormBuilder) {
    // Initialize the form
    this.gstForm = this.fb.group({
      gstid: ['', Validators.required],
      gstpercent: [0, [Validators.required, Validators.min(0)]],
      igstpercent: [0, [Validators.required, Validators.min(0)]],
      cgstpercent: [0, [Validators.required, Validators.min(0)]],
      sgstpercent: [0, [Validators.required, Validators.min(0)]],
      ugstpercent: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadGstList(); // Load GST list on component initialization
  }

  // Load GST list from the server
  loadGstList(): void {
    this.gstService.getGstList().subscribe(
      (data) => {
        this.gstList = data;
      },
      (error) => {
        console.error('Error fetching GST list:', error);
      }
    );
  }

  addGst() {
    this.showForm = true;
    this.isEditMode = false;
    this.gstForm.reset(); // Reset the form
  }
  // Save or update GST record
  saveGst(): void {
    if (this.gstForm.valid) {
      const gstData = this.gstForm.value;
      if (this.isEditMode) {
        this.gstService.updateGst(gstData).subscribe(
          (response) => {
            console.log('GST updated successfully');
            this.loadGstList(); // Reload the list after updating
            this.resetForm();
          },
          (error) => {
            console.error('Error updating GST:', error);
          }
        );
      } else {
        this.gstService.saveGst(gstData).subscribe(
          (response) => {
            console.log('GST saved successfully');
            this.loadGstList(); // Reload the list after saving
            this.resetForm();
          },
          (error) => {
            console.error('Error saving GST:', error);
          }
        );
      }
    } else {
      console.error('Form is invalid. Please check the fields.');
    }
  }

  // Edit a GST record
  editGst(data: any): void {
    this.isEditMode = true;
    this.showForm = true;
    this.gstForm.patchValue(data); // Pre-fill the form with the selected GST record
  }

  // Delete a GST record
  deleteGst(data: any): void {
    if (confirm('Are you sure you want to delete this GST record?')) {
      this.gstService.deleteGst(data.gstid).subscribe(
        (response) => {
          console.log('GST deleted successfully');
          this.loadGstList(); // Reload the list after deletion
        },
        (error) => {
          console.error('Error deleting GST:', error);
        }
      );
    }
  }

  // Cancel the form
  cancelGstForm(): void {
    this.resetForm();
  }

  // Reset the form
  resetForm(): void {
    this.showForm = false;
    this.isEditMode = false;
    this.gstForm.reset(); // Reset the form to its initial state
  }
}