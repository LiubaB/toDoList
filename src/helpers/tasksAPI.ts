import dayjs from 'dayjs';
import { Task, NewTask } from 'src/containers/ToDoList/types';
import { formatDate } from './dateHelper';

// A mock functions to mimic making an async request for data
export function addTask(task: NewTask) {
  return new Promise<{ data: Task }>((resolve) =>
    setTimeout(() => resolve({ data: {...task, id: String(Date.now()), createdAt: formatDate(dayjs())} }), 1000)
  );
}

export function editTask(task: Task) {
  return new Promise<{ data: Task }>((resolve) =>
    setTimeout(() => resolve({ data: task }), 1000)
  );
}

export function deleteTask(id: string) {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: id }), 1000)
  );
}
