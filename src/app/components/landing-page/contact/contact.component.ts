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
    mensage: ['', [Validators.required]],
  });


  onSubmit(evt: SubmitEvent) {
    evt.preventDefault();

    if (this.loading) return;

    if (this.contact_form.invalid) {
      this.contact_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.contactService.submitForm(this.contact_form.value).subscribe({
      next: (data) => {
        console.log(data);

        this.toastr.success(this.translate.instant('contact_success'))
        this.loading = false;

        this.contact_form.reset();
      },
      error: (error) => {
        console.log(error);

        this.toastr.error(this.translate.instant('contact_error'))
        this.loading = false;
      }
    })
  }
}
