import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordValidator } from './../../../../customvalidators/password.validators';
import { UserService } from '../../core/services/user-service';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile-layout.html',
  styleUrls: ['./profile-layout.css'],
})
export class ProfileLayout implements OnInit {
  profileForm!: FormGroup;
  selectedFile?: File;
  selectedFilePreview: string | null = null;
  selectedFileName: string | null = null;

  showOldPassword = false;
  showNewPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    const loggedUser = this.authService.getUser();

    this.profileForm = this.fb.group({
      name: [loggedUser?.name || '', Validators.required],
      email: [loggedUser?.email || '', [Validators.required, Validators.email]],
      phone: [loggedUser?.phone || ''],
      oldPassword: [''],
      newPassword: ['', PasswordValidator.passwordStrength()],
    });

    if (loggedUser?.avatar) {
      this.selectedFilePreview = loggedUser.avatar;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.selectedFile = file;
      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = () => (this.selectedFilePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }


  toggleOldPassword(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.profileForm.value.name);
    formData.append('email', this.profileForm.value.email);
    formData.append('phone', this.profileForm.value.phone);
    formData.append('oldPassword', this.profileForm.value.oldPassword);
    formData.append('newPassword', this.profileForm.value.newPassword);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.userService.updateProfile(formData).subscribe({
      next: (res: any) => {
        alert('Profile updated successfully!');
        this.authService.setUser(res.user);
        if (res.user.avatar) {
          this.selectedFilePreview = res.user.avatar;
        }
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to update profile.');
      },
    });
  }
}
