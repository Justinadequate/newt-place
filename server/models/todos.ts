export interface TodoList {
    _id?: string;
    title: string;
    items: TodoItem[];
}

export interface TodoItem {
    title: string;
    description: string;
}