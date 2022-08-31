import { Dayjs } from 'dayjs';

export interface Task {
  id: string;
  description: string;
  dueDate: Dayjs | null;
  createdAt: Dayjs | null;
}

export interface NewTask {
  description: string;
  dueDate: Dayjs | null;
  createdAt: Dayjs | null;
}