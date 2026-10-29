import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
import { DateFilter, ITodoTask, TaskFilter } from '../../models/ToDoTaskModel';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task-component/create-task-component';
import { ConfirmationDialogComponent } from '../confirmation-dialog-component/confirmation-dialog-component';
import { filter } from 'rxjs';


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

  searchedTask = signal('');
  taskFilter = signal<TaskFilter>('all');
  dateFilter = signal<DateFilter>('all');

  taskData = signal<ITodoTask[]>([]);

  readonly dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  isAscending = true;

  constructor() { }

  ngOnInit(): void {
    this.refreshTask();
  }

  refreshTask() {
    this.taskData.set(Object.keys(localStorage)
      .map(key => localStorage.getItem(key))
      .filter((value) => value !== null)
      .map(value => JSON.parse(value) as ITodoTask));

    this.totalTasks.set(this.taskData().length);

    this.inProgress.set(this.taskData().filter((data) => data.completed !== true).length);

    this.completed.set(this.taskData().filter((data) => data.completed === true).length);

  }


  openAddTaskForm() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      maxWidth: '100%',
      minWidth: '35%'
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.refreshTask());
  }


  removeTask(key: ITodoTask) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef), filter(confirmed => confirmed === true))
      .subscribe(() => {
        localStorage.removeItem(key.id);
        this.refreshTask();
      }
      );
  }


  updateTask(task: ITodoTask, completed: boolean = false): void {
    const updatedTask: ITodoTask = { ...task, completed };

    localStorage.setItem(updatedTask.id, JSON.stringify(updatedTask));
    this.refreshTask();
  }


  editTask(task: ITodoTask) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      maxWidth: '100%',
      minWidth: '35%',
      data: task
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.refreshTask());
  }


  setTaskFilter(filter: TaskFilter) {
    this.taskFilter.set(filter);
  }


  setDateFilter(filter: DateFilter) {
    this.dateFilter.set(filter);
  }


  getFilteredData(): ITodoTask[] {
    const inputData = this.searchedTask().trim().toLowerCase();
    const filter = this.taskFilter();
    const dFilter = this.dateFilter();

    const dateFormatter = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const todayStr = dateFormatter.format(new Date());

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = dateFormatter.format(tomorrow);


    return this.taskData().filter(task => {

      const matchedData =
        task.title.toLowerCase().includes(inputData) ||
        task.description.toLowerCase().includes(inputData);

      const matchedStatus =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed);

      const taskDateStr = dateFormatter.format(new Date(task.dueDate));

      const matchedDate =
        dFilter === 'all' ||
        (dFilter === 'today' && taskDateStr === todayStr) ||
        (dFilter === 'upcoming' && taskDateStr >= tomorrowStr && !task.completed);

      return matchedData && matchedStatus && matchedDate;
    });
  }


  sortByDueDate() {
    this.taskData.update(tasks => {
      const sortedTasks = [...tasks];

      sortedTasks.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();

        if (this.isAscending) {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });

      return sortedTasks;
    });

    this.isAscending = !this.isAscending;
  }

}
