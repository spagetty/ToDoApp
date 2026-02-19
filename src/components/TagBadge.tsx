interface Props {
  tag: string;
  onClick?: () => void;
  active?: boolean;
}

export function TagBadge({ tag, onClick, active }: Props) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors
        ${active
          ? 'bg-blue-600 text-white'
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        }`}
    >
      #{tag}
    </span>
  );
}
