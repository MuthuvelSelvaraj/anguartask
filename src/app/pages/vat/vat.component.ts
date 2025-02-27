import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VatService } from '../vat.service';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss']
})
export class VatComponent implements OnInit {
  vatForm!: FormGroup;
  showForm: boolean = false;
  isEditMode: boolean = false;
  vatList: any[] = [];

  constructor(private fb: FormBuilder, private vatService: VatService) {}

  ngOnInit(): void {
    

    this.getVatList();
    this.initializeForm()
  }
  initializeForm(){
    this.vatForm = this.fb.group({
      vatid: ['', Validators.required],
      vatpercent: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  // Fetch the list of VAT records
  getVatList(): void {
    this.vatService.getVatList().subscribe(
      (data: any[]) => {
        this.vatList = data; // Update the vatList with the response data
      },
      (error) => {
        console.error('Error fetching VAT list:', error);
      }
    );
  }

  // Toggle the form visibility for adding VAT
  addVat(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.vatForm.reset();
  }

  // Save the VAT (either new or update)
  saveVat(): void {
    if (this.vatForm.valid) {
      const vat = this.vatForm.value;
      if (this.isEditMode) {
        this.vatService.updateVat(vat).subscribe(
          () => {
            this.getVatList(); // Refresh VAT list after updating
            this.showForm = false;
          },
          (error) => {
            console.error('Error updating VAT:', error);
          }
        );
      } else {
        this.vatService.saveVat(vat).subscribe(
          () => {
            this.getVatList(); // Refresh VAT list after saving
            this.showForm = false;
          },
          (error) => {
            console.error('Error saving VAT:', error);
          }
        );
      }
    }
  }

  // Cancel the form and hide the form container
  cancelVatForm(): void {
    this.showForm = false;
  }

  // Edit a VAT record
  editVat(vat: any): void {
    this.showForm = true;
    this.isEditMode = true;
    this.vatForm.patchValue(vat);
  }

  // Delete a VAT record by ID
  deleteVat(vat: any): void {
    if (confirm('Are you sure you want to delete this VAT?')) {
      this.vatService.deleteVat(vat.vatid).subscribe(
        () => {
          this.getVatList(); // Refresh VAT list after deletion
        },
        (error) => {
          console.error('Error deleting VAT:', error);
        }
      );
    }
  }
}