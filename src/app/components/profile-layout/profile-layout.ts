import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-layout.html',
  styleUrls: ['./profile-layout.css'],
})

export class ProfileLayout {
  user = {
    name: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
    avatar: '',
  };

  selectedFile?: File;
  selectedFilePreview: string | null = null;
  selectedFileName: string | null = null;

  constructor() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFilePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    const formData = new FormData();

    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('phone', this.user.phone);
    formData.append('oldPassword', this.user.oldPassword);
    formData.append('newPassword', this.user.newPassword);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    console.log('Form Data prepared (but not sent):', formData);
    alert('Form submission skipped (no fetch or API call).');
  }
}
