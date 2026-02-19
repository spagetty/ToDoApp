interface Props {
  total: number;
  active: number;
  onAddClick: () => void;
}

export function Header({ total, active, onAddClick }: Props) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">TODO</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          {total} 件中 {active} 件が未完了
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
      >
        <span className="text-lg leading-none">+</span>
        追加
      </button>
    </header>
  );
}
