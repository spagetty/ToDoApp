export type Priority = 'high' | 'medium' | 'low';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string; // YYYY-MM-DD
  tags: string[];
  createdAt: string; // ISO timestamp
  updatedAt: string;
}

export type StatusFilter = 'all' | 'active' | 'completed';
export type PriorityFilter = 'all' | Priority;
export type SortKey = 'createdAt_desc' | 'createdAt_asc' | 'dueDate_asc' | 'priority_desc';

export interface FilterState {
  search: string;
  status: StatusFilter;
  priority: PriorityFilter;
  tag: string;
  sort: SortKey;
}
