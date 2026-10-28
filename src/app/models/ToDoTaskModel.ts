export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskCategory = 'Personal' | 'Work' | 'Learning' | 'Shopping' | 'Other';
export type TaskFilter = 'all' | 'active' | 'completed';

export interface ITodoTask {
    id: string;
    title: string;
    description: string;
    category: TaskCategory;
    priority: TaskPriority;
    dueDate: string;       
    completed: boolean;
}

export interface IGroupType{
    icon: string;
    title: string;
}

