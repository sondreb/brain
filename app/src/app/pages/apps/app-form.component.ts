import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { App } from '../../models/api.models';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <h2 mat-dialog-title>{{isEdit ? 'Edit' : 'Create'}} App</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" required>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="4"></textarea>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">
          {{isEdit ? 'Save' : 'Create'}}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: `
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    mat-dialog-content {
      min-width: 400px;
    }
  `
})
export class AppFormComponent {
  form: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: App
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || '']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const result: Partial<App> = {
        ...formData,
        id: this.data?.id
      };
      this.dialogRef.close(result);
    }
  }
}
