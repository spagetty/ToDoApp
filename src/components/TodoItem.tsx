import type { Todo, Priority } from '../types';
import { TagBadge } from './TagBadge';
import { formatDueDate, isOverdue } from '../utils/dateUtils';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}

const PRIORITY_STYLES: Record<Priority, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const PRIORITY_LABEL: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

export function TodoItem({ todo, onToggle, onEdit, onDelete, onTagClick }: Props) {
  const overdue = !todo.completed && todo.dueDate && isOverdue(todo.dueDate);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-3 transition-opacity ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer shrink-0"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          {/* Priority badge */}
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[todo.priority]}`}>
            {PRIORITY_LABEL[todo.priority]}
          </span>

          {/* Title */}
          <p className={`text-sm font-medium text-gray-800 flex-1 min-w-0 break-words ${todo.completed ? 'line-through text-gray-400' : ''}`}>
            {todo.title}
          </p>
        </div>

        {/* Description */}
        {todo.description && (
          <p className="mt-1 text-xs text-gray-500 break-words">{todo.description}</p>
        )}

        {/* Due date */}
        {todo.dueDate && (
          <p className={`mt-1 text-xs font-medium flex items-center gap-1 ${overdue ? 'text-red-600' : 'text-gray-400'}`}>
            {overdue && <span>⚠</span>}
            期限: {formatDueDate(todo.dueDate)}
            {overdue && ' (期限切れ)'}
          </p>
        )}

        {/* Tags */}
        {todo.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {todo.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} onClick={() => onTagClick(tag)} />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1 shrink-0">
        <button
          onClick={() => onEdit(todo)}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-xs"
          title="編集"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs"
          title="削除"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
