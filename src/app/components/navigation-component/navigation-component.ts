import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MyTasksComponent } from '../my-tasks-component/my-tasks-component';
import { CommonModule } from '@angular/common';


@Component({
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, 
    MatListModule, MyTasksComponent, CommonModule],
  selector: 'app-navigation-component',
  styleUrl: './navigation-component.scss',
  templateUrl: './navigation-component.html',
})
export class NavigationComponent {
  readonly isOpened = signal(false);
  readonly todaysDate = new Date();
}
