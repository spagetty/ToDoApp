import type { FilterState, StatusFilter, PriorityFilter, SortKey } from '../types';
import { TagBadge } from './TagBadge';

interface Props {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
  allTags: string[];
}

export function FilterBar({ filter, onChange, allTags }: Props) {
  const update = (partial: Partial<FilterState>) =>
    onChange({ ...filter, ...partial });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      {/* Search */}
      <input
        type="search"
        placeholder="タイトル・説明を検索..."
        value={filter.search}
        onChange={(e) => update({ search: e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <div className="flex flex-wrap gap-2">
        {/* Status filter */}
        <div className="flex gap-1">
          {(['all', 'active', 'completed'] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => update({ status: s })}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter.status === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s === 'all' ? '全て' : s === 'active' ? '未完了' : '完了'}
            </button>
          ))}
        </div>

        {/* Priority filter */}
        <div className="flex gap-1">
          {(['all', 'high', 'medium', 'low'] as PriorityFilter[]).map((p) => (
            <button
              key={p}
              onClick={() => update({ priority: p })}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter.priority === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p === 'all' ? '全優先度' : p === 'high' ? '高' : p === 'medium' ? '中' : '低'}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={filter.sort}
          onChange={(e) => update({ sort: e.target.value as SortKey })}
          className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
        >
          <option value="createdAt_desc">作成日（新しい順）</option>
          <option value="createdAt_asc">作成日（古い順）</option>
          <option value="dueDate_asc">期限（近い順）</option>
          <option value="priority_desc">優先度（高い順）</option>
        </select>
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1 items-center">
          <span className="text-xs text-gray-400 mr-1">タグ:</span>
          {allTags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              active={filter.tag === tag}
              onClick={() => update({ tag: filter.tag === tag ? '' : tag })}
            />
          ))}
          {filter.tag && (
            <button
              onClick={() => update({ tag: '' })}
              className="text-xs text-gray-400 hover:text-gray-600 ml-1"
            >
              ✕ クリア
            </button>
          )}
        </div>
      )}
    </div>
  );
}
