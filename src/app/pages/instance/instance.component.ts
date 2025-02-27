import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstanceService } from '../instance.service';

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.scss'],
})
export class InstanceComponent implements OnInit {
  instanceList: any[] = []; 
  instanceForm!: FormGroup; 
  showForm = false; 
  isEditMode = false; 
  selectedInstanceId: number | null = null; 

  constructor(private instanceService: InstanceService, private fb: FormBuilder) {
    
   
  }
 

  ngOnInit(): void {
    this.loadInstances();
    this.initializeForm(); // Load instances when the component initializes
  }
  initializeForm(){
    this.instanceForm = this.fb.group({
      instancename: [''],
      ownername: ['' ],
      ownermobile: [''],
      owneremail: [''],
      managername: [''],
      managermobile: [''],
      manageremail: [''],
      instancecity: [''],
      instancestate: [''],
      instancecountry: [''],
      instancepincode: [''],
      instancesalesamount: [''],
      instancesalesdate: [''],
      instanceasaenddate: [''],
      instanceasaamount: [''],
    });
  }
  loadInstances() {
    this.instanceService.getInstances().subscribe(
      (data) => {
        this.instanceList = data;
      },
      (error) => {
        console.error('Error fetching instances:', error);
        alert('Failed to load instances. Please try again.');
      }
    );
  }

  // Show the form to add a new instance
  addInstance() {
    this.showForm = true;
    this.isEditMode = false;
    this.instanceForm.reset(); // Reset the form
  }

  viewinstance(account: any) {
    console.log("Viewing account:", account); // Debugging step
    this.instanceForm.patchValue(account);
    this.showForm = true;
    this.instanceForm.disable();
  }
  editInstance(instance: any) {
    this.showForm = true;
    this.isEditMode = true;
    this.selectedInstanceId = instance.id;
    this.instanceForm.patchValue(instance); // Populate the form with instance data
  }

  // Handle form submission
  onSubmit() {
    if (this.instanceForm.invalid) {
      console.warn('Form is invalid');
      return;
    }

    const instanceData = this.instanceForm.value;
    console.log('Submitting form data:', instanceData); // Debugging: Log the payload

    if (this.isEditMode && this.selectedInstanceId) {
      // Update existing instance
      this.instanceService.updateInstance(this.selectedInstanceId, instanceData).subscribe(
        (response) => {
          console.log('Instance updated successfully:', response);
          this.loadInstances(); // Reload the list
          this.showForm = false; // Hide the form
        },
        (error) => {
          console.error('Error updating instance:', error);
        }
      );
    } else {
      // Create new instance
      this.instanceService.addInstance(instanceData).subscribe(
        (response) => {
          console.log('Instance added successfully:', response);
          this.loadInstances(); // Reload the list
          this.showForm = false; // Hide the form
        },
        (error) => {
          console.error('Error adding instance:', error);
        }
      );
    }
  }

  // Delete an instance
  deleteInstance(id: number) {
    if (confirm('Are you sure you want to delete this instance?')) {
      this.instanceService.deleteInstance(id).subscribe(
        () => {
          this.loadInstances(); // Reload the list
        },
        (error) => {
          console.error('Error deleting instance:', error);
        }
      );
    }
  }
}