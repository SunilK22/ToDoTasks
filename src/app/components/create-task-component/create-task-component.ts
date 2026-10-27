import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IGroupType, ITodoTask } from '../../models/ToDoTaskModel';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,
    CommonModule, ReactiveFormsModule, MatDatepickerModule, FormsModule,
    MatIconModule, MatButtonModule],
  selector: 'app-create-task-component',
  styleUrl: './create-task-component.scss',
  templateUrl: './create-task-component.html',
})
export class CreateTaskComponent implements OnInit {
  tasksFormGroup!: FormGroup;
  fb!: FormBuilder;

  readonly descValue = signal('');

  taskCategory: IGroupType[] = [
    { icon: "person", title: "Personal" },
    { icon: "work", title: "Work" },
    { icon: "library_books", title: "Learning" },
    { icon: "shopping_cart", title: "Shopping" },
    { icon: "receipt", title: "Other" }
  ]

  constructor(private _fb: FormBuilder, private createTaskDialogRef: MatDialogRef<CreateTaskComponent>) {
    this.fb = _fb;
  }


  ngOnInit(): void {
    this.tasksFormGroup = this.buildForm();
  }

  buildForm(taskForm: ITodoTask | null = null): FormGroup {

    let newform = this.fb.group({
      title: new FormControl(taskForm?.title ?? null, Validators.required),
      description: new FormControl(taskForm?.description ?? ''),
      category: new FormControl(taskForm?.category, Validators.required),
      priority: new FormControl(taskForm?.priority ?? 'Medium', Validators.required),
      dueDate: new FormControl(taskForm?.dueDate, Validators.required),
      completed: new FormControl(taskForm?.completed ?? false)
    })

    return newform;
  }

  saveForm() {

    if (this.tasksFormGroup.invalid) {
      return;
    }

    let formData = this.tasksFormGroup.value;
    const data: ITodoTask = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.priority,
      dueDate: formData.dueDate,
      completed: formData.completed
    }

    localStorage.setItem(data.id, JSON.stringify(data))
    console.log("Data saved.." + JSON.stringify(data));

    this.tasksFormGroup.reset();
    this.createTaskDialogRef.close();

  }

  closeForm() {
    this.createTaskDialogRef.close();
  }


}
