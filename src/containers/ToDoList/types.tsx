export interface Task {
  id: string;
  description: string;
  dueDate: string | null;
  createdAt: string | null;
}

export interface NewTask {
  description: string;
  dueDate: string | null;
  createdAt: string | null;
}