import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { ITodoTask } from '../../models/ToDoTaskModel';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task-component/create-task-component';
import { ConfirmationDialogComponent } from '../confirmation-dialog-component/confirmation-dialog-component';


@Component({
  imports: [MatIconModule, MatGridListModule, MatButtonModule, MatTableModule,
    MatInputModule, MatFormFieldModule, MatCheckboxModule, FormsModule,
    MatMenuModule, CommonModule
  ],
  selector: 'app-my-tasks-component',
  styleUrl: './my-tasks-component.scss',
  templateUrl: './my-tasks-component.html',
})
export class MyTasksComponent implements OnInit {
  totalTasks = signal(0);
  inProgress = signal(0);
  completed = signal(0);

  taskData: ITodoTask[] = [];

  readonly dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);


  constructor() { }

  ngOnInit(): void {
    this.refreshTask();
  }

  refreshTask() {
    this.taskData = Object.keys(localStorage)
      .map(key => localStorage.getItem(key))
      .filter((value) => value !== null)
      .map(value => JSON.parse(value) as ITodoTask);

    this.totalTasks.set(this.taskData.length);

    this.inProgress.set(this.taskData.filter((data) => data.completed !== true).length);

    this.completed.set(this.taskData.filter((data) => data.completed === true).length);

  }

  openAddTaskForm() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      maxWidth: '700px',
      minWidth: '500px'
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.refreshTask());
  }

  removeTask(key: ITodoTask) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (confirmed) {
          localStorage.removeItem(key.id);
          this.refreshTask();
        }
      });
  }

  updateTaskCompletion(task: ITodoTask, completed: boolean): void {
    const updatedTask: ITodoTask = { ...task, completed };

    localStorage.setItem(updatedTask.id, JSON.stringify(updatedTask));
    this.refreshTask();
  }

}
