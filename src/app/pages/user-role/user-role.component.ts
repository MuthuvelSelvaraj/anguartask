import { Component } from '@angular/core';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent {
UserRoleList: any[] = []; // Holds fetched data
  AccountForm!: FormGroup;
  showForm: boolean = false;
  isEditMode: boolean = false;
  selectedAccountId: number | null = null;
  showViewMode:boolean=false;
  constructor(private fb: FormBuilder, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts(); // Load data on component initialization
    this.initializeForm();
  }

  initializeForm(): void {
    this.AccountForm = this.fb.group({
      companyname: ['', Validators.required],
      ownername: ['', Validators.required],
      ownermobile: ['', Validators.required],
      owneremail: ['', [Validators.required, Validators.email]],
      companyaddress: ['', Validators.required],
      companycity: ['', Validators.required],
      companystate: ['', Validators.required],
      companycountry: ['', Validators.required]  
    });
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe(
      (data) => {
        this.UserRoleList = data;
      },
      (error) => {
        console.error('Error fetching accounts', error);
      }
    );
  }
  viewAccount(account: any) {
    console.log("Viewing account:", account); // Debugging step
    this.AccountForm.patchValue(account);
    this.showForm = true;
    this.AccountForm.disable();
  }

  addUserRole(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.selectedAccountId = null;
    this.AccountForm.reset();
    this.showViewMode = false;

  }

  editCompany(account: any): void {
    this.showForm = true;
    this.isEditMode = true;
    this.selectedAccountId = account.id;
    this.AccountForm.patchValue(account);
    this.showViewMode = false;

  }

  deleteCompany(account: any): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(account.id).subscribe(
        () => {
          this.loadAccounts();
        },
        (error) => {
          console.error('Error deleting account', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.AccountForm.invalid) {
      console.error('Form is invalid:', this.AccountForm.errors);
      return;
    }
  
    const accountData = this.AccountForm.value;
    console.log('Submitting:', accountData); // Debugging
  
    if (this.isEditMode && this.selectedAccountId !== null) {
      const updatedData = { ...accountData, id: this.selectedAccountId };
      console.log('Updating account:', updatedData); // Debugging
  
      this.accountService.updateAccount(updatedData).subscribe({
        next: (response) => {
          console.log('Update Success:', response);
          this.loadAccounts();
          this.showForm = false;
          this.AccountForm.reset(); // Reset form after submission
        },
        error: (error) => {
          console.error('Error updating account:', error);
        }
      });
  
    } else {
      console.log('Saving new account:', accountData); // Debugging
  
      this.accountService.saveAccount(accountData).subscribe({
        next: (response) => {
          console.log('Save Success:', response);
          this.loadAccounts();
          this.showForm = false;
          this.AccountForm.reset(); // Reset form after submission
        },
        error: (error) => {
          console.error('Error saving account:', error);
        }
      });
    }
  }
  

  returnpage(): void {
    this.showForm = false; // Hide form and show table
  }
}


