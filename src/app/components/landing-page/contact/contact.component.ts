import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
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
  private toastr = inject(ToastrService);
  // private translate = inject(TranslateService);

  loading = false;

  form = {
    name: '',
    email: '',
    message: '',
  }

  onSubmit(e: Event) {
    if (this.loading) return;

    console.log(this.form);

    if (!this.form.name || !this.form.email || !this.form.message) {
      // this.contact_form.markAllAsTouched();
      this.toastr.error('Preencha todos os campos!')
      e.preventDefault();
      return;
    }

    this.loading = true;
  }

  getInfo(variable: 'name' | 'email' | 'message') {
    // Pega o valor do input usando a propriedade value
    const inputValue = (document.getElementById(variable) as HTMLInputElement).value;

    // Atribui o valor ao campo correto no objeto form
    this.form[variable] = inputValue;
  }
}
