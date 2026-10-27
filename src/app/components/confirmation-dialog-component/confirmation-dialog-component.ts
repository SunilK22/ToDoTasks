import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  imports: [MatButtonModule, MatDialogModule],
  selector: 'app-confirmation-dialog-component',
  styleUrl: './confirmation-dialog-component.scss',
  templateUrl: './confirmation-dialog-component.html',
})
export class ConfirmationDialogComponent {
}
