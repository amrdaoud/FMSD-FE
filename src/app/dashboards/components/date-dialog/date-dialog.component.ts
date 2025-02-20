import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogClose,
    MatCardModule,CommonModule],
  templateUrl: './date-dialog.component.html',
  styleUrl: './date-dialog.component.scss'
})
export class DateDialogComponent {
  dateForm: FormGroup = inject(MAT_DIALOG_DATA);

  validateThreshold(event: any) {
    let inputValue = event.target.value;

    // Convert value to a number and enforce limits
    if (inputValue < 0) {
      event.target.value = 0; // Set to min value
    } else if (inputValue > 100) {
      event.target.value = 100; // Set to max value
    }

    // Update the form control value
    this.dateForm.get('threshold')?.setValue(event.target.value, { emitEvent: false });
  }


}
