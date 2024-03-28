import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-conditions-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './conditions-dialog.component.html',
  styleUrl: './conditions-dialog.component.css'
})
export class ConditionsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConditionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
