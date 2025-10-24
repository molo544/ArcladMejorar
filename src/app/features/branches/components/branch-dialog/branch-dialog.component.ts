import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

export interface BranchDialogData {
  branch?: any;
  isEdit: boolean;
}

@Component({
  selector: 'app-branch-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './branch-dialog.component.html',
  styleUrl: './branch-dialog.component.scss'
})
export class BranchDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<BranchDialogComponent>);
  private data = inject(MAT_DIALOG_DATA) as BranchDialogData;

  form: FormGroup;
  isEdit: boolean;

  constructor() {
    this.isEdit = this.data?.isEdit || false;
    
    this.form = this.fb.group({
      name: [this.data?.branch?.name || '', [Validators.required, Validators.minLength(2)]],
      active: [this.data?.branch?.status === 'Activo' || true]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const result = {
        ...this.data?.branch,
        name: formValue.name,
        status: formValue.active ? 'Activo' : 'Inactivo'
      };
      this.dialogRef.close(result);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
}
