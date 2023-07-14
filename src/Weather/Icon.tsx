export const Icon = ({
  icon,
  weatherStatus,
  size,
}: {
  icon: string;
  weatherStatus: string;
  size: number;
}) => (
  <div aria-hidden>
    <span
      className="flex items-center justify-between"
      style={{ minWidth: size, minHeight: size }}
    >
      <img
        src={`/openweathermap/${icon}.svg`}
        alt={`Weather status icon: ${weatherStatus}`}
      />
    </span>
  </div>
);
