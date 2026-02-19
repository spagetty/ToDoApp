import { useMemo, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Todo, FilterState, Priority } from '../types';

const STORAGE_KEY = 'todos';

const DEFAULT_FILTER: FilterState = {
  search: '',
  status: 'all',
  priority: 'all',
  tag: '',
  sort: 'createdAt_desc',
};

const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  // --- CRUD ---

  function addTodo(data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      ...data,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    setTodos((prev) => [newTodo, ...prev]);
  }

  function updateTodo(id: string, data: Partial<Omit<Todo, 'id' | 'createdAt'>>) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
      )
    );
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }

  // --- Derived data ---

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    todos.forEach((t) => t.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [todos]);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    // Search
    if (filter.search.trim()) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description?.toLowerCase().includes(q) ?? false)
      );
    }

    // Status filter
    if (filter.status === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (filter.status === 'completed') {
      result = result.filter((t) => t.completed);
    }

    // Priority filter
    if (filter.priority !== 'all') {
      result = result.filter((t) => t.priority === filter.priority);
    }

    // Tag filter
    if (filter.tag) {
      result = result.filter((t) => t.tags.includes(filter.tag));
    }

    // Sort
    switch (filter.sort) {
      case 'createdAt_asc':
        result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        break;
      case 'createdAt_desc':
        result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case 'dueDate_asc':
        result.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        });
        break;
      case 'priority_desc':
        result.sort(
          (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
        );
        break;
    }

    return result;
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      total: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    allTags,
    counts,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
}
