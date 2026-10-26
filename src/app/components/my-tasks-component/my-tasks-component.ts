import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { IGroupType, ITodoTask } from '../../models/ToDoTaskModel';


@Component({
  imports: [MatIconModule, MatGridListModule, MatButtonModule, MatTableModule,
    MatInputModule, MatFormFieldModule, MatCheckboxModule, FormsModule,
    MatMenuModule
  ],
  selector: 'app-my-tasks-component',
  styleUrl: './my-tasks-component.scss',
  templateUrl: './my-tasks-component.html',
})
export class MyTasksComponent {
  totalTasks = 12;
  inProgress = 5;
  completed = 7;

  taskPriority: IGroupType[] = [
    { icon: "priority_high", title: "High" },
    { icon: "", title: "Medium" },
    { icon: "low_priority", title: "Low" }
  ]



  taskData: ITodoTask[] = [];

}
