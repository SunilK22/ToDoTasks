export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskCategory = 'Personal' | 'Work' | 'Learning' | 'Shopping' | 'Other';

export interface ITodoTask {
    id: string;
    title: string;
    description?: string;
    category: TaskCategory;
    priority: TaskPriority;
    dueDate?: string;       // ISO date string, e.g. 2026-10-22
    completed: boolean;
    createdAt: string;      // ISO date-time
    updatedAt: string;      // ISO date-time
}

export interface IGroupType{
    icon: string;
    title: string;
}

