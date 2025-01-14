import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-date-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogClose,
    MatCardModule],
  templateUrl: './date-dialog.component.html',
  styleUrl: './date-dialog.component.scss'
})
export class DateDialogComponent {
  dateForm: FormGroup = inject(MAT_DIALOG_DATA);
}
