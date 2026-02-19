import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import type { Todo } from './types';

export default function App() {
  const {
    filteredTodos,
    filter,
    setFilter,
    allTags,
    counts,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos();

  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  function handleEdit(todo: Todo) {
    setEditingTodo(todo);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditingTodo(null);
  }

  function handleSubmit(data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) {
    if (editingTodo) {
      updateTodo(editingTodo.id, data);
    } else {
      addTodo(data);
    }
  }

  function handleTagClick(tag: string) {
    setFilter((prev) => ({ ...prev, tag: prev.tag === tag ? '' : tag }));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Header
          total={counts.total}
          active={counts.active}
          onAddClick={() => setShowForm(true)}
        />
        <div className="flex flex-col gap-4">
          <FilterBar filter={filter} onChange={setFilter} allTags={allTags} />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onEdit={handleEdit}
            onDelete={deleteTodo}
            onTagClick={handleTagClick}
          />
        </div>
      </div>

      {showForm && (
        <TodoForm
          initial={editingTodo ?? undefined}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
