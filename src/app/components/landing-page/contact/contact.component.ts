import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { ContactService } from '../../../services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    SharedModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private toastr = inject(ToastrService);
  private translate = inject(TranslateService);

  loading = false;

  contact_form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });


  onSubmit(e: Event) {
    if (this.loading) return;

    if (this.contact_form.invalid) {
      this.contact_form.markAllAsTouched();
      e.preventDefault();
      return;
    }

    this.loading = true;
  }
}
