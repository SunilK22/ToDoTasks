import { Routes } from '@angular/router';
import { CreateTaskComponent } from './components/create-task-component/create-task-component';
import { NavigationComponent } from './components/navigation-component/navigation-component';

export const routes: Routes = [

    {
        path: '',
        component: NavigationComponent,
        title: 'My Tasks'
    },
    {
        path: 'newtask',
        component: CreateTaskComponent,
        title: 'Create Task'
    }
];
