import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList: any[] = [];
  userForm!: FormGroup;
  showForm = false;
  isEditMode = false;
  editUserId: number | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getUserList();
  }

  initializeForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      usermobile: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]],
      useraddress: ['', Validators.required],
      usercity: ['', Validators.required],
      userstate: ['', Validators.required],
      usercountry: ['', Validators.required],
      userpincode: ['', Validators.required],
      userrole: ['', Validators.required],
      userasaamount: ['', Validators.required],
      userpassword: ['', Validators.required],
      userforgotpwquest: ['', Validators.required],
      userforgotpwans: ['', Validators.required]
    });
  }

  getUserList() {
    this.userService.getUsers().subscribe(response => {
      this.userList = response;
    }, error => {
      console.error('Error fetching users:', error);
    });
  }


  // Add New User
  addUser() {
    this.showForm = true;
    this.isEditMode = false;
    this.userForm.reset();
  }

  // Edit User
  editUser(user: any) {
    this.showForm = true;
    this.isEditMode = true;
    this.editUserId = user.id;
    this.userForm.patchValue(user);
  }

  // Delete User
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(response => {
      console.log('User deleted successfully!', response);
      this.getUserList(); // Refresh list
    }, error => {
      console.error('Error deleting user:', error);
    });
  }


  // Submit Form (Add / Update)
  onSubmit(userData: any) {
    this.userService.saveUser(userData).subscribe(response => {
      console.log('User saved successfully!', response);
      this.getUserList(); // Refresh list
    }, error => {
      console.error('Error saving user:', error);
    });
  }
  
}
