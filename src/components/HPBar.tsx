interface HPBarProps {
  current: number;
  total: number;
}

export const HPBar: React.FC<HPBarProps> = ({ current, total }) => {
  const percentage = Math.max((current / total) * 100, 0);
  return (
    <div className="w-full h-3 bg-gray-700 rounded">
      <div
        className="h-full bg-red-500 rounded transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
