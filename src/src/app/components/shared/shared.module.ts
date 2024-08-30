import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterModule } from '@angular/router';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { IconDirective } from '../../directives/icon.directive';

const IMPORTS = [
  CommonModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  RouterModule,
  PageLoadingComponent,
  MatDialogModule,
];

const DECLARATIONS = [
  IconDirective,
];

@NgModule({
  imports: [...IMPORTS, CommonModule, RouterLink],
  declarations: [...DECLARATIONS],
  exports: [...IMPORTS, ...DECLARATIONS],
})
export class SharedModule {}
