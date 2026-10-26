import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NavigationComponent } from './components/navigation-component/navigation-component';
// import { CreateTaskComponent } from './components/create-task-component/create-task-component';
// import { MyTasksComponent } from './components/my-tasks-component/my-tasks-component';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ToDoTasks');
}
